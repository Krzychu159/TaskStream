import { create } from "zustand";

type User = {
  id: string;
  full_name: string;
  role: "admin" | "user";
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// Krzysiek (Admin) - for development purposes
const TEST_USER: User = {
  id: "11111111-1111-1111-1111-111111111111",
  full_name: "Krzysiek (Admin)",
  role: "admin",
};

export const useUserStore = create<UserStore>((set) => ({
  user: TEST_USER,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
