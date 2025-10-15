import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";
import type { Comment } from "@/lib/types";

export function useCreateComment(cardId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (text: string) => addComment(cardId, text),

    onSuccess: (newComment) => {
      qc.setQueryData<Comment[]>(["comments", cardId], (old) => [
        ...(old || []),
        newComment,
      ]);
    },
  });
}
