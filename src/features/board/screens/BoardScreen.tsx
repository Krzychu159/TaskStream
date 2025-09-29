import { useParams } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";

export const BoardScreen = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const { data: board, isLoading, error } = useBoard(boardId);

  if (isLoading) return <div>Loading board...</div>;
  if (error) return <div>Error loading board</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{board.title}</h1>
    </div>
  );
};
