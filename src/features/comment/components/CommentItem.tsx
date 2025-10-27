import { useState } from "react";
import { useUpdateComment } from "../hooks/useUpdateComment";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { usePermissions } from "@/features/auth/hooks/usePermissions";
import { InlineLoader } from "@/ui/InlineLoader";
import { toast } from "react-hot-toast";
import { ui } from "@/ui/styles";
import type { Comment } from "@/lib/types";

type CommentWithAuthor = Comment & {
  profiles?: {
    full_name?: string;
  };
};

export default function CommentItem({
  comment,
}: {
  comment: CommentWithAuthor;
}) {
  const { mutateAsync: updateComment, isPending } = useUpdateComment(
    comment.id
  );
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(comment.id);

  const [text, setText] = useState(comment.text || "");
  const [isEditing, setIsEditing] = useState(false);

  const { canDeleteComment } = usePermissions();

  const handleSave = async () => {
    if (!text.trim()) {
      toast.error("Comment text cannot be empty");
      setText(comment.text || "");
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
    try {
      await deleteComment(comment.id);
      toast.success("Comment deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete comment");
      console.error("Failed to delete comment:", err);
    }
  };

  if (isDeleting) return <InlineLoader />;

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
        <p className="text-sm cursor-text" onClick={() => setIsEditing(true)}>
          {comment.text}
        </p>
      )}

      <div className="text-xs text-gray-500">
        By: {comment.profiles?.full_name || "Unknown user"}
      </div>

      <div className="flex justify-between mt-1">
        <div className="text-xs text-gray-400">
          {comment.created_at
            ? new Date(comment.created_at).toLocaleString()
            : ""}
        </div>

        <button
          className={`text-xs hover:text-red-500 hover:underline transition ${
            isDeleting || !canDeleteComment(comment)
              ? "opacity-50 cursor-not-allowed text-gray-400"
              : "text-gray-500"
          }`}
          disabled={isDeleting || !canDeleteComment(comment)}
          onClick={() => {
            if (canDeleteComment(comment)) {
              handleDelete();
            } else {
              toast.error("You do not have permission to delete this comment.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
