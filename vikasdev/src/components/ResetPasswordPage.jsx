import React, { useState } from "react";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountPageLayout from "./AccountPageLayout.jsx";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Password updated successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <AccountPageLayout
      badge="Reset Password"
      title="Create new password"
      description="Choose a fresh password for your account and confirm it before continuing."
      sideTitle="Finish the recovery flow with confidence."
      sideDescription="This final step keeps the experience consistent and focused, while giving users a clear secure-password action."
      steps={["Create password", "Confirm password", "Return to login"]}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            New Password
          </label>
          <div className="relative">
            <Lock fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              minLength={8}
              required
              className="w-full border border-zinc-300 bg-white py-3 pl-11 pr-12 text-sm text-black outline-none transition focus:border-black"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <IconButton size="small" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </div>
          </div>
        </div>

        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              minLength={8}
              required
              className="w-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
        </div>

        {message && (
          <p className={`px-4 py-3 text-sm ${message.includes("successfully") ? "border border-[#00ff88]/30 bg-[#00ff88]/10 text-emerald-700" : "border border-red-300 bg-red-50 text-red-600"}`}>
            {message}
          </p>
        )}

        <button type="submit" className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4">
          Update Password
        </button>
      </form>

      <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
        Back to{" "}
        <Link to="/login" className="font-semibold text-black hover:underline">
          login
        </Link>
      </p>
    </AccountPageLayout>
  );
}
