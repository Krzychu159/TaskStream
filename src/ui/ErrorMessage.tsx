export default function ErrorMessage({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-red-600">
      <p className="font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm text-red-500 underline hover:text-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
