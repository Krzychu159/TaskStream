import { useUserStore } from "@/features/auth/state/useUserStore";
import { Link } from "react-router-dom";

export default function UserBar() {
  const { user } = useUserStore();

  if (!user) return null; // nic nie pokazuj jeśli user niezalogowany

  return (
    <div className="flex justify-between items-center px-6 py-2 border-b bg-white text-sm">
      {/* Lewa strona */}
      <div>
        👤 <span className="font-medium">{user.full_name}</span>
        <span className="text-gray-500 ml-2">{user.email}</span>
      </div>

      {/* Prawa strona */}
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/logout" className="hover:underline text-red-600">
          Logout
        </Link>
      </div>
    </div>
  );
}
