import { useQuery } from "@tanstack/react-query";
import { fetchCardsByBoardId } from "../api/cardApi";

export const useCards = (boardId: number) => {
  return useQuery({
    queryKey: ["cards", boardId],
    queryFn: () => fetchCardsByBoardId(boardId),
    enabled: !!boardId,
  });
};
