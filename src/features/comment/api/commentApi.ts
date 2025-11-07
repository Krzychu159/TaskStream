import { supabase } from "@/lib/supabaseClient";

export const fetchCommentsByCardId = async (cardId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(full_name)")
    .eq("card_id", cardId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const addComment = async (
  cardId: number,
  text: string,
  authorId: string
) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        card_id: cardId,
        author_id: authorId,
        text,
      },
    ])
    .select("*, profiles(full_name, avatar_url)") // ⬅️ od razu pobieramy dane autora
    .single();

  if (error) throw error;
  return data;
};

export const deleteComment = async (commentId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateComment = async (commentId: number, text: string) => {
  const { data, error } = await supabase
    .from("comments")
    .update({ text })
    .eq("id", commentId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
