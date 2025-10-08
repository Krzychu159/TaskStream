import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api/cardApi";
import type { Card } from "@/lib/types";

export function useCreateCard(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      listId: number;
      title: string;
      description?: string;
    }) =>
      createCard(
        boardId,
        variables.listId,
        variables.title,
        variables.description
      ),

    // ✅ tylko prosty optimistic update
    onMutate: (newCard) => {
      const optimisticCard: Card = {
        id: Date.now(), // fake ID
        board_id: boardId,
        list_id: newCard.listId,
        title: newCard.title,
        description: newCard.description || "",
        position: 0,
        created_by: "temp",
        created_at: new Date().toISOString(),
        archived: false,
        due: null,
      };

      queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => [
        ...old,
        optimisticCard,
      ]);
    },

    // po wszystkim odśwież dane
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
