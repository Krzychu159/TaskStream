import { useDeleteCard } from "@/features/card/hooks/useDeleteCard";
import { useUpdateCard } from "@/features/card/hooks/useUpdateCard";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Card } from "@/lib/types";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { ui } from "@/ui/styles";
import { motion } from "framer-motion";
import { useCardModal } from "@/features/card/state/useCardModal";

export default function CardItem({ card }: { card: Card }) {
  const { open } = useCardModal();
  const { mutateAsync: deleteCard } = useDeleteCard(card.board_id);
  const { mutateAsync: updateCard, isPending: isUpdating } = useUpdateCard(
    card.board_id
  );

  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCard(card.id);
      toast.success("Card deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete card");
      console.error("Failed to delete card:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (title.trim() === "") {
      toast.error("Title cannot be empty");
      setTitle(card.title);
      return;
    }

    try {
      await updateCard({ cardId: card.id, updates: { title } });
      setIsTitleEditing(false);
      toast.success("Card updated successfully!");
    } catch (err) {
      toast.error("Failed to update card");
      console.error("Failed to update card:", err);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded shadow p-3 mb-3 flex justify-between items-center cursor-pointer hover:bg-gray-50"
      onClick={() => {
        if (!isTitleEditing) open(card.id);
      }}
    >
      {isTitleEditing ? (
        <input
          onClick={(e) => e.stopPropagation()}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          disabled={isUpdating}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUpdate();
            if (e.key === "Escape") {
              setTitle(card.title);
              setIsTitleEditing(false);
            }
          }}
          className={`${ui.input} ${
            isUpdating ? "opacity-50" : ""
          } w-full mr-2`}
          autoFocus
        />
      ) : (
        <h3
          className="font-medium cursor-text  "
          onClick={(e) => {
            e.stopPropagation();
            setIsTitleEditing(true);
          }}
        >
          {card.title}
        </h3>
      )}
      <button
        disabled={isDeleting}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="cursor-pointer p-1 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        {isDeleting ? (
          <span className="animate-pulse text-gray-400 text-xs">...</span>
        ) : (
          <FaRegTrashAlt />
        )}
      </button>
    </motion.div>
  );
}
