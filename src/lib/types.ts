export type List = {
  id: number;
  board_id: number;
  title: string;
  position: number;
  created_at: string;
};

export interface Card {
  id: number;
  title: string;
  list_id: number;
  board_id: number;
  created_by: string;
  created_at: string;

  /** 🟢 Pozycja karty w liście (dla DnD) */
  position?: number;

  /** 🟢 Opis karty (dla modala itp.) */
  description?: string;

  /** (opcjonalnie) relacja do profilu autora */
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export type Board = {
  id: number;
  title: string;
  owner_id: string;
  description?: string;
  created_at: string;
};

export type Comment = {
  id: number;
  card_id: number;
  author_id: string;
  text: string;
  created_at: string;
};

export type BoardMember = {
  user_id: string;
  role: string;
  profiles?: {
    full_name: string;
    email: string;
  };
};
