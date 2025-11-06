import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "../state/useUserStore";

export const useAuthUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (user) {
        setUser({
          id: user.id,
          email: user.email ?? "",
          full_name: user.user_metadata.full_name || "Unnamed User",
          role: user.user_metadata.role || "user",
        });
      } else {
        setUser(null);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const user = session.user;
          setUser({
            id: user.id,
            email: user.email ?? "",
            full_name: user.user_metadata.full_name || "Unnamed User",
            role: user.user_metadata.role || "user",
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);
};
