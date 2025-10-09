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
