import Loader from "@/ui/Loader";
import ErrorMessage from "@/ui/ErrorMessage";
import { useComments } from "@features/comment/hooks/useComments";

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
          <div key={comment.id} className="mb-2 p-2 border rounded bg-gray-50">
            <p className="text-sm">{comment.text}</p>
            <p className="text-xs text-gray-500">By: Author name</p>
            <p className="text-xs text-gray-400">
              {new Date(comment.created_at).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500 italic">(No comments yet)</div>
      )}
    </div>
  );
}
