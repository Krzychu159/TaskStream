import { Navigate } from "react-router-dom";
import { useUserStore } from "../state/useUserStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUserStore();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
