import { create } from "zustand";

type CardModalStore = {
  openCardId: number | null;
  open: (id: number) => void;
  close: () => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  openCardId: null,
  open: (id) => set({ openCardId: id }),
  close: () => set({ openCardId: null }),
}));
