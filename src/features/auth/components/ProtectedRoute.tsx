import { Navigate } from "react-router-dom";
import { useUserStore } from "../state/useUserStore";
import Loader from "@/ui/Loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthLoading } = useUserStore(); // ✅ poprawna nazwa

  // 🕒 Czekaj, aż sesja się zainicjuje
  if (isAuthLoading) return <Loader text="Checking session..." />;

  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
