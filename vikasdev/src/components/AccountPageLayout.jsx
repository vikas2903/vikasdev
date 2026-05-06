import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function AccountPageLayout({
  badge,
  title,
  description,
  sideTitle,
  sideDescription,
  steps = [],
  children,
}) {
  return (
    <div className="portfolio-shell min-h-screen">
      <Header />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl items-center justify-center">
          <div className="grid w-full overflow-hidden rounded-[32px] border border-black bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-[0.98fr_1.02fr]">
            <div className="bg-[#f7f7f7] p-6 sm:p-8 lg:p-10">
              <div className="mx-auto max-w-md">
                <div className="mb-8">
                  <p className="portfolio-mono text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
                    {badge}
                  </p>
                  <h1 className="mt-3 text-3xl font-extrabold text-black">{title}</h1>
                  <p className="portfolio-mono mt-2 text-sm leading-6 text-zinc-600">
                    {description}
                  </p>
                </div>

                {children}
              </div>
            </div>

            <div className="flex flex-col justify-between bg-[#0f0f0f] p-8 text-white sm:p-10">
              <div>
                <p className="portfolio-mono mb-4 text-xs uppercase tracking-[0.35em] text-[#00ff88]">
                  Account Flow
                </p>
                <h2 className="max-w-md text-4xl font-extrabold leading-tight sm:text-5xl">
                  {sideTitle}
                </h2>
                <p className="portfolio-mono mt-6 max-w-md text-sm leading-7 text-[#7a7a7a] sm:text-base">
                  {sideDescription}
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {steps.map((step, index) => (
                  <div key={`${step}-${index}`} className="border border-[#222222] bg-[#161616] p-4">
                    <p className="text-2xl font-semibold">0{index + 1}</p>
                    <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.1em] text-zinc-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
