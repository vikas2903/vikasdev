import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountPageLayout from "./AccountPageLayout.jsx";

export default function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("OTP verified successfully.");

    setTimeout(() => {
      navigate("/reset-password");
    }, 1000);
  };

  return (
    <AccountPageLayout
      badge="OTP Verification"
      title="Verify your OTP"
      description="Enter the one-time password sent to your email address to continue securely."
      sideTitle="A secure step between email and password reset."
      sideDescription="This page gives users a simple verification experience with high visibility, strong spacing, and focused input design."
      steps={["Open email", "Enter OTP", "Continue"]}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="portfolio-mono mb-3 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            One-Time Password
          </label>
          <div className="grid grid-cols-4 gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                className="h-14 border border-zinc-300 bg-white text-center text-xl font-semibold text-black outline-none transition focus:border-black"
                required
              />
            ))}
          </div>
        </div>

        {message && (
          <p className="border border-[#00ff88]/30 bg-[#00ff88]/10 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        )}

        <button type="submit" className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4">
          Verify OTP
        </button>
      </form>

      <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
        Didn&apos;t receive code?{" "}
        <Link to="/forgot-password" className="font-semibold text-black hover:underline">
          Resend email
        </Link>
      </p>
    </AccountPageLayout>
  );
}
