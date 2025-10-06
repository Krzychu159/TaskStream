import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api/cardApi";

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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
