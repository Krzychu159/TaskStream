import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCard } from "../api/cardApi";
import type { Card } from "@/lib/types";

export function useUpdateCard(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cardId: number; updates: Partial<Card> }) =>
      updateCard(variables.cardId, variables.updates),

    onMutate: ({ cardId, updates }) => {
      queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) =>
        old.map((card) => (card.id === cardId ? { ...card, ...updates } : card))
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
