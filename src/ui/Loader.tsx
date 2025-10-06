export default function Loader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-gray-600">
      <div className="h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
