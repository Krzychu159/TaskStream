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

      queryClient.setQueryData<Card>(["card", cardId], (old) =>
        old ? { ...old, ...updates } : old
      );
    },

    onSettled: (_data, _error, variables) => {
      const { cardId } = variables;
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
      queryClient.invalidateQueries({ queryKey: ["card", cardId] });
    },
  });
}
