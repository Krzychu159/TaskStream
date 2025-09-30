export type List = {
  id: number;
  board_id: number;
  title: string;
  position: number;
  created_at: string;
};

export type Card = {
  id: number;
  board_id: number;
  list_id: number;
  title: string;
  description: string;
  position: number;
  created_at: string;
  created_by: string | null;
  due: string | null;
  archived: boolean;
};

export type Board = {
  id: number;
  title: string;
  owner_id: string;
  created_at: string;
};
