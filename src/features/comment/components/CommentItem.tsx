import { useState } from "react";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { toast } from "react-hot-toast";
import { ui } from "@/ui/styles";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { InlineLoader } from "@/ui/InlineLoader";

export default function Commentitem({
  comment,
}: {
  comment: { id: number; text: string; created_at: string };
}) {
  const { mutateAsync: updateComment, isPending } = useUpdateComment(
    comment?.id || 0
  );
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(comment?.id || 0);

  const [text, setText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!comment) return;
    if (text.trim() === "") {
      toast.error("Comment text cannot be empty");
      setText(comment.text);
      return;
    }
    try {
      await updateComment({ commentId: comment.id, text });
      setIsEditing(false);
      toast.success("Comment updated successfully!");
    } catch (err) {
      toast.error("Failed to update comment");
      console.error("Failed to update comment:", err);
    }
  };

  const handleDelete = async () => {
    if (!comment) return;
    try {
      await deleteComment(comment.id);
      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error("Failed to delete comment:", err);
    }
  };

  if (isDeleting) {
    return <InlineLoader />;
  }

  return (
    <div key={comment.id} className="mb-2 p-2 border rounded bg-gray-50">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          className={`${ui.input} ${isPending ? "opacity-50" : ""} w-full mr-2`}
          autoFocus
          disabled={isPending}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSave();
            }
            if (e.key === "Escape") {
              setText(comment.text || "");
              setIsEditing(false);
            }
          }}
        />
      ) : (
        <p className="text-sm" onClick={() => setIsEditing(true)}>
          {comment.text}
        </p>
      )}
      <div className="text-xs text-gray-500">By: Author name</div>
      <div className="flex justify-between">
        <div className="text-xs text-gray-400">
          {new Date(comment.created_at).toLocaleString()}
        </div>
        <div
          className="text-xs text-gray-400 cursor-pointer hover:text-red-400 hover:underline"
          onClick={() => handleDelete()}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
