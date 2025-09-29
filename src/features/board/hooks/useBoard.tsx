import { useQuery } from "@tanstack/react-query";
import { fetchBoard } from "../api/boardApi";

export const useBoard = (id: number) => {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => fetchBoard(id),
    enabled: !!id,
  });
};
