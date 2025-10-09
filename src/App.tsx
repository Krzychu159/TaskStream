import { Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import "./index.css";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
