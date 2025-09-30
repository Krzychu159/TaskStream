import { Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import "./index.css";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <Routes>
        <Route path="/board/:id" element={<BoardPage />} />
      </Routes>
    </div>
  );
}
