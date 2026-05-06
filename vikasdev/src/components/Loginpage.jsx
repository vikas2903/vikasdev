import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Mail, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

export default function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   const response = await axios.post("http://localhost:5000/auth/login", {
      email: form.email,
      password: form.password
    }).catch((error) => {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("An error occurred during login");
      }
    });

    if (response && response.data) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("auth-changed"));
      toast.success("Login successful!");
      setTimeout(() => {
        window.location.href = "/"; // Redirect to home page after successful login
      }, 1500); 
    } 
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const inputClassName =
    "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black px-4";

  const iconClassName =
    "pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-zinc-500";

  return (
    <div className="portfolio-shell min-h-screen">
      <Header />
      <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-black bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-between bg-[#0f0f0f] p-8 text-white sm:p-10">
            <div>
              <p className="portfolio-mono mb-4 text-xs uppercase tracking-[0.35em] text-[#00ff88]">
                Welcome Back
              </p>
              <h1 className="max-w-md text-4xl font-extrabold leading-tight sm:text-5xl">
                Sign in to continue building your next digital experience.
              </h1>
              <p className="portfolio-mono mt-6 max-w-md text-sm leading-7 text-[#7a7a7a] sm:text-base">
                Portfolio-style authentication with the same visual language as
                the landing and project pages.
              </p>
            </div>

            <div className="mt-10 border border-[#222222] bg-[#161616] p-5">
              <p className="portfolio-mono text-xs uppercase tracking-[0.2em] text-[#00ff88]">Quick access</p>
              <p className="mt-2 text-lg font-medium text-white">
                Enter your email and password to access your workspace.
              </p>
            </div>
          </div>

          <div className="bg-[#f7f7f7] p-6 sm:p-8 lg:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8">
                <p className="portfolio-mono text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
                  Login
                </p>
                <h2 className="mt-3 text-3xl font-extrabold text-black">
                  Access your account
                </h2>
                <p className="portfolio-mono mt-2 text-sm text-zinc-600">
                  Use your registered email address and password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
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
                    htmlFor="login-email"
                    className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail fontSize="small" className={iconClassName} />
                    <input
                      id="login-email"
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
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="login-password"
                    className="portfolio-mono block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700"
                    >
                      Password
                    </label>
                    <Link to="/forgot-password" className="portfolio-mono text-xs uppercase tracking-[0.1em] text-zinc-600 hover:text-black">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock fontSize="small" className={iconClassName} />
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                </div>

                <label className="portfolio-mono flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-zinc-700">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={form.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-zinc-400 text-black focus:ring-black"
                  />
                  Remember me on this device
                </label>

                <button
                  type="submit"
                  className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4"
                >
                  Log In
                </button>
              </form>

              <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="font-semibold text-black hover:underline">
                  Create one
                </Link>
              </p>
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
