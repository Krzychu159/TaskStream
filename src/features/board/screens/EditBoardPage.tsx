import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useBoard } from "../hooks/useBoard";
import { useUpdateBoard } from "../hooks/useUpdateBoard";
import { InlineLoader } from "@/ui/InlineLoader";
import ErrorMessage from "@/ui/ErrorMessage";
import { ui } from "@/ui/styles";

export default function EditBoardPage() {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const { data: board, isLoading, error } = useBoard(boardId);
  const { mutate: updateBoard, isPending } = useUpdateBoard(boardId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (board) {
      setTitle(board.title || "");
      setDescription(board.description || "");
    }
  }, [board]);

  // --- LOADING / ERROR ---
  if (isLoading) return <InlineLoader />;
  if (error) return <ErrorMessage message="Failed to load board data." />;

  // --- HANDLER ---
  const handleSave = () => {
    if (!title.trim()) return alert("Title cannot be empty");
    updateBoard({ updates: { title, description } });
  };

  return (
    <div className="p-6 max-w-lg  bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-4">Edit Board</h2>

      <div className="flex flex-col gap-3">
        <div>
          <label className="text-sm text-gray-700">Board Title</label>
          <input
            type="text"
            className={`${ui.input} w-full mt-1`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">Description</label>
          <textarea
            className={`${ui.input} w-full mt-1 h-24`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            placeholder="Optional description..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className={`${ui.button.base} ${ui.button.primary} mt-2 flex items-center justify-center`}
        >
          {isPending ? <InlineLoader /> : "Save changes"}
        </button>
      </div>
    </div>
  );
}
