import Loader from "@/ui/Loader";
import ErrorMessage from "@/ui/ErrorMessage";
import { useComments } from "@features/comment/hooks/useComments";
import CommentItem from "./CommentItem";

type Props = {
  cardId: number;
};

export default function CommentList({ cardId }: Props) {
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments(cardId);

  if (commentsLoading) return <Loader />;
  if (commentsError) return <ErrorMessage message={commentsError.message} />;
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>

      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="text-sm text-gray-500 italic mb-3">
          (No comments yet)
        </div>
      )}
    </div>
  );
}
