import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCard } from "../api/cardApi";

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
      if (!result) throw new Error("Nie udało się utworzyć karty.");
      return result;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },

    onError: (error) => {
      console.error(" Błąd przy tworzeniu karty:", error);
    },
  });
}
