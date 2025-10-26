import { supabase } from "@/lib/supabaseClient";

export const fetchBoard = async (id: number) => {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const fetchBoards = async () => {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchBoardsForUser = async (userId?: string) => {
  if (!userId) return [];

  const { data: memberIds, error: memberError } = await supabase
    .from("board_members")
    .select("board_id")
    .eq("user_id", userId);

  if (memberError) throw memberError;

  const ids = memberIds?.map((m) => m.board_id) || [];

  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .or(`owner_id.eq.${userId},id.in.(${ids.join(",")})`)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
