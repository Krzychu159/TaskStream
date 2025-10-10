import { useDeleteCard } from "@/features/card/hooks/useDeleteCard";
import { FaRegTrashAlt } from "react-icons/fa";
import type { Card } from "@/lib/types";

export default function CardItem({ card }: { card: Card }) {
  const { mutateAsync: deleteCard, isPending } = useDeleteCard(card.board_id);

  const handleDelete = async () => {
    try {
      await deleteCard(card.id);
      console.log("✅ Karta usunięta");
    } catch (err) {
      console.error("❌ Nie udało się usunąć karty:", err);
      // tu możesz dodać np. toast z react-hot-toast zamiast alertu
    }
  };

  return (
    <div className="bg-white rounded shadow p-3 mb-3 flex justify-between items-center">
      <h3 className="font-medium">{card.title}</h3>
      <button
        disabled={isPending}
        onClick={handleDelete}
        className="cursor-pointer p-1 hover:bg-gray-200 rounded disabled:opacity-50"
        title="Usuń kartę"
      >
        {isPending ? (
          <span className="animate-pulse text-gray-400 text-xs">...</span>
        ) : (
          <FaRegTrashAlt />
        )}
      </button>
    </div>
  );
}
