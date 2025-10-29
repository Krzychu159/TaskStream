import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { DropResult } from "@hello-pangea/dnd";
import type { Card } from "@/lib/types";

export const useDndHandlers = (boardId: number) => {
  const queryClient = useQueryClient();

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
  });

  const handleDragEnd = async (result: DropResult) => {
    const { destination, draggableId, type } = result;
    if (!destination) return;

    // 🟢 PRZESUWANIE KART
    if (type === "card") {
      const cardId = Number(draggableId.replace("card-", ""));
      const newListId = Number(destination.droppableId.replace("list-", ""));
      const newIndex = destination.index;

      // --- 🧠 OPTIMISTIC UI ---
      queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => {
        const movingCard = old.find((c) => c.id === cardId);
        if (!movingCard) return old;

        // usuń starą kartę
        const remaining = old.filter((c) => c.id !== cardId);

        // podziel karty według list
        const sameList = newListId === movingCard.list_id;

        if (sameList) {
          // przesuwanie w obrębie jednej listy
          const cardsInList = remaining
            .filter((c) => c.list_id === newListId)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

          cardsInList.splice(newIndex, 0, {
            ...movingCard,
            position: newIndex,
          });

          // nadpisz pozycje
          return [
            ...remaining.filter((c) => c.list_id !== newListId),
            ...cardsInList.map((c, i) => ({ ...c, position: i })),
          ];
        } else {
          // przenoszenie na inną listę
          const newListCards = remaining
            .filter((c) => c.list_id === newListId)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

          newListCards.splice(newIndex, 0, {
            ...movingCard,
            list_id: newListId,
            position: newIndex,
          });

          return [
            ...remaining.filter((c) => c.list_id !== newListId),
            ...newListCards.map((c, i) => ({
              ...c,
              position: i,
            })),
          ];
        }
      });

      // --- 🔄 UPDATE BACKEND ---
      try {
        await updateCard({
          cardId,
          updates: { list_id: newListId, position: newIndex },
        });
      } catch (err) {
        console.error("Failed to update card position:", err);
      }

      // --- REFRESH CACHE PO POTWIERDZENIU ---
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    }

    // 🔵 PRZESUWANIE LIST (opcjonalne)
    if (type === "list") {
      // logika dla list jeśli potrzebna
    }
  };

  return { handleDragEnd };
};
