import { useParams } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import { useLists } from "@/features/list/hooks/useLists";
import ListColumn from "@/features/list/components/ListColumn";
import { useCards } from "@/features/card/hooks/useCards";
import Loader from "@/ui/Loader";
import ErrorMessage from "@/ui/ErrorMessage";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Card } from "@/lib/types";

export const BoardScreen = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const queryClient = useQueryClient();

  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useBoard(boardId);
  const {
    data: lists,
    isLoading: listsLoading,
    error: listsError,
  } = useLists(boardId);
  const {
    data: cards,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards(boardId);

  // --- REALTIME ---
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
          const { eventType, new: newCard, old: oldCard } = payload;

          queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => {
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
      supabase.removeChannel(channel);
    };
  }, [boardId, queryClient]);

  // --- UI ---
  if (boardLoading || listsLoading || cardsLoading)
    return <Loader text="Loading board..." />;
  if (boardError || listsError || cardsError)
    return <ErrorMessage message="Failed to load board data." />;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{board.title}</h1>

      <div className="flex items-start gap-4 overflow-x-auto">
        {lists?.map((list) => (
          <ListColumn
            key={list.id}
            list={list}
            cards={cards?.filter((c) => c.list_id === list.id) || []}
          />
        ))}
      </div>
    </div>
  );
};
