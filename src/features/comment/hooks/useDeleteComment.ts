import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/commentApi";
import type { Comment } from "@/lib/types";

export function useDeleteComment(cardId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await deleteComment(id);
      if (!res) throw new Error("Błąd podczas usuwania komentarza");
      return res;
    },

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["comments", cardId] });

      const previousComments = queryClient.getQueryData<Comment[]>([
        "comments",
        cardId,
      ]);

      queryClient.setQueryData<Comment[]>(["comments", cardId], (old) =>
        old ? old.filter((c) => c.id !== id) : []
      );

      return { previousComments };
    },

    onError: (_err, _id, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ["comments", cardId],
          context.previousComments
        );
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", cardId] });
    },
  });
}
