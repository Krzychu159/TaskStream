import { useUserStore } from "@/features/auth/state/useUserStore";
import { useUserProfile } from "@/features/auth/hooks/useUserProfile";

export default function UserBadge() {
  const { user } = useUserStore();
  const { data: profile } = useUserProfile(user?.id);

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      👤 {profile?.full_name || user.full_name} —
      <span className="font-medium">{profile?.role || user.role}</span>
    </div>
  );
}
