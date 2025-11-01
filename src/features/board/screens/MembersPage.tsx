import { useParams } from "react-router-dom";
import InviteMemberForm from "@/features/members/components/InviteMemberForm";
import MembersList from "@/features/members/components/MembersList";

export default function MembersPage() {
  const { id } = useParams<{ id: string }>();
  const boardId = Number(id);

  if (!boardId) return <div>Invalid board ID</div>;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Invite new member</h2>
        <InviteMemberForm boardId={boardId} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Board members</h2>
        <MembersList boardId={boardId} />
      </section>
    </div>
  );
}
