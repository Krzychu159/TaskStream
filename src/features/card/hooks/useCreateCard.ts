import { useMutation } from "@tanstack/react-query";
import { createCard } from "../api/cardApi";

export function useCreateCard(boardId: number) {
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

      if (!result) {
        throw new Error("Failed to create card");
      }

      return result;
    },
  });
}
