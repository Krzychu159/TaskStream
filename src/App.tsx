import { Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import UserSwitcher from "./features/auth/components/UserSitcher";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <UserSwitcher />
      <Routes>
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
