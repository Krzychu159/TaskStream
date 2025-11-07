import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/features/auth/state/useUserStore";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useUserStore(); // 🔥 pobieramy logout() ze store

  useEffect(() => {
    const doLogout = async () => {
      try {
        await supabase.auth.signOut(); // 1️⃣ wyloguj z Supabase
        logout(); // 2️⃣ natychmiast usuń usera z local store
        localStorage.removeItem("taskstream_user"); // 3️⃣ usuń cache
        toast.success("Logged out successfully");
      } catch (err) {
        console.error("Logout error:", err);
        toast.error("Something went wrong during logout");
      } finally {
        // 4️⃣ dopiero teraz redirect
        navigate("/login", { replace: true });
      }
    };

    doLogout();
  }, [navigate, logout]);

  return <div>Logging out...</div>;
}
