import React, { useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import {
  Person,
  Mail,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
export default function Signuppage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
   try{
 console.log("Register submit:", form);

    const reponse  = await axios.post("http://localhost:5000/auth/register", {
      name: form.fullName,
      email: form.email,
      password: form.password,
      phonenumber: form.phone,
      privacy: form.terms
    });

    console.log("Server response:", reponse.data);
    toast.success(" User registered successfully!");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
   }catch(error) {
    console.error("Registration error:", error.response ? error.response.data : error.message);
    toast.error(error.response.data.message || "Registration failed!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
   }
  };

  const handleGoogleSignup = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const inputClassName =
    "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black";

  const iconClassName =
    "pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-zinc-500";

  return (
    <div className="portfolio-shell min-h-screen">
      <Header />
    <section className="px-4 py-10 text-black sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-black bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-[#f7f7f7] p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="portfolio-mono text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
                  Sign Up
                </p>
                <h1 className="mt-3 text-3xl font-extrabold text-black">
                  Create your account
                </h1>
                <p className="portfolio-mono mt-2 text-sm text-zinc-600">
                  Fill in your details to get started with a simple account setup.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="flex w-full items-center justify-center gap-3 border border-[#222222] bg-white px-4 py-3 text-sm font-medium text-[#3c4043] shadow-sm transition hover:bg-zinc-50"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.193 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.145 35.091 26.715 36 24 36c-5.173 0-9.625-3.33-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611 20.083H42V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.571h.003l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                      />
                    </svg>
                  </span>
                  Continue with Google
                </button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-zinc-200" />
                  <span className="portfolio-mono text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    or
                  </span>
                  <div className="h-px flex-1 bg-zinc-200" />
                </div>

                <div>
                  <label
                    htmlFor="signup-fullname"
                    className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <Person fontSize="small" className={iconClassName} />
                    <input
                      id="signup-fullname"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={form.fullName}
                      onChange={handleChange}
                      className={`${inputClassName} pl-11`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-email"
                    className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail fontSize="small" className={iconClassName} />
                    <input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputClassName} pl-11`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-phone"
                    className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone fontSize="small" className={iconClassName} />
                    <input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      className={`${inputClassName} pl-11`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock fontSize="small" className={iconClassName} />
                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={handleChange}
                      className={`${inputClassName} pl-11 pr-12`}
                      minLength={8}
                      required
                    />

                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((value) => !value)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityOff fontSize="small" className="text-zinc-700" />
                        ) : (
                          <Visibility fontSize="small" className="text-zinc-700" />
                        )}
                      </IconButton>
                    </div>
                  </div>
                  <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.1em] text-zinc-500">
                    Use at least 8 characters for better security.
                  </p>
                </div>

                <label className="portfolio-mono flex items-start gap-3 text-xs uppercase tracking-[0.1em] leading-6 text-zinc-700">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-zinc-400 text-black focus:ring-black"
                    required
                  />
                  <span>
                    I agree to the{" "}
                    <a href="#" className="font-medium text-black hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="font-medium text-black hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                <button type="submit" className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4">
                  Create Account
                </button>
              </form>

              <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
                Already have an account?{" "}
                <a href="/login" className="font-semibold text-black hover:underline">
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#0f0f0f] p-8 text-white sm:p-10">
            <div>
              <p className="portfolio-mono mb-4 text-xs uppercase tracking-[0.35em] text-[#00ff88]">
                New Here
              </p>
              <h2 className="max-w-sm text-4xl font-extrabold leading-tight sm:text-5xl">
                Build your account inside the same portfolio-inspired theme.
              </h2>
              <p className="portfolio-mono mt-6 max-w-md text-sm leading-7 text-[#7a7a7a] sm:text-base">
                A clean signup experience with bold type, structured spacing,
                and easier backend integration.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="border border-[#222222] bg-[#161616] p-4">
                <p className="text-2xl font-semibold">01</p>
                <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.1em] text-zinc-300">Enter your basic details</p>
              </div>
              <div className="border border-[#222222] bg-[#161616] p-4">
                <p className="text-2xl font-semibold">02</p>
                <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.1em] text-zinc-300">Choose a secure password</p>
              </div>
              <div className="border border-[#222222] bg-[#161616] p-4">
                <p className="text-2xl font-semibold">03</p>
                <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.1em] text-zinc-300">Accept terms and continue</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      <Footer />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
