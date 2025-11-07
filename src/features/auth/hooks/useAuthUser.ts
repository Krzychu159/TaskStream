import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "../state/useUserStore";

export const useAuthUser = () => {
  const { setUser, setAuthLoading } = useUserStore();

  useEffect(() => {
    const restoreSession = async () => {
      setAuthLoading(true);

      // 🔹 1. Sprawdź lokalny cache użytkownika
      const cached = localStorage.getItem("taskstream_user");
      if (cached) {
        try {
          setUser(JSON.parse(cached));
        } catch {
          localStorage.removeItem("taskstream_user");
        }
      }

      // 🔹 2. Pobierz sesję z Supabase (może chwilę trwać)
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        const user = session.user;
        const formattedUser = {
          id: user.id,
          email: user.email ?? "",
          full_name: user.user_metadata.full_name || "Unnamed User",
          role: user.user_metadata.role || "user",
        };
        setUser(formattedUser);
        localStorage.setItem("taskstream_user", JSON.stringify(formattedUser));
      } else {
        setUser(null);
        localStorage.removeItem("taskstream_user");
      }

      setAuthLoading(false); // ✅ kończymy ładowanie
    };

    restoreSession();

    // 🔹 3. Obsługa zmian w sesji
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("🔐 AUTH EVENT:", event, session);

        if (event === "SIGNED_OUT" || !session?.user) {
          setUser(null);
          localStorage.removeItem("taskstream_user");
          setAuthLoading(false);
          return;
        }

        const user = session.user;
        const formattedUser = {
          id: user.id,
          email: user.email ?? "",
          full_name: user.user_metadata.full_name || "Unnamed User",
          role: user.user_metadata.role || "user",
        };
        setUser(formattedUser);
        localStorage.setItem("taskstream_user", JSON.stringify(formattedUser));
        setAuthLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser, setAuthLoading]);
};
