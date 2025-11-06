import { create } from "zustand";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "user";
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
