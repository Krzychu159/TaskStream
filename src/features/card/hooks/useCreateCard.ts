import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api/cardApi";
import type { Card } from "@/lib/types";

export function useCreateCard(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: {
      listId: number;
      title: string;
      description?: string;
    }) => {
      const result = await createCard(
        boardId,
        variables.listId,
        variables.title,
        variables.description
      );
      if (!result) throw new Error("Failed to create card");
      return result;
    },

    onSuccess: (newCard) => {
      queryClient.setQueryData<Card[]>(["cards", boardId], (old = []) => [
        ...old,
        newCard,
      ]);
    },
  });
}
