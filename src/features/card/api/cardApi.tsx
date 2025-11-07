import { supabase } from "@/lib/supabaseClient";
import type { Card } from "@/lib/types";

export const fetchCardsByBoardId = async (boardId: number) => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("board_id", boardId)
    .order("position", { ascending: true });

  if (error) throw error;
  return data;
};

export const fetchCardById = async (cardId: number) => {
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("id", cardId)
    .single();
  if (error) throw error;
  return data;
};

export const createCard = async (
  board_id: number,
  list_id: number,
  title: string,
  description?: string
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("cards")
    .insert([
      {
        board_id,
        list_id,
        title,
        description,
        created_by: user?.id,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCard = async (id: number, updates: Partial<Card>) => {
  const { data, error } = await supabase
    .from("cards")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

export const deleteCard = async (id: number) => {
  const { data, error } = await supabase
    .from("cards")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
};
