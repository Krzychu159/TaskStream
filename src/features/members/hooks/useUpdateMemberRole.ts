import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoardMemberRole } from "../api/membersApi";

export const useUpdateMemberRole = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: { userId: string; role: string }) => {
      const result = await updateBoardMemberRole(
        boardId,
        variables.userId,
        variables.role
      );
      if (!result) {
        throw new Error("Failed to update member role");
      }
      return result;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
  });
};
