import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../api/commentApi";
import type { Comment } from "@/lib/types";

export function useUpdateComment(cardId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      commentId,
      text,
    }: {
      commentId: number;
      text: string;
    }) => {
      const res = await updateComment(commentId, text);
      if (!res) throw new Error("Błąd podczas aktualizacji komentarza");
      return res;
    },

    onSuccess: (updatedComment) => {
      qc.setQueryData<Comment[]>(["comments", cardId], (old) =>
        old
          ? old.map((c) => (c.id === updatedComment.id ? updatedComment : c))
          : []
      );
    },
  });
}
