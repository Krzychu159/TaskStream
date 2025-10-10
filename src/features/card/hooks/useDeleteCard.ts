import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../api/cardApi";

export function useDeleteCard(boardId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteCard(id);
      if (!res) throw new Error("Błąd podczas usuwania karty");
      return res;
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cards", boardId] });
    },
  });
}
