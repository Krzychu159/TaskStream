import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { List, Card } from "@/lib/types";
import CardItem from "@/features/card/components/CardItem";
import { useState } from "react";
import { useCreateCard } from "@/features/card/hooks/useCreateCard";
import { ui } from "@/ui/styles";
import { motion, AnimatePresence } from "framer-motion";
import { RxDragHandleDots2 } from "react-icons/rx";

type Props = {
  list: List;
  cards: Card[];
  index: number;
};

export default function ListColumn({ list, cards, index }: Props) {
  const { mutateAsync: createCard } = useCreateCard(list.board_id);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newTitle.trim()) return;
    setIsSubmitting(true);
    try {
      await createCard({ listId: list.id, title: newTitle });
      setNewTitle("");
      setShowForm(false);
    } catch (err) {
      console.error("Failed to create card:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Draggable draggableId={`list-${list.id}`} index={index}>
      {(provided) => (
        <div
          className="bg-gray-50 rounded-xl shadow p-4 w-72 flex-shrink-0"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className="flex justify-between items-center mb-4 cursor-grab active:cursor-grabbing"
            {...provided.dragHandleProps}
          >
            <h2 className="text-lg font-semibold">{list.title}</h2>
            <RxDragHandleDots2
              size={18}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>

          <Droppable droppableId={`list-${list.id}`} type="card">
            {(dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className="min-h-[50px]"
              >
                {cards.length > 0 ? (
                  cards.map((card, idx) => (
                    <CardItem key={card.id} card={card} index={idx} />
                  ))
                ) : (
                  <div className="text-sm text-gray-500 italic mb-2">
                    (No cards yet)
                  </div>
                )}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="bg-white rounded shadow p-3 mb-3 mt-2"
              >
                <textarea
                  className={ui.textarea}
                  placeholder="Card title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  rows={2}
                  autoFocus
                  disabled={isSubmitting}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    className={`${ui.button.base} ${ui.button.primary}`}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add"}
                  </button>
                  <button
                    className={`${ui.button.base} ${ui.button.secondary}`}
                    onClick={() => setShowForm(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="add-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="bg-white rounded shadow p-3 mb-3 mt-2 cursor-pointer hover:bg-gray-50"
                onClick={() => setShowForm(true)}
              >
                <h3 className="text-xs text-gray-600 font-medium">
                  + Add new card
                </h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </Draggable>
  );
}
