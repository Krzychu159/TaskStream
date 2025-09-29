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
