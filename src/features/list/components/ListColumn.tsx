import type { List, Card } from "@/lib/types";
import CardItem from "@/features/card/components/CardItem";
import { useState } from "react";
import { useCreateCard } from "@/features/card/hooks/useCreateCard";

type Props = {
  list: List;
  cards: Card[];
};

export default function ListColumn({ list, cards }: Props) {
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
    <div className="bg-gray-50 rounded-xl shadow p-4 w-72 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">{list.title}</h2>

      {cards.length > 0 ? (
        cards.map((card) => <CardItem key={card.id} card={card} />)
      ) : (
        <div className="text-sm text-gray-500 italic">(No cards yet)</div>
      )}
      <div className="bg-white rounded shadow p-3 mb-3 mt-2 cursor-pointer hover:bg-gray-100">
        {showForm ? (
          <div>
            <textarea
              className="w-full border rounded p-2 mb-2"
              placeholder="Card title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              disabled={isSubmitting}
              rows={2}
              autoFocus
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h3 className="text-xs" onClick={() => setShowForm(true)}>
            {" "}
            +Add new card
          </h3>
        )}
      </div>
    </div>
  );
}
