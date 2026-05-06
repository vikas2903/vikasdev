import React, { useState } from "react";
import { Mail } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import AccountPageLayout from "./AccountPageLayout.jsx";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Reset email sent successfully. Continue with OTP verification.");

    setTimeout(() => {
      navigate("/verify-otp");
    }, 1200);
  };

  return (
    <AccountPageLayout
      badge="Forgot Password"
      title="Send reset email"
      description="Enter your registered email address and we will continue the password reset flow."
      sideTitle="Recover access without confusion."
      sideDescription="This screen is designed for a clear first step in the reset-password flow, with the same premium visual style as the rest of your app."
      steps={["Enter email", "Verify OTP", "Create password"]}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Email Address
          </label>
          <div className="relative">
            <Mail fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              className="w-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
        </div>

        {message && (
          <p className="border border-[#00ff88]/30 bg-[#00ff88]/10 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        )}

        <button type="submit" className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4">
          Send Email
        </button>
      </form>

      <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-black hover:underline">
          Go to login
        </Link>
      </p>
    </AccountPageLayout>
  );
}
