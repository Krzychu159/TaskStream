import { Outlet, NavLink, useParams } from "react-router-dom";
import { useBoard } from "@/features/board/hooks/useBoard";
import Loader from "@/ui/Loader";
import ErrorMessage from "@/ui/ErrorMessage";

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);
  const { data: board, isLoading, error } = useBoard(boardId);

  if (isLoading) return <Loader text="Loading board..." />;
  if (error) return <ErrorMessage message="Failed to load board" />;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{board.title}</h1>

      <div className="flex gap-5 text-xs mb-4 text-gray-600 border-b border-gray-600 pb-2 w-fit">
        <NavLink
          to={`/board/${boardId}`}
          end
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "text-gray-500"
          }
        >
          Board
        </NavLink>

        <NavLink
          to={`/board/${boardId}/members`}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "text-gray-500"
          }
        >
          Members
        </NavLink>

        <NavLink
          to={`/board/${boardId}/edit`}
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "text-gray-500"
          }
        >
          Edit Board
        </NavLink>
      </div>

      {/* 🔹 Dynamiczna zawartość zakładek */}
      <Outlet />
    </div>
  );
}
