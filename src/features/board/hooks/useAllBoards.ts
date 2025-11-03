import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/features/auth/state/useUserStore";
import { fetchBoards, fetchBoardsForUser } from "../api/boardApi";

export const useAllBoards = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: ["boards", user?.id],
    enabled: !!user, // Ensure the query runs only when user is defined
    queryFn: async () => {
      if (!user) return [];
      if (user.role === "admin") {
        return await fetchBoards();
      }
      return await fetchBoardsForUser(user.id);
    },
  });
};
