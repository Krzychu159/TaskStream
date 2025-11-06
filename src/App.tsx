import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthUser } from "@/features/auth/hooks/useAuthUser";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

import LoginPage from "@/features/auth/screens/LoginPage";
import RegisterPage from "./features/auth/screens/RegisterPage";
import LogoutPage from "@/features/auth/screens/LogoutPage";

import BoardPage from "@/features/board/screens/BoardPage";
import { BoardScreen } from "@/features/board/screens/BoardScreen";
import MembersPage from "@/features/board/screens/MembersPage";
import EditBoardPage from "@/features/board/screens/EditBoardPage";
import Dashboard from "@/pages/Dashboard";
import UserBar from "@/features/auth/components/UserBar";

import "./index.css";

export default function App() {
  useAuthUser();

  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <UserBar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/board/:id"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<BoardScreen />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="edit" element={<EditBoardPage />} />
        </Route>
      </Routes>
    </div>
  );
}
