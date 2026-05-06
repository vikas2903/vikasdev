import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const heroStats = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Commerce Projects" },
  { value: "4", label: "Platforms Mastered" },
];

const badges = [
  "Shopify Plus",
  "MERN Stack",
  "WordPress",
  "BigCommerce",
  "PostgreSQL",
  "API Integration",
  "eCommerce",
];

const experiences = [
  {
    company: "Digi Sidekick",
    role: "Senior Web Developer",
    date: "Mar 2025 – Present",
    description:
      "Working on advanced Shopify theme and app development alongside MERN stack projects, building custom storefront experiences and full-stack products.",
    tags: ["MERN Stack", "Shopify Apps", "Shopify Themes", "Node.js", "React", "MongoDB"],
  },
  {
    company: "EastEssence",
    role: "Web Developer",
    date: "Jul 2024 – Feb 2025",
    description:
      "Focused on conversion-led eCommerce development, CRM tooling, Firebase integrations, and frontend optimisation.",
    tags: ["CRM", "Firebase", "eCommerce", "Conversion"],
  },
  {
    company: "MakkPress Technologies",
    role: "Frontend Web Developer",
    date: "Mar 2022 – Jun 2024",
    description:
      "Delivered 50+ eCommerce projects across Shopify, WooCommerce, and BigCommerce with custom storefronts and strong performance focus.",
    tags: ["Shopify Plus", "WooCommerce", "BigCommerce", "Liquid", "JavaScript", "CSS"],
  },
];

const skills = [
  { name: "Shopify Liquid", value: "95%" },
  { name: "Shopify Apps", value: "90%" },
  { name: "React.js", value: "85%" },
  { name: "Node.js", value: "85%" },
  { name: "Express.js", value: "80%" },
  { name: "MongoDB", value: "80%" },
  { name: "PostgreSQL", value: "75%" },
  { name: "JavaScript", value: "92%" },
];

