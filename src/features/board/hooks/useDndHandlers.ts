import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { DropResult } from "@hello-pangea/dnd";
import type { Card, List } from "@/lib/types";
import { useRef, useEffect } from "react";

export const useDndHandlers = (boardId: number) => {
  const queryClient = useQueryClient();
  const muteRealtime = useRef(false);

  // 🔸 Card update mutation (no re-fetch on success)
  const { mutateAsync: updateCard } = useMutation({
    mutationFn: async ({
      cardId,
      updates,
    }: {
      cardId: number;
      updates: Partial<Card>;
    }) => {
      const { error } = await supabase
        .from("cards")
        .update(updates)
        .eq("id", cardId);
      if (error) throw error;
    },
    onSuccess: () => {}, // prevent auto revalidation
  });

  // 🔸 List update mutation (no re-fetch)
  const { mutateAsync: updateList } = useMutation({
    mutationFn: async ({
      listId,
      updates,
    }: {
      listId: number;
      updates: Partial<List>;
    }) => {
      const { error } = await supabase
        .from("lists")
        .update(updates)
        .eq("id", listId);
      if (error) throw error;
    },
    onSuccess: () => {},
  });

  // 🔸 Supabase realtime listener (with mute protection)
  useEffect(() => {
    const channel = supabase
      .channel(`cards-changes-${boardId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cards",
          filter: `board_id=eq.${boardId}`,
        },
        (payload) => {
          if (muteRealtime.current) return; // skip updates while dragging

          queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => {
            const { eventType, new: newCard, old: oldCard } = payload;

            switch (eventType) {
              case "INSERT":
                return [...old, newCard as Card];
              case "UPDATE":
                return old.map((c) =>
                  c.id === (newCard as Card).id ? (newCard as Card) : c
                );
              case "DELETE":
                return old.filter((c) => c.id !== (oldCard as Card).id);
              default:
                return old;
            }
          });
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [boardId, queryClient]);

  // 🧠 Optimistic UI DnD handler
  const handleDragEnd = async (result: DropResult) => {
    const { destination, draggableId, type } = result;
    if (!destination) return;

    // Cancel active queries during drag
    queryClient.cancelQueries({ queryKey: ["cards", boardId] });
    queryClient.cancelQueries({ queryKey: ["lists", boardId] });

    // Mute realtime for a short moment to avoid flicker
    muteRealtime.current = true;
    setTimeout(() => (muteRealtime.current = false), 400);

    // --- 🟩 Card reordering ---
    if (type === "card") {
      const cardId = Number(draggableId.replace("card-", ""));
      const newListId = Number(destination.droppableId.replace("list-", ""));
      const newIndex = destination.index;

      // Optimistic update
      queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => {
        const movingCard = old.find((c) => c.id === cardId);
        if (!movingCard) return old;

        const remaining = old.filter((c) => c.id !== cardId);
        const sameList = newListId === movingCard.list_id;

        if (sameList) {
          const updatedCards = remaining.filter((c) => c.list_id === newListId);
          updatedCards.splice(newIndex, 0, {
            ...movingCard,
            position: newIndex,
          });

          return [
            ...remaining.filter((c) => c.list_id !== newListId),
            ...updatedCards.map((c, i) => ({ ...c, position: i })),
          ];
        } else {
          const newListCards = remaining
            .filter((c) => c.list_id === newListId)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

          newListCards.splice(newIndex, 0, {
            ...movingCard,
            list_id: newListId,
            position: newIndex,
          });

          return [
            ...remaining
              .filter(
                (c) =>
                  c.list_id !== newListId && c.list_id !== movingCard.list_id
              )
              .map((c) => ({ ...c })),
            ...remaining
              .filter((c) => c.list_id === movingCard.list_id)
              .map((c, i) => ({ ...c, position: i })),
            ...newListCards.map((c, i) => ({ ...c, position: i })),
          ];
        }
      });

      try {
        await updateCard({
          cardId,
          updates: { list_id: newListId, position: newIndex },
        });
      } catch (err) {
        console.error("❌ Failed to update card:", err);
      }
    }

    // --- 🟦 List reordering ---
    if (type === "list") {
      const listId = Number(draggableId.replace("list-", ""));
      const newIndex = destination.index;

      // Optimistic update
      queryClient.setQueryData<List[]>(["lists", boardId], (old = []) => {
        const movingList = old.find((l) => l.id === listId);
        if (!movingList) return old;

        const remaining = old.filter((l) => l.id !== listId);
        remaining.splice(newIndex, 0, movingList);

        return remaining.map((l, i) => ({ ...l, position: i }));
      });

      try {
        await updateList({ listId, updates: { position: newIndex } });
      } catch (err) {
        console.error("❌ Failed to update list:", err);
      }
    }
  };
  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
  }, 1000);

  return { handleDragEnd };
};
