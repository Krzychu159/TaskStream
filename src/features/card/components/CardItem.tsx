import { Draggable } from "@hello-pangea/dnd";
import { FaRegTrashAlt } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useCardModal } from "@/features/card/state/useCardModal";
import { usePermissions } from "@/features/auth/hooks/usePermissions";
import { useDeleteCard } from "@/features/card/hooks/useDeleteCard";
import { useUpdateCard } from "@/features/card/hooks/useUpdateCard";
import type { Card } from "@/lib/types";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { ui } from "@/ui/styles";

export default function CardItem({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  const { open } = useCardModal();
  const { canDeleteCard } = usePermissions();
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
      toast.success("Card deleted");
    } catch {
      toast.error("Failed to delete card");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) return toast.error("Title cannot be empty");
    try {
      await updateCard({ cardId: card.id, updates: { title } });
      setIsTitleEditing(false);
      toast.success("Card updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <Draggable draggableId={`card-${card.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded shadow p-3 mb-3 flex items-center gap-2 hover:bg-gray-50 cursor-grab active:cursor-grabbing"
          onClick={() => !isTitleEditing && open(card.id)}
        >
          <RxDragHandleDots2 size={16} className="text-gray-400 mt-1" />
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
              className={`${ui.input} w-full mr-2`}
              autoFocus
            />
          ) : (
            <h3
              className="font-medium cursor-text flex-1 truncate"
              onClick={(e) => {
                e.stopPropagation();
                setIsTitleEditing(true);
              }}
            >
              {card.title}
            </h3>
          )}
          <div className="w-6 h-6 rounded-full overflow-hidden border">
            <img
              src={
                card.profiles?.avatar_url ||
                "https://cdn-icons-png.flaticon.com/512/219/219983.png"
              }
              alt={card.profiles?.full_name || "User"}
              className="w-full h-full object-cover"
            />
          </div>

          <button>
            <FaEye onClick={() => !isTitleEditing && open(card.id)} />
          </button>
          <button
            disabled={isDeleting}
            onClick={(e) => {
              e.stopPropagation();
              if (canDeleteCard(card)) handleDelete();
              else toast.error("No permission to delete");
            }}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <FaRegTrashAlt
              className={
                canDeleteCard(card) ? "" : "text-gray-400 cursor-not-allowed"
              }
            />
          </button>
        </div>
      )}
    </Draggable>
  );
}
