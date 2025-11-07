import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "../api/commentApi";
import { useUserStore } from "@/features/auth/state/useUserStore";
import type { Comment } from "@/lib/types";

export function useCreateComment(cardId: number) {
  const qc = useQueryClient();
  const { user } = useUserStore();

  return useMutation({
    mutationFn: (text: string) => {
      if (!user) throw new Error("User not logged in");
      return addComment(cardId, text, user.id);
    },
    onSuccess: (newComment) => {
      qc.setQueryData(["comments", cardId], (old: Comment[] | undefined) => [
        ...(old || []),
        newComment,
      ]);
    },
  });
}
