import type { Card } from "@/lib/types";

type Props = {
  card: Card;
};

export default function CardItem({ card }: Props) {
  return (
    <div className="bg-white rounded shadow p-3 mb-3">
      <h3 className="font-medium">{card.title}</h3>
      {card.description && (
        <p className="text-sm text-gray-600">{card.description}</p>
      )}
    </div>
  );
}
