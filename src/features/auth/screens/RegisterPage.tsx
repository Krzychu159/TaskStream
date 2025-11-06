import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { ui } from "@/ui/styles";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [full_name, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !full_name) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name, role: "user" } },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! You can now log in.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col w-fit mx-auto gap-3 mt-36">
      <h1 className="py-3 text-xl border-b">Create a new account</h1>
      <label htmlFor="fullname" className="text-xs ">
        Full name
      </label>
      <input
        type="text"
        placeholder="Full Name"
        value={full_name}
        onChange={(e) => setFullName(e.target.value)}
        className={`${ui.input} `}
        id="fullname"
      />
      <label htmlFor="email" className="text-xs ">
        E-mail
      </label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`${ui.input}`}
        id="email"
      />
      <label htmlFor="password" className="text-xs ">
        New Password
      </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={`${ui.input}`}
        id="password"
      />
      <button
        onClick={handleRegister}
        disabled={loading}
        className={`${ui.button.base} ${ui.button.primary} mt-4`}
      >
        Register
      </button>
    </div>
  );
}
