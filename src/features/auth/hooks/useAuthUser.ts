import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "../state/useUserStore";

export const useAuthUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    // Check current session and set user on mount
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) {
        setUser({
          id: user.id,
          full_name: user.user_metadata.full_name || "Unnamed User",
          role: user.user_metadata.role || "user",
        });
      } else {
        setUser(null);
      }
    });

    // Set up listener for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            full_name: session.user.user_metadata.full_name || "Unnamed User",
            role: session.user.user_metadata.role || "user",
          });
        } else {
          setUser(null);
        }
      }
    );

    // Delete listener on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);
};
