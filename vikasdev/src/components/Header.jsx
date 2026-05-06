import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const syncAuthState = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("storage", syncAuthState);
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="text-lg font-semibold tracking-[0.3em] text-white">
          <span className="portfolio-mono text-[#00ff88]">VP_</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="portfolio-mono text-[0.8rem] uppercase tracking-[0.12em] text-[#7a7a7a] transition hover:text-[#00ff88]"
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/projects"
            className="portfolio-mono text-[0.8rem] uppercase tracking-[0.12em] text-[#7a7a7a] transition hover:text-[#00ff88]"
          >
            Projects
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/chat" className="portfolio-btn portfolio-btn-secondary !px-4 !py-3">
            Chat App
          </Link>
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="portfolio-btn portfolio-btn-primary !px-4 !py-3"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="portfolio-btn portfolio-btn-primary !px-4 !py-3">
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
          className="portfolio-mono rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white md:hidden"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="portfolio-mobile-overlay fixed inset-0 top-[73px] z-40 border-t border-white/10 md:hidden">
          <div className="flex min-h-full flex-col justify-between px-6 py-10">
            <div className="flex flex-col gap-6">
              <p className="portfolio-mono text-xs uppercase tracking-[0.3em] text-[#00ff88]">
                Navigation
              </p>

              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`portfolio-mobile-link portfolio-display text-4xl font-extrabold leading-none text-white transition hover:text-[#00ff88] ${
                    index === 0
                      ? "portfolio-mobile-link-delay-1"
                      : index === 1
                        ? "portfolio-mobile-link-delay-2"
                        : index === 2
                          ? "portfolio-mobile-link-delay-3"
                          : "portfolio-mobile-link-delay-4"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              <Link
                to="/projects"
                onClick={closeMenu}
                className="portfolio-mobile-link portfolio-mobile-link-delay-5 portfolio-display text-4xl font-extrabold leading-none text-white"
              >
                Projects
              </Link>

              <Link
                to="/chat"
                onClick={closeMenu}
                className="portfolio-mobile-link portfolio-mobile-link-delay-6 portfolio-display text-4xl font-extrabold leading-none text-white"
              >
                Chat App
              </Link>

              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="portfolio-mobile-link portfolio-mobile-link-delay-7 portfolio-display text-left text-4xl font-extrabold leading-none text-white"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="portfolio-mobile-link portfolio-mobile-link-delay-6 portfolio-display text-4xl font-extrabold leading-none text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="portfolio-mobile-link portfolio-mobile-link-delay-7 portfolio-display text-4xl font-extrabold leading-none text-white"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>

            <div className="portfolio-mobile-link portfolio-mobile-link-delay-7 border-t border-white/10 pt-6">
              <p className="portfolio-mono text-xs uppercase tracking-[0.22em] text-[#7a7a7a]">
                Shopify, MERN, and polished product UI.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
