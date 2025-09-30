import { supabase } from "@/lib/supabaseClient";

export const fetchCardsByboardId = async (boardId: number) => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("board_id", boardId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
};
