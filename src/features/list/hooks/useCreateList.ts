import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createList } from "@features/list/api/ListApi";
import type { List } from "@/lib/types";

export function useCreateList(boardId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: { title: string }) => {
      const result = await createList(boardId, variables.title);
      if (!result) throw new Error("Failed to create list");
      return result;
    },

    onSuccess: (newList) => {
      queryClient.setQueryData<List[]>(["lists", boardId], (old = []) => {
        if (Array.isArray(newList)) {
          return [...old, ...newList];
        } else {
          return [...old, newList];
        }
      });
    },
  });
}
