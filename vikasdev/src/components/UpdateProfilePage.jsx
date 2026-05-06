import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Person, Phone, Language, LocationOn } from "@mui/icons-material";
import AccountPageLayout from "./AccountPageLayout.jsx";

export default function UpdateProfilePage() {
  const [form, setForm] = useState({
    fullName: "Vikas Prasad",
    email: "vikas@example.com",
    phone: "+91 98765 43210",
    website: "https://portfolio.example.com",
    location: "Delhi NCR, India",
    bio: "Shopify and MERN developer focused on modern eCommerce and product experiences.",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("Profile updated successfully.");
  };

  const fieldClassName =
    "w-full border border-zinc-300 bg-white py-3 pl-11 pr-4 text-sm text-black outline-none transition focus:border-black";

  return (
    <AccountPageLayout
      badge="Update Profile"
      title="Manage your profile"
      description="Edit your personal details and keep your account information up to date."
      sideTitle="A profile page that feels clean and professional."
      sideDescription="This page is designed for account maintenance with a strong layout, readable forms, and a polished dashboard-like feel."
      steps={["Edit details", "Save profile", "Continue"]}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Full Name
          </label>
          <div className="relative">
            <Person fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input name="fullName" value={form.fullName} onChange={handleChange} className={fieldClassName} />
          </div>
        </div>

        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Email Address
          </label>
          <div className="relative">
            <Mail fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input name="email" type="email" value={form.email} onChange={handleChange} className={fieldClassName} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
              Phone Number
            </label>
            <div className="relative">
              <Phone fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input name="phone" value={form.phone} onChange={handleChange} className={fieldClassName} />
            </div>
          </div>

          <div>
            <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
              Website
            </label>
            <div className="relative">
              <Language fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input name="website" value={form.website} onChange={handleChange} className={fieldClassName} />
            </div>
          </div>
        </div>

        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Location
          </label>
          <div className="relative">
            <LocationOn fontSize="small" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input name="location" value={form.location} onChange={handleChange} className={fieldClassName} />
          </div>
        </div>

        <div>
          <label className="portfolio-mono mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-zinc-700">
            Bio
          </label>
          <textarea
            name="bio"
            rows="4"
            value={form.bio}
            onChange={handleChange}
            className="w-full border border-zinc-300 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        {message && (
          <p className="border border-[#00ff88]/30 bg-[#00ff88]/10 px-4 py-3 text-sm text-emerald-700">
            {message}
          </p>
        )}

        <button type="submit" className="portfolio-btn portfolio-btn-primary w-full justify-center !border-black !py-4">
          Save Profile
        </button>
      </form>

      <p className="portfolio-mono mt-8 text-center text-xs uppercase tracking-[0.12em] text-zinc-600">
        Need password help?{" "}
        <Link to="/forgot-password" className="font-semibold text-black hover:underline">
          Reset password
        </Link>
      </p>
    </AccountPageLayout>
  );
}
