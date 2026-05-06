import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#222222] bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-10 border-b border-[#222222] pb-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="portfolio-mono text-lg text-[#00ff88]">VP_</p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#7a7a7a]">
              Shopify and MERN Stack developer building scalable eCommerce solutions
              from Delhi NCR, India.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://in.linkedin.com/in/vikas-prasad-073b90183"
                target="_blank"
                rel="noreferrer"
                className="portfolio-mono flex h-10 w-10 items-center justify-center border border-[#222222] text-xs text-[#7a7a7a] transition hover:border-[#00ff88] hover:text-[#00ff88]"
              >
                in
              </a>
              <a
                href="#"
                className="portfolio-mono flex h-10 w-10 items-center justify-center border border-[#222222] text-xs text-[#7a7a7a] transition hover:border-[#00ff88] hover:text-[#00ff88]"
              >
                gh
              </a>
              <a
                href="#"
                className="portfolio-mono flex h-10 w-10 items-center justify-center border border-[#222222] text-xs text-[#7a7a7a] transition hover:border-[#00ff88] hover:text-[#00ff88]"
              >
                tw
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="portfolio-mono text-xs uppercase tracking-[0.22em] text-[#7a7a7a]">
                Navigate
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-[#8b8b8b]">
                <a href="/#home" className="transition hover:text-[#00ff88]">
                  Home
                </a>
                <a href="/#about" className="transition hover:text-[#00ff88]">
                  About
                </a>
                <a href="/#experience" className="transition hover:text-[#00ff88]">
                  Experience
                </a>
                <Link to="/projects" className="transition hover:text-[#00ff88]">
                  Projects
                </Link>
              </div>
            </div>

            <div>
              <p className="portfolio-mono text-xs uppercase tracking-[0.22em] text-[#7a7a7a]">
                Expertise
              </p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-[#8b8b8b]">
                <a href="/#skills" className="transition hover:text-[#00ff88]">
                  Shopify Development
                </a>
                <a href="/#skills" className="transition hover:text-[#00ff88]">
                  MERN Stack
                </a>
                <a href="/#skills" className="transition hover:text-[#00ff88]">
                  API Integration
                </a>
                <a href="/#contact" className="transition hover:text-[#00ff88]">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs text-[#7a7a7a] sm:flex-row sm:items-center sm:justify-between">
          <p className="portfolio-mono">© 2025 Vikas Prasad. All rights reserved.</p>
          <p className="portfolio-mono">
            Built with <span className="text-[#00ff88]">code</span>
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[-18px] left-0 right-0 text-center text-[clamp(4rem,12vw,10rem)] font-extrabold tracking-[-0.2rem] text-white/[0.02]">
        VIKAS PRASAD
      </div>
    </footer>
  );
}
