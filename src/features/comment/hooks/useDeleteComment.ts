import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/commentApi";

export function useDeleteComment(card_id?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteComment(id);
      if (!res) throw new Error("Błąd podczas usuwania komentarza");
      return res;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", card_id] });
    },
  });
}
