import { useQuery } from "@tanstack/react-query";
import { fetchCardById } from "../api/cardApi";
import type { Card } from "@/lib/types";

export const useCard = (cardId: number | null) => {
  return useQuery<Card | null>({
    queryKey: ["card", cardId],
    queryFn: async () => {
      if (!cardId) return null;
      return await fetchCardById(cardId);
    },
    enabled: !!cardId,
  });
};
