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

export const createList = async (boardId: number, title: string) => {
  const { count } = await supabase
    .from("lists")
    .select("*", { count: "exact", head: true })
    .eq("board_id", boardId);

  const { data, error } = await supabase
    .from("lists")
    .insert([
      {
        board_id: boardId,
        title,
        position: count ?? 0,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteList = async (listId: number) => {
  const { data, error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
