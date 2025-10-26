import { useUserStore } from "@/features/auth/state/useUserStore";
import { Link } from "react-router-dom";

const TEST_USERS = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    full_name: "Krzysiek (Admin)",
    role: "admin",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    full_name: "Ania (User)",
    role: "user",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    full_name: "Tomek (User)",
    role: "user",
  },
] as const;

export default function UserSwitcher() {
  const { user, setUser } = useUserStore();

  return (
    <div className="flex justify-between items-center px-6 py-2 border-b bg-white">
      <div className="flex items-center gap-2 text-sm">
        <span>🧑‍💻 {user?.full_name}</span>
        <select
          className="border rounded p-1"
          value={user?.id}
          onChange={(e) => {
            const newUser = TEST_USERS.find((u) => u.id === e.target.value);
            if (newUser) setUser(newUser);
          }}
        >
          {TEST_USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.full_name}
            </option>
          ))}
        </select>
      </div>
      <Link to={`/`} className="hover:underline text-sm">
        <span>Dashboard</span>{" "}
      </Link>
    </div>
  );
}
