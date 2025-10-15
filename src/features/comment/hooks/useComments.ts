import { useQuery } from "@tanstack/react-query";
import { fetchCommentsByCardId } from "../api/commentApi";
import type { Comment } from "@/lib/types";

export const useComments = (cardId: number | null) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", cardId],
    queryFn: async () => {
      if (!cardId) return [];
      return await fetchCommentsByCardId(cardId);
    },
    enabled: !!cardId,
  });
};
