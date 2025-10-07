import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../api/cardApi";

export function useDeleteCard(boardId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => deleteCard(cardId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
