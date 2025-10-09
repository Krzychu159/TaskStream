import ErrorMessage from "@/ui/ErrorMessage";
import Loader from "@/ui/Loader";
import { useAllBoards } from "@features/board/hooks/useAllBoards";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useAllBoards();

  if (boardLoading) return <Loader />;
  if (boardError) return <ErrorMessage message={boardError.message} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg text-gray-600">Welcome to your dashboard!</p>

      {board && (
        <div className="mt-6 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Your Boards</h2>
          <ul className="space-y-2">
            {board.map((b) => (
              <Link to={`/board/${b.id}`} key={b.id} className="block">
                <li
                  key={b.id}
                  className="p-4 bg-white rounded shadow hover:bg-gray-50"
                >
                  {b.title}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
