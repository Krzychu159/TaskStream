import { FaPlus } from "react-icons/fa";
import { useCreateBoard } from "../hooks/useCreateBoard";
import { useState } from "react";
import { InlineLoader } from "@/ui/InlineLoader";
import { useUserStore } from "@/features/auth/state/useUserStore";
import { ui } from "@/ui/styles";
import toast from "react-hot-toast";

export const CreateBoard = () => {
  const { user } = useUserStore(); // ✅ to zwraca aktualnego usera
  const userId = user?.id;
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const { mutate: createBoard, isPending } = useCreateBoard(userId!);

  const handleAdd = () => {
    if (!title.trim()) {
      toast.error("Fill title");
      return;
    }
    createBoard(title);
    setTitle("");
    setIsAdding(false);
  };

  return (
    <>
      {!isAdding ? (
        <li
          className="p-4 bg-white rounded shadow flex items-center gap-3 font-semibold cursor-pointer"
          onClick={() => setIsAdding(true)}
        >
          {" "}
          <FaPlus />
          Add new Board
        </li>
      ) : (
        <li className="p-4 bg-white rounded shadow flex items-center gap-3 font-semibold cursor-pointer">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${ui.input}`}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            placeholder="New Board title"
          />
          {isPending ? (
            <InlineLoader />
          ) : (
            <button
              onClick={() => handleAdd()}
              className={`${ui.button.base} ${ui.button.primary} w-36 min-h-8 `}
            >
              Add
            </button>
          )}
        </li>
      )}
    </>
  );
};
