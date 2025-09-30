import { useQuery } from "@tanstack/react-query";
import { fetchCardsByboardId } from "../api/cardApi";

export const useCards = (boardId: number) => {
  return useQuery({
    queryKey: ["cards", boardId],
    queryFn: () => fetchCardsByboardId(boardId),
    enabled: !!boardId,
  });
};
