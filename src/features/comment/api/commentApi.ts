import { supabase } from "@/lib/supabaseClient";

export const fetchCommentsByCardId = async (cardId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("card_id", cardId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
};

export const addComment = async (cardId: number, text: string) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        card_id: cardId,
        author_id: "31637381-08d8-4713-b272-958005885799",
        text,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
};
