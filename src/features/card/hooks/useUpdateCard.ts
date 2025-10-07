import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCard } from "../api/cardApi";
import type { Card } from "@/lib/types";

export function useUpdateCard(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { cardId: number; updates: Partial<Card> }) =>
      updateCard(variables.cardId, variables.updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
