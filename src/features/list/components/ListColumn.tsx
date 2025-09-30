import type { List, Card } from "@/lib/types";
import CardItem from "@/features/card/components/CardItem";

type Props = {
  list: List;
  cards: Card[];
};

export default function ListColumn({ list, cards }: Props) {
  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 w-72 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-4">{list.title}</h2>

      {cards.length > 0 ? (
        cards.map((card) => <CardItem key={card.id} card={card} />)
      ) : (
        <div className="text-sm text-gray-500 italic">(No cards yet)</div>
      )}
    </div>
  );
}
