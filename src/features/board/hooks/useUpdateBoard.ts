import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../api/boardApi";
import { toast } from "react-hot-toast";

export const useUpdateBoard = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: {
      updates: Partial<{ title: string; description: string }>;
    }) => updateBoard(boardId, variables.updates),

    onSuccess: (data) => {
      toast.success("Board updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      return data;
    },

    onError: (error: unknown) => {
      const err = error as { message?: string };
      toast.error(err.message || "Failed to update board");
    },
  });
};
