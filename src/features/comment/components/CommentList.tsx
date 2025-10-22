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
      {comments?.length || 1 > 0 ? (
        comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="text-sm text-gray-500 italic">(No comments yet)</div>
      )}
    </div>
  );
}