const projectHighlights = [
  {
    number: "01",
    type: "Shopify App",
    title: "Custom Shopify App — Order Management",
    description:
      "Automated fulfilment workflows using Shopify APIs, webhooks, Node.js, and a React-based admin interface.",
    stack: ["Node.js", "React Polaris", "Shopify API", "PostgreSQL"],
  },
  {
    number: "02",
    type: "Shopify Theme",
    title: "Custom Shopify Theme — Fashion Brand",
    description:
      "A premium custom storefront with Liquid, motion, fast cart behaviour, and refined customer experience.",
    stack: ["Shopify Liquid", "CSS", "JavaScript", "AJAX"],
  },
  {
    number: "03",
    type: "MERN Stack",
    title: "eCommerce Analytics Dashboard",
    description:
      "A MERN dashboard that visualises store performance, orders, customers, and growth trends in real time.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
];

const education = [
  {
    year: "Jan 2024 – Dec 2025",
    degree: "Master of Computer Applications (MCA)",
    school: "Indira Gandhi National Open University",
  },
  {
    year: "Jan 2021 – Dec 2023",
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Indira Gandhi National Open University",
  },
  {
    year: "Jul 2017 – Nov 2020",
    degree: "Computer Science Engineering (Diploma)",
    school: "Delhi Skill & Entrepreneurship University",
  },
];

const certifications = [
  {
    title: "Internship — Shopify, BigCommerce & WordPress CMS Development",
    issuer: "MakkPress Technologies",
    date: "Apr 2023",
  },
  {
    title: "Microsoft Professional Program in Full Stack Web Development",
    issuer: "Tech Explica",
    date: "Jan 2020",
  },
  {
    title: "Advance IT, WPR, Functional English & Soft Skill",
    issuer: "Tech Mahindra Foundation",
    date: "Aug 2019",
  },
];

export default function Homepage() {
  return (
    <div id="top" className="portfolio-shell">
      <Header />

      <main>
        <section
          id="home"
          className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8"
        >
          <div className="portfolio-grid absolute inset-0" />
          <div className="portfolio-float absolute -right-20 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(0,255,136,0.14),transparent_68%)]" />

          <div className="relative mx-auto max-w-7xl">
            <p className="portfolio-reveal portfolio-mono flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-[#00ff88]">
              <span className="h-px w-8 bg-[#00ff88]" />
              Shopify & MERN Developer
            </p>

            <h1 className="portfolio-reveal portfolio-reveal-delay-1 mt-8 max-w-5xl text-5xl font-extrabold leading-[0.98] text-white sm:text-7xl lg:text-[6.5rem]">
              Vikas <span className="portfolio-accent-text">Prasad</span>
            </h1>

            <p className="portfolio-reveal portfolio-reveal-delay-2 portfolio-mono mt-6 max-w-2xl text-sm leading-8 text-[#7a7a7a] sm:text-base">
              I build scalable eCommerce solutions, custom Shopify experiences,
              and full-stack products with clean architecture, strong frontend
              polish, and practical backend thinking.
            </p>

            <div className="portfolio-reveal portfolio-reveal-delay-3 mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#contact" className="portfolio-btn portfolio-btn-primary">
                Hire Me →
              </a>
              <Link to="/projects" className="portfolio-btn portfolio-btn-secondary">
                View Projects
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap gap-10">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`portfolio-reveal border-l-2 border-[#00ff88] pl-4 ${
                    index === 0
                      ? "portfolio-reveal-delay-1"
                      : index === 1
                        ? "portfolio-reveal-delay-2"
                        : "portfolio-reveal-delay-3"
                  }`}
                >
                  <p className="text-4xl font-extrabold text-[#00ff88]">{stat.value}</p>
                  <p className="portfolio-mono mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-[#7a7a7a]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="portfolio-section-label">About</p>
          <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Building commerce-focused products with clean code.
          </h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="portfolio-reveal portfolio-reveal-delay-1">
              <p className="text-base leading-8 text-[#c9c9c9]">
                I am a Shopify and MERN stack developer with strong experience
                across custom themes, embedded apps, dashboards, and eCommerce
                integrations. I enjoy creating interfaces that are fast, useful,
                and thoughtfully structured.
              </p>
              <p className="mt-5 text-base leading-8 text-[#c9c9c9]">
                My work spans Shopify Plus builds, full-stack applications,
                analytics platforms, and migration projects. I aim for visual
                polish without sacrificing maintainability.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {badges.map((badge) => (
                  <span
                    key={badge}
                    className="portfolio-mono border border-[#222222] px-4 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-[#7a7a7a] transition hover:border-[#00ff88] hover:text-[#00ff88]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-reveal portfolio-reveal-delay-2 portfolio-glass relative overflow-hidden p-8">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#00ff88]" />
              <h3 className="portfolio-mono text-sm uppercase tracking-[0.2em] text-[#00ff88]">
                Quick Facts
              </h3>
              <ul className="mt-6 space-y-4 text-sm text-[#b9b9b9]">
                <li>Based in Noida / Delhi NCR, India</li>
                <li>Currently working at Digi Sidekick</li>
                <li>5+ years of professional experience</li>
                <li>50+ eCommerce projects completed</li>
                <li>MCA from IGNOU</li>
                <li>Open to freelance and collaborations</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="portfolio-section-label">Experience</p>
          <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Work History
          </h2>

          <div className="mt-12 space-y-8 border-l border-[rgba(0,255,136,0.35)] pl-6">
            {experiences.map((experience, index) => (
              <article
                key={`${experience.company}-${experience.role}`}
                className={`portfolio-reveal relative ${
                  index === 0
                    ? "portfolio-reveal-delay-1"
                    : index === 1
                      ? "portfolio-reveal-delay-2"
                      : "portfolio-reveal-delay-3"
                }`}
              >
                <span className="absolute -left-[1.95rem] top-2 h-3 w-3 rounded-full bg-[#00ff88] shadow-[0_0_12px_#00ff88]" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="portfolio-mono text-xs uppercase tracking-[0.2em] text-[#00ff88]">
                      {experience.company}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{experience.role}</h3>
                  </div>
                  <span className="portfolio-mono border border-[#222222] px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-[#7a7a7a]">
                    {experience.date}
                  </span>
                </div>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[#a9a9a9]">
                  {experience.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {experience.tags.map((tag) => (
                    <span
                      key={tag}
                      className="portfolio-mono border border-[rgba(0,255,136,0.2)] bg-[rgba(0,255,136,0.07)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] text-[#00ff88]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="bg-[#111111] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="portfolio-section-label">Skills</p>
            <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
              Tech Stack
            </h2>

            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className={`portfolio-reveal portfolio-card-hover border border-[#222222] bg-[#161616] p-6 ${
                    index % 4 === 0
                      ? "portfolio-reveal-delay-1"
                      : index % 4 === 1
                        ? "portfolio-reveal-delay-2"
                        : index % 4 === 2
                          ? "portfolio-reveal-delay-3"
                          : "portfolio-reveal-delay-4"
                  }`}
                >
                  <p className="portfolio-mono text-xs uppercase tracking-[0.16em] text-white">
                    {skill.name}
                  </p>
                  <div className="mt-5 h-1 w-full overflow-hidden bg-[#222222]">
                    <div
                      className="portfolio-skill-fill h-full bg-[#00ff88]"
                      style={{ width: skill.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="portfolio-section-label">Projects</p>
              <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                Featured Work
              </h2>
            </div>
            <Link
              to="/projects"
              className="portfolio-mono text-xs uppercase tracking-[0.22em] text-[#7a7a7a] transition hover:text-[#00ff88]"
            >
              See All Projects →
            </Link>
          </div>

          <div className="mt-12 grid gap-2 lg:grid-cols-3">
            {projectHighlights.map((project, index) => (
              <article
                key={project.number}
                className={`portfolio-reveal portfolio-card-hover relative overflow-hidden border border-[#222222] bg-[#131313] p-8 ${
                  index === 0
                    ? "portfolio-reveal-delay-1"
                    : index === 1
                      ? "portfolio-reveal-delay-2"
                      : "portfolio-reveal-delay-3"
                }`}
              >
                <div className="pointer-events-none absolute right-4 top-3 portfolio-mono text-5xl font-bold text-[rgba(0,255,136,0.08)]">
                  {project.number}
                </div>
                <p className="portfolio-mono text-[0.68rem] uppercase tracking-[0.24em] text-[#00ff88]">
                  {project.type}
                </p>
                <h3 className="mt-4 text-2xl font-extrabold text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#aaaaaa]">{project.description}</p>
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
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#111111] py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="portfolio-section-label">Education</p>
              <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                Academic Background
              </h2>
              <div className="mt-10 grid gap-2">
                {education.map((item, index) => (
                  <div
                    key={item.degree}
                    className={`portfolio-reveal border border-[#222222] bg-[#131313] p-6 ${
                      index === 0
                        ? "portfolio-reveal-delay-1"
                        : index === 1
                          ? "portfolio-reveal-delay-2"
                          : "portfolio-reveal-delay-3"
                    }`}
                  >
                    <p className="portfolio-mono text-[0.68rem] uppercase tracking-[0.18em] text-[#7a7a7a]">
                      {item.year}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-white">{item.degree}</h3>
                    <p className="portfolio-mono mt-2 text-sm text-[#00ff88]">{item.school}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="portfolio-section-label">Certifications</p>
              <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
                Licenses & Certs
              </h2>
              <div className="mt-10 space-y-2">
                {certifications.map((item, index) => (
                  <div
                    key={item.title}
                    className={`portfolio-reveal portfolio-card-hover border border-[#222222] bg-[#161616] p-6 ${
                      index === 0
                        ? "portfolio-reveal-delay-1"
                        : index === 1
                          ? "portfolio-reveal-delay-2"
                          : "portfolio-reveal-delay-3"
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        <p className="portfolio-mono mt-2 text-xs uppercase tracking-[0.14em] text-[#7a7a7a]">
                          {item.issuer}
                        </p>
                      </div>
                      <span className="portfolio-mono text-xs uppercase tracking-[0.14em] text-[#00ff88]">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <p className="portfolio-section-label">Contact</p>
          <h2 className="portfolio-reveal mt-4 text-4xl font-extrabold text-white sm:text-5xl">
            Let&apos;s Build Together
          </h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="portfolio-reveal portfolio-reveal-delay-1">
              <p className="portfolio-mono text-xs uppercase tracking-[0.2em] text-[#7a7a7a]">
                Available for
              </p>
              <p className="mt-3 text-3xl font-bold text-white">
                Shopify Projects, MERN Apps & Freelance Work
              </p>
              <div className="mt-8 space-y-4">
                <a
                  href="https://in.linkedin.com/in/vikas-prasad-073b90183"
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-mono block text-sm text-[#b6b6b6] transition hover:text-[#00ff88]"
                >
                  linkedin.com/in/vikas-prasad-073b90183
                </a>
                <a
                  href="mailto:vikasprasad@email.com"
                  className="portfolio-mono block text-sm text-[#b6b6b6] transition hover:text-[#00ff88]"
                >
                  vikasprasad@email.com
                </a>
                <p className="portfolio-mono text-sm text-[#b6b6b6]">Delhi NCR, India</p>
              </div>
            </div>

            <div className="portfolio-reveal portfolio-reveal-delay-2 grid gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="border border-[#222222] bg-[#161616] px-5 py-4 text-white outline-none transition focus:border-[#00ff88]"
              />
              <input
                type="email"
                placeholder="your@email.com"
                className="border border-[#222222] bg-[#161616] px-5 py-4 text-white outline-none transition focus:border-[#00ff88]"
              />
              <textarea
                rows="5"
                placeholder="Tell me about your project..."
                className="border border-[#222222] bg-[#161616] px-5 py-4 text-white outline-none transition focus:border-[#00ff88]"
              />
              <button type="button" className="portfolio-btn portfolio-btn-primary w-fit">
                Send Message →
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
