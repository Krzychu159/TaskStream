import { Routes, Route } from "react-router-dom";
import BoardPage from "./features/board/screens/BoardPage";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import UserSwitcher from "./features/auth/components/UserSitcher";
import MembersPage from "./features/board/screens/MembersPage";
import EditBoardPage from "./features/board/screens/EditBoardPage";
import { BoardScreen } from "./features/board/screens/BoardScreen";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <UserSwitcher />
      <Routes>
        <Route path="/board/:id" element={<BoardPage />}>
          <Route index element={<BoardScreen />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="edit" element={<EditBoardPage />} />
        </Route>

        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
