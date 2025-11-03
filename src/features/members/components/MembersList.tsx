import { InlineLoader } from "@/ui/InlineLoader";
import { useMembers } from "../hooks/useMembers";
import ErrorMessage from "@/ui/ErrorMessage";
import { MdDelete } from "react-icons/md";
import { useRemoveMember } from "../hooks/useRemoveMember";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function MembersList({ boardId }: { boardId: number }) {
  const {
    data: members,
    isLoading: membersLoading,
    error: membersError,
  } = useMembers(boardId);

  const { mutate: removeMember, isPending } = useRemoveMember(boardId);

  const handleRemove = (userId: string, email?: string) => {
    if (!confirm(`Are you sure you want to remove ${email || "this user"}?`))
      return;

    removeMember(userId, {
      onSuccess: () => toast.success("Member removed"),
      onError: () => toast.error("Failed to remove member"),
    });
  };

  if (membersLoading) return <InlineLoader />;
  if (membersError) return <ErrorMessage message="Failed to load members." />;

  if (!members?.length) return <p>No members found for this board.</p>;

  return (
    <div className="mt-4 w-full max-w-md">
      <ul className="space-y-3">
        {members.map((member) => (
          <motion.li
            key={member.user_id}
            layout
            className="flex justify-between items-center border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{member.profiles?.full_name}</p>
              <p className="text-sm text-gray-500">{member.profiles?.email}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                {member.role}
              </p>
            </div>

            <button
              onClick={() =>
                handleRemove(member.user_id, member.profiles?.email)
              }
              disabled={isPending}
              className="text-red-500 hover:text-red-700 disabled:opacity-50 transition-colors p-2"
              title="Remove member"
            >
              {isPending ? <InlineLoader /> : <MdDelete size={20} />}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
