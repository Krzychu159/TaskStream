import { create } from "zustand";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "user";
};

type UserStore = {
  user: User | null;
  isAuthLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthLoading: true, // na starcie "ładuje"
  setUser: (user) => set({ user }),
  setAuthLoading: (loading) => set({ isAuthLoading: loading }),
  logout: () => set({ user: null, isAuthLoading: false }),
}));
