import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ui } from "@/ui/styles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully!");
      navigate("/");
    }
  }

  return (
    <div className="flex flex-col w-fit mx-auto gap-3 mt-36 ">
      <h1 className="py-3 text-xl border-b">Log In</h1>
      <label htmlFor="email" className="text-xs ">
        E-mail
      </label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${ui.input} `}
        id="email"
      />
      <label htmlFor="password" className="text-xs">
        Password
      </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${ui.input} `}
        id="password"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`${ui.button.base} ${ui.button.primary} mt-4`}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </div>
  );
}
