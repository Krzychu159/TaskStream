import { useQuery } from "@tanstack/react-query";
import { fetchBoardMembers } from "../api/membersApi";

export const useMembers = (boardId: number) => {
  return useQuery({
    queryKey: ["members", boardId],
    queryFn: async () => {
      if (!boardId) return [];
      return await fetchBoardMembers(boardId);
    },
    enabled: !!boardId,
  });
};
