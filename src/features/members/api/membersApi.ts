import { supabase } from "@/lib/supabaseClient";

export const fetchBoardMembers = async (boardId: number) => {
  const { data, error } = await supabase
    .from("board_members")
    .select(
      `
      user_id,
      role,
      profiles!inner (
        full_name,
        email
      )
    `
    )
    .eq("board_id", boardId);
  if (error) throw error;
  return data.map((member) => ({
    ...member,
    profiles: member.profiles?.[0] ?? member.profiles, // zabezpieczenie
  }));
};

export const addBoardMember = async (
  boardId: number,
  email: string,
  role = "member"
) => {
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (userError) throw userError;
  if (!user) throw new Error("User not found");

  const { error } = await supabase.from("board_members").insert({
    board_id: boardId,
    user_id: user.id,
    role,
  });

  if (error) throw error;
  return true;
};

export const removeBoardMember = async (boardId: number, userId: string) => {
  const { data, error } = await supabase
    .from("board_members")
    .delete()
    .eq("board_id", boardId)
    .eq("user_id", userId)
    .select();
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
