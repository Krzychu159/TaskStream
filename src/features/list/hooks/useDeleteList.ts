import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "@features/list/api/ListApi";
import { toast } from "react-hot-toast";
import type { List } from "@/lib/types";

export const useDeleteList = (boardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listId: number) => {
      return await deleteList(listId);
    },

    onMutate: async (listId: number) => {
      await queryClient.cancelQueries({ queryKey: ["lists", boardId] });

      const previousLists = queryClient.getQueryData<List[]>([
        "lists",
        boardId,
      ]);

      queryClient.setQueryData<List[]>(["lists", boardId], (old = []) =>
        old.filter((list) => list.id !== listId)
      );

      return { previousLists };
    },

    onError: (error, _listId, context) => {
      if (context?.previousLists) {
        queryClient.setQueryData(["lists", boardId], context.previousLists);
      }
      console.error("Failed to delete list:", error);
      toast.error("Failed to delete list");
    },

    onSuccess: () => {
      toast.success("List deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", boardId] });
    },
  });
};
