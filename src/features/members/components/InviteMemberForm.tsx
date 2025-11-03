import { ui } from "@/ui/styles";
import { useState } from "react";
import { useAddMember } from "../hooks/useAddMember";
import { toast } from "react-hot-toast";
import { InlineLoader } from "@/ui/InlineLoader";

export default function InviteMemberForm({ boardId }: { boardId: number }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const { mutate: addMember, isPending } = useAddMember(boardId);

  const handleAdd = () => {
    const trimmed = email.trim();
    if (trimmed === "") {
      toast.error("Email cannot be empty");
      return;
    }

    addMember(
      { email: trimmed, role },
      {
        onSuccess: () => {
          setEmail("");
          setRole("member");
          toast.success("Member invited successfully!");
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-gray-800 mb-2">Invite new member</h3>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="email@example.com"
          className={`${ui.input} flex-1 `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          disabled={isPending}
          className={`${ui.input} w-32`}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleAdd}
          disabled={isPending}
          className={`${ui.button.base} ${ui.button.primary} w-28 flex items-center justify-center`}
        >
          {isPending ? <InlineLoader /> : "Invite"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-2">
        Enter the email of an existing user to invite them to this board.
      </p>
    </div>
  );
}
