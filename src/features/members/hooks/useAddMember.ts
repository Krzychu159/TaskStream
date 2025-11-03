import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBoardMember } from "../api/membersApi";
import { toast } from "react-hot-toast";

export const useAddMember = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, role }: { email: string; role: string }) =>
      addBoardMember(boardId, email, role),

    onSuccess: () => {
      toast.success("Member invited!");
      queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },

    onError: (error: unknown) => {
      const err = error as { message?: string };

      if (err.message === "User not found") {
        toast.error("No user found with that email");
      } else if (err.message?.includes("duplicate key value")) {
        toast.error("That user is already a member of this board");
      } else {
        toast.error(
          "There is not a user with this email or an error occurred."
        );
      }
    },
  });
};
