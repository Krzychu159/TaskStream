import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { ui } from "@/ui/styles";
import { ClipboardCopyIcon, CheckIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState({ email: false, password: false });
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

  const copyToClipboard = (text: string, field: "email" | "password") => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [field]: false })), 1500);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="flex flex-col min-w-64 w-fit mx-auto gap-3 mt-36">
      <h1 className="py-3 text-xl border-b">Log In</h1>

      <label htmlFor="email" className="text-xs">
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

      <label htmlFor="password" className="text-xs">
        Password
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
        onClick={handleLogin}
        disabled={loading}
        className={`${ui.button.base} ${ui.button.primary} mt-4`}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <div className="mt-6">
        <Link to={"/register"}>
          <div className="flex flex-col items-center text-sm text-gray-700">
            <div>You don't have an account yet?</div>
            <div className="text-blue-600 font-semibold hover:underline">
              Create one here!
            </div>
          </div>
        </Link>

        <div className="mt-6 border rounded-2xl bg-gray-50 shadow-sm p-4 text-sm text-gray-700">
          <div className="text-center font-medium text-gray-800 mb-2">
            Or log in as a test user:
          </div>
          <div className="flex flex-col items-center gap-2 font-mono text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">E-mail:</span>
              <span>gyw69262@laoia.com</span>
              <button
                onClick={() => copyToClipboard("gyw69262@laoia.com", "email")}
                className="text-gray-500 hover:text-blue-600 transition"
                title="Copy email"
              >
                {copied.email ? (
                  <CheckIcon size={16} className="text-green-600" />
                ) : (
                  <ClipboardCopyIcon size={16} />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">Password:</span>
              <span>test123</span>
              <button
                onClick={() => copyToClipboard("test123", "password")}
                className="text-gray-500 hover:text-blue-600 transition"
                title="Copy password"
              >
                {copied.password ? (
                  <CheckIcon size={16} className="text-green-600" />
                ) : (
                  <ClipboardCopyIcon size={16} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
