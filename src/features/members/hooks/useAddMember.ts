import { useMutation } from "@tanstack/react-query";
import { addBoardMember } from "../api/membersApi";

export const useAddMember = (boardId: number) => {
  return useMutation({
    mutationFn: async (variables: {
      boardId: number;
      userId: string;
      role: string;
    }) => {
      const result = await addBoardMember(
        boardId,
        variables.userId,
        variables.role
      );

      if (!result) {
        throw new Error("Failed to add member");
      }
      return result;
    },
  });
};
