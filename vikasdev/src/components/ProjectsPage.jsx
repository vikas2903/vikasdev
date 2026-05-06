import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const filters = [
  { label: "All", value: "all" },
  { label: "Shopify", value: "shopify" },
  { label: "MERN Stack", value: "mern" },
  { label: "WordPress", value: "wordpress" },
  { label: "Full Stack", value: "fullstack" },
];

const projects = [
  {
    number: "01",
    category: "shopify",
    type: "Shopify App",
    title: "Custom Order Management Shopify App",
    description:
      "Built a full-featured Shopify embedded app for automated order management and fulfilment workflows with Admin API, GraphQL, webhooks, and analytics-ready backend services.",
    icon: "SP",
    status: "Live Project",
    layout: "lg:col-span-8",
    stats: [
      { value: "3x", label: "Faster Fulfilment" },
      { value: "100+", label: "Daily Orders" },
      { value: "99%", label: "Uptime" },
    ],
    features: [
      "Real-time Shopify Admin API and GraphQL data sync",
      "Webhook-driven automation for fulfilment state changes",
      "PostgreSQL-backed reporting and order history management",
    ],
    stack: ["Node.js", "React Polaris", "Shopify Admin API", "GraphQL", "PostgreSQL", "Webhooks"],
  },
  {
    number: "02",
    category: "shopify",
    type: "Shopify Theme",
    title: "Custom Shopify Theme for Fashion Brand",
    description:
      "Designed and built a premium custom storefront using Liquid, refined animation, and a fast AJAX cart experience.",
    icon: "TH",
    status: "Live Project",
    layout: "lg:col-span-4",
    features: [
      "Custom Liquid sections and blocks",
      "AJAX cart drawer with upsell recommendations",
      "Major PageSpeed performance improvement",
    ],
    stack: ["Shopify Liquid", "CSS", "JavaScript", "AJAX"],
  },
  {
    number: "03",
    category: "mern",
    type: "MERN Stack",
    title: "eCommerce Analytics Dashboard",
    description:
      "A live analytics dashboard that aggregates Shopify sales, order, and customer data into actionable charts and KPI summaries.",
    icon: "DA",
    status: "Live Demo",
    layout: "lg:col-span-6",
    features: [
      "Shopify API integrations for live store metrics",
      "Interactive charts and date-range filters",
      "MongoDB aggregation pipelines for analytics queries",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js", "Shopify API", "Charts"],
  },
  {
    number: "04",
    category: "fullstack",
    type: "Full Stack",
    title: "Inventory Management System",
    description:
      "A complete inventory application for stock tracking, supplier control, alerts, and export workflows.",
    icon: "IM",
    status: "Completed",
    layout: "lg:col-span-6",
    features: [
      "Multi-warehouse stock tracking logic",
      "Role-based access for admin and operations teams",
      "Automated low-stock notifications",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "Express", "Nodemailer"],
  },
  {
    number: "05",
    category: "shopify",
    type: "Shopify Plus",
    title: "Shopify Plus Multi-Store Migration",
    description:
      "Migrated and rebuilt multiple stores under Shopify Plus with custom checkout extensions, metafields, and preserved SEO routing.",
    icon: "PL",
    status: "Live Project",
    layout: "lg:col-span-4",
    features: [
      "Checkout extensions and pricing rules",
      "Custom metafield architecture",
      "SEO-safe migration planning",
    ],
    stack: ["Shopify Plus", "Liquid", "Checkout Extensions", "Functions"],
  },
  {
    number: "06",
    category: "wordpress",
    type: "WordPress / WooCommerce",
    title: "WooCommerce Product Configurator Plugin",
    description:
      "A custom WooCommerce plugin for dynamic product bundles, live price updates, and configurable buying flows.",
    icon: "WC",
    status: "Live & Active",
    layout: "lg:col-span-8",
    stats: [
      { value: "+28%", label: "Conversion Rate" },
      { value: "5K+", label: "Configs/Month" },
      { value: "0ms", label: "Page Reload" },
    ],
    features: [
      "AJAX-powered live price recalculation",
      "Custom cart item meta for configured products",
      "Admin tools for option rules and logic",
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript", "AJAX", "MySQL"],
  },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="portfolio-shell min-h-screen">
      <Header />

      <main>
        <section className="relative overflow-hidden border-b border-[#222222] px-4 pb-14 pt-36 sm:px-6 lg:px-8">
          <div className="portfolio-grid absolute inset-0" />
          <div className="portfolio-float absolute -right-10 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.18),transparent_68%)]" />

          <div className="relative mx-auto max-w-7xl">
            <Link
              to="/"
              className="portfolio-mono mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#7a7a7a] transition hover:text-[#00ff88]"
            >
              <span>&larr;</span>
              Back to Portfolio
            </Link>

            <p className="portfolio-section-label">Selected Work</p>
            <h1 className="portfolio-reveal portfolio-display mt-5 text-5xl font-extrabold leading-none text-white sm:text-6xl lg:text-7xl">
              All <span className="portfolio-accent-text">Projects</span>
            </h1>
            <p className="portfolio-reveal portfolio-reveal-delay-1 portfolio-mono mt-5 max-w-2xl text-sm leading-7 text-[#7a7a7a]">
              A collection of eCommerce, Shopify, and full-stack projects from
              custom storefronts and apps to MERN dashboards and operational tools.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="portfolio-mono text-xs uppercase tracking-[0.25em] text-[#7a7a7a]">
              Filter :
            </span>
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`portfolio-mono border px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition ${
                    isActive
                      ? "border-[#00ff88] bg-[rgba(0,255,136,0.06)] text-[#00ff88]"
                      : "border-[#222222] text-[#7a7a7a] hover:border-[#00ff88] hover:text-[#00ff88]"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="portfolio-mono mt-6 text-xs text-[#7a7a7a]">
            Showing <span className="portfolio-accent-text">{visibleProjects.length}</span> projects
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="grid gap-2 lg:grid-cols-12">
            {visibleProjects.map((project, index) => (
              <article
                key={project.number}
                className={`portfolio-reveal portfolio-card-hover portfolio-glass ${project.layout} relative flex flex-col overflow-hidden p-6 sm:p-8 ${
                  index % 4 === 0
                    ? "portfolio-reveal-delay-1"
                    : index % 4 === 1
                      ? "portfolio-reveal-delay-2"
                      : index % 4 === 2
                        ? "portfolio-reveal-delay-3"
                        : "portfolio-reveal-delay-4"
                }`}
              >
                <div className="portfolio-display mb-6 flex h-44 items-center justify-center border border-[#222222] bg-[linear-gradient(135deg,rgba(0,255,136,0.08),transparent)] text-5xl font-extrabold text-[rgba(0,255,136,0.3)]">
                  {project.icon}
                </div>
                <div className="pointer-events-none absolute right-5 top-4 portfolio-mono text-5xl font-bold text-[rgba(0,255,136,0.08)]">
                  {project.number}
                </div>

                <p className="portfolio-mono mb-4 flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.25em] text-[#00ff88]">
                  <span className="h-px w-6 bg-[#00ff88]" />
                  {project.type}
                </p>

                <h2 className="portfolio-display text-2xl font-extrabold leading-tight text-white">
                  {project.title}
                </h2>

                {project.stats && (
                  <div className="mt-6 flex flex-wrap gap-6">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-extrabold text-[#00ff88]">{stat.value}</p>
                        <p className="portfolio-mono text-[0.65rem] uppercase tracking-[0.12em] text-[#7a7a7a]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-5 text-sm leading-7 text-[#b6b6b6]">
                  {project.description}
                </p>

                <div className="mt-6 space-y-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex gap-2 text-sm text-[#b6b6b6]">
                      <span className="mt-[0.45rem] text-[0.6rem] text-[#00ff88]">▶</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="portfolio-mono border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.07)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#00ff88]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#222222] pt-5">
                  <div className="portfolio-mono flex items-center gap-2 text-[0.68rem] text-[#7a7a7a]">
                    <span className="h-2 w-2 rounded-full bg-[#00ff88]" />
                    {project.status}
                  </div>

                  <div className="portfolio-mono flex gap-4 text-[0.68rem] uppercase tracking-[0.14em] text-[#7a7a7a]">
                    <a href="#" className="transition hover:text-[#00ff88]">
                      Case Study {"->"}
                    </a>
                    <a href="#" className="transition hover:text-[#00ff88]">
                      Live Demo {"->"}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-[#222222] bg-[#111111] px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="portfolio-reveal portfolio-display text-3xl font-extrabold text-white sm:text-5xl">
            Have a <span className="portfolio-accent-text">project</span> in mind?
          </h2>
          <p className="portfolio-reveal portfolio-reveal-delay-1 portfolio-mono mt-3 text-sm text-[#7a7a7a]">
            Let&apos;s build something great together.
          </p>
          <div className="portfolio-reveal portfolio-reveal-delay-2 mt-8">
            <Link to="/#contact" className="portfolio-btn portfolio-btn-primary">
              Get In Touch {"->"}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
