import React, { useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import {
  PersonAdd,
  Person,
  Mail,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const containerClass = useMemo(
    () =>
      [
        "font-sans",
        "min-h-screen flex items-center justify-center p-6",
        "bg-[#f8f6f6] text-slate-900",
        
      ].join(" "),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: connect API / validation
    console.log("Login submit:", form);
  };

  return (
    <div className={containerClass}>
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ea2a33]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ea2a33]/10 rounded-full blur-[120px]" />
      </div>

      <main className="w-full max-w-lg">
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#ea2a33]/10 rounded-2xl shadow-2xl p-8 md:p-4 md:px-6">
          {/* Header */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ea2a33] rounded-2xl mb-2 shadow-lg shadow-[#ea2a33]/30">
              <PersonAdd className="text-white" style={{ fontSize: 34 }} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
             Login to your account
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
   

            {/* Email */}
              <div style={{marginTop:'12px'}}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f8f6f6] dark:bg-slate-800/50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] transition-all duration-200"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  type="email"
                />
              </div>
            </div>

    
            {/* Password */}
            <div style={{marginTop:'12px'}}>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Password 
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-12 pr-12 py-3.5 bg-[#f8f6f6] dark:bg-slate-800/50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ea2a33] transition-all duration-200"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <IconButton
                    size="small"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? (
                      <VisibilityOff className="text-slate-400 hover:text-[#ea2a33] transition" />
                    ) : (
                      <Visibility className="text-slate-400 hover:text-[#ea2a33] transition" />
                    )}
                  </IconButton>
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Minimum 8 characters with letters and numbers
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="h-5 w-5 rounded border-[#ea2a33]/20 text-[#ea2a33] focus:ring-[#ea2a33] bg-[#f8f6f6] dark:bg-slate-800 cursor-pointer"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  required
                  type="checkbox"
                />
              </div>
   
            </div>

            {/* Submit */}
            <button
              className="w-full bg-[#ea2a33] hover:bg-[#ea2a33]/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-[#ea2a33]/20 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]"
              type="submit"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className=" pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <a
                className="text-[#ea2a33] font-semibold hover:underline decoration-2 underline-offset-4"
                href="/signup"
              >
                Signup  
              </a>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}