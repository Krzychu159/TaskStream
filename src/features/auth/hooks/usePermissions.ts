import { useUserStore } from "@/features/auth/state/useUserStore";
import type { Card, Comment } from "@/lib/types";

export const usePermissions = () => {
  const { user } = useUserStore();

  const canEditCard = (card: Card) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (card.created_by === user.id) return true;
    return false;
  };

  const canDeleteCard = (card: Card) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (card.created_by === user.id) return true;
    return false;
  };

  const canDeleteComment = (comment: Comment) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    if (comment.author_id === user.id) return true;
    return false;
  };

  return {
    canEditCard,
    canDeleteCard,
    canDeleteComment,
  };
};
