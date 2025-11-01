import { supabase } from "@/lib/supabaseClient";

export const fetchBoardMembers = async (boardId: number) => {
  const { data, error } = await supabase
    .from("board_members")
    .select("full_name, email, role, user_id")
    .eq("board_id", boardId);
  if (error) throw error;
  return data;
};

export const addBoardMember = async (
  boardId: number,
  userId: string,
  role: string
) => {
  const { data, error } = await supabase
    .from("board_members")
    .insert([{ board_id: boardId, user_id: userId, role }]);
  if (error) throw error;
  return data;
};

export const removeBoardMember = async (boardId: number, userId: string) => {
  const { data, error } = await supabase
    .from("board_members")
    .delete()
    .eq("board_id", boardId)
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

export const updateBoardMemberRole = async (
  boardId: number,
  userId: string,
  role: string
) => {
  const { data, error } = await supabase
    .from("board_members")
    .update({ role })
    .eq("board_id", boardId)
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};
