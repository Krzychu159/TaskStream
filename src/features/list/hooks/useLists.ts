import { useQuery } from "@tanstack/react-query";
import { fetchListsByBoardId } from "../api/ListApi";

export const useLists = (boardId: number) => {
  return useQuery({
    queryKey: ["lists", boardId],
    queryFn: () => fetchListsByBoardId(boardId),
    enabled: !!boardId,
  });
};
