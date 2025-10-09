import { fetchBoards } from "../api/boardApi";
import { useQuery } from "@tanstack/react-query";

export const useAllBoards = () => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: fetchBoards,
  });
};
