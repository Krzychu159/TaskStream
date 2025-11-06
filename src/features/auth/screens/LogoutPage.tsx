import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await supabase.auth.signOut();
      toast.success("Logged out");
      navigate("/login");
    };
    doLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
}
