import { useState } from "react";
import { ui } from "@/ui/styles";
import { useCreateList } from "@/features/list/hooks/useCreateList";
import toast from "react-hot-toast";
import { InlineLoader } from "@/ui/InlineLoader";

export const CreateList = ({ boardId }: { boardId: number }) => {
  const [isAddingActive, setIsAddingActive] = useState(false);
  const [title, setTitle] = useState("");
  const { mutateAsync: createList, isPending } = useCreateList(boardId);

  const handleAddList = () => {
    if (title.trim() === "") {
      toast.error("List title cannot be empty");
      return;
    }

    createList({ title })
      .then(() => {
        toast.success("List created successfully!");
      })
      .catch((err) => {
        toast.error("Failed to create list");
        console.error("Failed to create list:", err);
      });

    setTitle("");
    setIsAddingActive(false);
  };
  return (
    <div
      className={`bg-gray-50 rounded-xl shadow p-4 w-72 flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-500 max-h-fit`}
    >
      {!isAddingActive ? (
        <h2
          className="text-lg font-semibold"
          onClick={() => {
            setIsAddingActive(true);
          }}
        >
          Add new list +
        </h2>
      ) : (
        <div
          onClick={() => {
            setIsAddingActive(false);
          }}
        >
          <h2 className="text-lg font-semibold">Add new list +</h2>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              e.stopPropagation();
            }}
            className={`${ui.input} mt-2 w-full`}
            placeholder="List title"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
          {!isPending ? (
            <button
              className={`${ui.button.base} ${ui.button.primary} w-max mt-4`}
              onClick={(e) => {
                e.stopPropagation();
                handleAddList();
              }}
            >
              Add
            </button>
          ) : (
            <InlineLoader />
          )}
        </div>
      )}
    </div>
  );
};
