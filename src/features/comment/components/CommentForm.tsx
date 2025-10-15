import { useState } from "react";
import { ui } from "@/ui/styles";
import { useCreateComment } from "../hooks/useCreateComment";
import { InlineLoader } from "@/ui/InlineLoader";

type Props = {
  cardId: number;
};

export default function CommentForm({ cardId }: Props) {
  const [text, setText] = useState("");

  const { mutateAsync: createComment, isPending } = useCreateComment(cardId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    await createComment(text);
    console.log("Submitting comment:", text);
    setText("");
  };

  return (
    <div>
      <textarea
        className={ui.textarea}
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        autoFocus
      />
      {isPending ? (
        <InlineLoader />
      ) : (
        <button
          className={`${ui.button.base} ${ui.button.primary} mt-2`}
          disabled={!text.trim()}
          onClick={handleSubmit}
        >
          Add Comment
        </button>
      )}
    </div>
  );
}
