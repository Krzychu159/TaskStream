import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import type { Board } from "@/lib/types";

export const useCreateBoard = (userId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      if (!userId) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("boards")
        .insert([{ title, owner_id: userId }])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }
      return data;
    },
    onSuccess: (newBoard) => {
      queryClient.setQueryData<Board[]>(["boards", userId], (old = []) => [
        ...old,
        newBoard,
      ]);
    },
  });
};
