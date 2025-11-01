import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeBoardMember } from "../api/membersApi";

export const useRemoveMember = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const result = await removeBoardMember(boardId, userId);
      if (!result) {
        throw new Error("Failed to remove member");
      }
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
  });
};
