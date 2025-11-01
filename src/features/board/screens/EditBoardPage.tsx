import { useParams } from "react-router-dom";

export default function EditBoardPage() {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Board</h2>
      <p>Editing features coming soon. Board ID: {boardId}</p>
    </div>
  );
}
