import { supabase } from "@/lib/supabaseClient";

export const fetchListsByBoardId = async (boardId: number) => {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("board_id", boardId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
};
