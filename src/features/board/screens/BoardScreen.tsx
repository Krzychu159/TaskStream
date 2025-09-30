import { useParams } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import { useLists } from "@/features/list/hooks/useLists";
import ListColumn from "@/features/list/components/ListColumn";
import { useCards } from "@/features/card/hooks/useCards";

export const BoardScreen = () => {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  const {
    data: board,
    isLoading: boardLoading,
    error: boardError,
  } = useBoard(boardId);
  const {
    data: lists,
    isLoading: listsLoading,
    error: listsError,
  } = useLists(boardId);
  const {
    data: cards,
    isLoading: cardsLoading,
    error: cardsError,
  } = useCards(boardId);

  if (boardLoading || listsLoading || cardsLoading)
    return <div>Loading board...</div>;
  if (boardError || listsError || cardsError)
    return <div>Error loading board</div>;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">{board.title}</h1>

      <div className="flex items-start gap-4 overflow-x-auto">
        {lists?.map((list) => (
          <ListColumn
            key={list.id}
            list={list}
            cards={cards?.filter((c) => c.list_id === list.id) || []}
          />
        ))}
      </div>
    </div>
  );
};
