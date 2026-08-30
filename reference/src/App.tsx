import { useState, useEffect } from "react";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  bg:      "#1A1816",
  surface: "#221F1C",
  lift:    "#2C2825",
  text:    "#C0BAB2",
  muted:   "#6A6460",
  dim:     "#3A3632",
  rule:    "rgba(192,186,178,0.1)",
  blue:    "#4A7EC0",   // bold — use sparingly
  amber:   "#B87820",  // bolder still — use very sparingly
};

type Discipline = "xr" | "ux";

// ─── Data ────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: "001", title: "Void Protocol",
    subtitle: "VR psychological horror",
    discipline: "xr" as Discipline, year: "2024",
    platform: "Meta Quest 3 / PCVR", engine: "Unreal Engine 5",
    tags: ["VR", "6DOF", "Spatial Audio", "Haptics"],
    img: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=1200&h=800&fit=crop&auto=format",
    alt: "Dark atmospheric VR environment",
    desc: "Single-player horror, 6DOF. Three months of presence research with 42 participants shaped every design decision before an asset was built.",
  },
  {
    id: "002", title: "XR Onboarding Patterns",
    subtitle: "Multi-platform research programme",
    discipline: "ux" as Discipline, year: "2024",
    platform: "Cross-platform", engine: "Mixed Methods",
    tags: ["User Studies", "Pattern Library", "Spatial UX"],
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=700&fit=crop&auto=format",
    alt: "Research session",
    desc: "12 weeks, 78 participants, 5 platforms. Public pattern library now adopted by three studios. Presented at CHI 2024.",
  },
  {
    id: "003", title: "Nexus Arena",
    subtitle: "5v5 competitive multiplayer",
    discipline: "xr" as Discipline, year: "2024",
    platform: "PC / Console", engine: "Unity 6",
    tags: ["Multiplayer", "Rollback Netcode", "Playtesting"],
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=600&fit=crop&auto=format",
    alt: "Arena game",
    desc: "Custom rollback netcode. Four embedded playtest cohorts drove a full UI redesign between alpha and ship.",
  },
  {
    id: "004", title: "Spatial Mental Models",
    subtitle: "Eye-tracking study — passthrough AR",
    discipline: "ux" as Discipline, year: "2023",
    platform: "Vision Pro / Quest 3", engine: "Qualitative + Quant",
    tags: ["Eye Tracking", "Think-Aloud", "Passthrough AR"],
    img: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=900&h=700&fit=crop&auto=format",
    alt: "Mixed reality installation",
    desc: "60 participants. Heatmaps, task-completion analysis, and retrospective interviews across two headset generations.",
  },
  {
    id: "005", title: "Terrain AR",
    subtitle: "Geospatial field research tool",
    discipline: "xr" as Discipline, year: "2023",
    platform: "iOS / Android", engine: "Unity + ARFoundation",
    tags: ["AR", "LiDAR", "Geospatial"],
    img: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=900&h=600&fit=crop&auto=format",
    alt: "AR terrain app",
    desc: "LiDAR-powered geospatial overlay for field researchers. Validated through contextual inquiry with 18 domain experts.",
  },
];

const skillGroups = [
  { label: "XR Dev",      items: ["Unreal Engine 5", "Unity 6", "OpenXR / WebXR", "HLSL / ShaderGraph", "Rollback Netcode"] },
  { label: "UX Research", items: ["User Interviews", "Usability Testing", "Think-Aloud", "Eye Tracking", "Diary Studies"] },
  { label: "Analysis",    items: ["Thematic Coding", "Affinity Mapping", "Journey Mapping", "Statistical Analysis", "Heuristic Eval"] },
  { label: "Tools",       items: ["Figma / FigJam", "Dovetail", "C++ / C# / Python", "SPSS / R", "Miro"] },
];

const process = [
  { n: "01", title: "Research first",       body: "Every project begins with understanding people — who they are, what they expect, and where current systems fail them." },
  { n: "02", title: "Prototype in engine",  body: "Paper wireframes don't capture spatial feel. I prototype in Unity or Unreal early so decisions are grounded in real physics and latency." },
  { n: "03", title: "Test in context",      body: "Lab studies miss the messy middle. Sessions run in living rooms, offices, and public spaces." },
  { n: "04", title: "Ship, close the loop", body: "Post-launch telemetry and follow-up studies feed the next cycle. Publishable findings go back into the community." },
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function Mono({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color, letterSpacing: "0.1em" }}
      className="uppercase">
      {children}
    </span>
  );
}

function SectionRule() {
  return <div style={{ height: 1, background: C.rule }} />;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header style={{
      background: scrolled ? `${C.bg}f2` : "transparent",
      borderBottom: scrolled ? `1px solid ${C.rule}` : "none",
      backdropFilter: scrolled ? "blur(8px)" : undefined,
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 56px" }}
        className="px-6 md:px-14">
        <a href="#hero" style={{ fontFamily: "var(--font-display)", color: C.text, fontSize: 17, fontWeight: 600, letterSpacing: "0.1em" }}
          className="uppercase">
          KAI NAKAMURA
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {["Work", "Process", "About", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "var(--font-display)", color: C.muted, fontSize: 14, fontWeight: 500, letterSpacing: "0.08em" }}
              className="uppercase hover:text-[#C0BAB2] transition-colors duration-200">
              {item}
            </a>
          ))}
          <a href="#contact"
            style={{ fontFamily: "var(--font-display)", background: C.blue, color: "#F0EDE8", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", padding: "7px 18px" }}
            className="uppercase hover:opacity-90 transition-opacity">
            Hire me
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ fontFamily: "var(--font-mono)", color: C.muted, fontSize: 10, letterSpacing: "0.12em" }}>
          {open ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {open && (
        <div style={{ background: C.surface, borderBottom: `1px solid ${C.rule}`, padding: "20px 24px" }}
          className="md:hidden flex flex-col gap-5">
          {["Work", "Process", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-display)", color: C.muted, fontSize: 15, letterSpacing: "0.08em" }}
              className="uppercase hover:text-[#C0BAB2] transition-colors">
              {item}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col pt-16 dot-matrix overflow-hidden"
      style={{ borderBottom: `1px solid ${C.rule}` }}>

      {/* Left coordinate rail */}
      <div className="absolute left-0 top-0 bottom-0 w-10 hidden md:flex flex-col items-center justify-center gap-3 py-20"
        style={{ borderRight: `1px solid ${C.rule}` }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: `${C.muted}60`, writingMode: "vertical-rl" }}>
            {String(i * 8).padStart(3, "0")}
          </span>
        ))}
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-16">

        {/* Status strip */}
        <div className="flex items-center gap-4 mb-10">
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.blue, display: "inline-block" }} />
          <Mono color={C.blue}>SYSTEM ONLINE</Mono>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${C.blue}40, transparent)` }} />
          <Mono>REF 2024.KN</Mono>
        </div>

        {/* Name */}
        <h1 style={{ fontFamily: "var(--font-display)", color: C.text, lineHeight: 0.88, letterSpacing: "0.04em", fontWeight: 700 }}
          className="text-[clamp(4rem,12vw,11rem)] uppercase">
          KAI<br />NAKAMURA
        </h1>

        {/* Roles — muted, smaller */}
        <div className="mt-6 flex flex-wrap gap-6">
          {["XR & Game Developer", "UX Researcher"].map((role, i) => (
            <span key={role}
              style={{ fontFamily: "var(--font-display)", color: C.muted, fontSize: "clamp(0.9rem,2vw,1.5rem)", fontWeight: 300, letterSpacing: "0.08em" }}
              className="uppercase">
              {i > 0 && <span style={{ color: C.dim, marginRight: 24 }}>/</span>}
              {role}
            </span>
          ))}
        </div>

        <p className="mt-8 text-[14px] leading-relaxed font-light max-w-md"
          style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
          Building immersive experiences and understanding who inhabits them.
          Full-cycle — from user studies through engine implementation and ship.
        </p>

        {/* Spec block */}
        <div className="mt-12 border max-w-xl"
          style={{ borderColor: C.rule }}>
          {[
            { label: "Location",     value: "Amsterdam, NL" },
            { label: "Disciplines",  value: "XR Dev  /  UX Research" },
            { label: "Availability", value: "Open — Q1 2025" },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: C.rule }}>
              <Mono>{label}</Mono>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: C.text }}>{value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#work"
            style={{ fontFamily: "var(--font-display)", background: C.blue, color: "#F0EDE8", letterSpacing: "0.1em", padding: "12px 32px", fontWeight: 600, fontSize: 14 }}
            className="uppercase hover:opacity-90 transition-opacity">
            View Work →
          </a>
          <a href="#contact"
            style={{ fontFamily: "var(--font-display)", border: `1px solid ${C.rule}`, color: C.muted, letterSpacing: "0.1em", padding: "12px 32px", fontWeight: 500, fontSize: 14 }}
            className="uppercase hover:border-[#6A6460] hover:text-[#C0BAB2] transition-all">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Bottom tick rail */}
      <div style={{ height: 28, borderTop: `1px solid ${C.rule}` }}
        className="flex items-end px-8 md:px-20 pb-2 gap-8">
        {["UNREAL ENGINE 5", "UNITY 6", "OPENXR", "FIGMA", "DOVETAIL"].map(p => (
          <Mono key={p}>{p}</Mono>
        ))}
      </div>
    </section>
  );
}

// ─── Work ─────────────────────────────────────────────────────────────────────
function Work() {
  const [filter, setFilter] = useState<"all" | Discipline>("all");
  const visible = filter === "all" ? projects : projects.filter(p => p.discipline === filter);

  return (
    <section id="work" className="px-6 md:px-14 py-20"
      style={{ borderBottom: `1px solid ${C.rule}` }}>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <Mono>Section 01</Mono>
          <h2 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700, lineHeight: 0.9 }}
            className="text-[clamp(2.2rem,6vw,5rem)] uppercase mt-2">
            Selected<br />Work
          </h2>
        </div>

        {/* Filter — function-key style */}
        <div className="flex" style={{ border: `1px solid ${C.rule}` }}>
          {(["all", "xr", "ux"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "0.08em",
                fontWeight: 600,
                fontSize: 12,
                background: filter === f ? C.blue : "transparent",
                color: filter === f ? "#F0EDE8" : C.muted,
                borderRight: `1px solid ${C.rule}`,
                padding: "8px 18px",
              }}
              className="uppercase last:border-r-0 hover:text-[#C0BAB2] transition-colors">
              {f === "all" ? "F1: All" : f === "xr" ? "F2: Dev" : "F3: Research"}
            </button>
          ))}
        </div>
      </div>

      <SectionRule />
      {visible.map(project => <ProjectRow key={project.id} project={project} />)}
    </section>
  );
}

function ProjectRow({ project }: { project: typeof projects[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${C.rule}` }}>
      <button className="w-full text-left py-6 flex items-start md:items-center justify-between gap-6 group"
        onClick={() => setOpen(!open)}>
        <div className="flex items-baseline gap-5 flex-1 min-w-0">
          <Mono color={C.dim}>{project.id}</Mono>
          <div className="min-w-0">
            <h3 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700 }}
              className="text-[clamp(1.2rem,2.8vw,2.2rem)] uppercase leading-tight">
              {project.title}
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", color: C.muted, fontSize: 11, marginTop: 2 }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <div className="hidden md:flex items-center gap-4">
            <Mono>{project.year}</Mono>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em",
              border: `1px solid ${project.discipline === "xr" ? C.blue : C.muted}60`,
              color: project.discipline === "xr" ? C.blue : C.muted,
              padding: "2px 8px",
            }} className="uppercase">
              {project.discipline === "xr" ? "DEV" : "RESEARCH"}
            </span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", color: C.muted, fontSize: 16 }}
            className="group-hover:text-[#C0BAB2] transition-colors">
            {open ? "−" : "+"}
          </span>
        </div>
      </button>

      {open && (
        <div className="pb-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 overflow-hidden" style={{ background: C.lift }}>
            <img src={project.img} alt={project.alt}
              className="w-full h-[260px] object-cover"
              style={{ filter: "brightness(0.5) saturate(0.3) sepia(10%)" }} />
          </div>
          <div className="md:col-span-7">
            <p className="text-[13px] leading-relaxed font-light mb-6"
              style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
              {project.desc}
            </p>
            <div style={{ border: `1px solid ${C.rule}` }}>
              {[
                { label: "Platform",       value: project.platform },
                { label: "Engine/Method",  value: project.engine },
                { label: "Delivered",      value: project.year },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
                  style={{ borderColor: C.rule }}>
                  <Mono>{label}</Mono>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: C.text }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map(t => (
                <span key={t}
                  style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: C.muted, letterSpacing: "0.1em", border: `1px solid ${C.dim}`, padding: "3px 8px" }}
                  className="uppercase">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Interlude ────────────────────────────────────────────────────────────────
function Interlude() {
  return (
    <div className="relative overflow-hidden"
      style={{ height: "46vh", minHeight: 300, borderBottom: `1px solid ${C.rule}` }}>
      <img
        src="https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1800&h=900&fit=crop&auto=format"
        alt="Mixed reality installation"
        className="w-full h-full object-cover"
        style={{ filter: "brightness(0.28) saturate(0.2) sepia(15%)" }}
      />
      <div className="absolute inset-0 dot-matrix opacity-40" />
      <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-14 pb-10">
        <Mono color={`${C.muted}70`}>Liminal Worlds — MR Installation — 2022</Mono>
        <p style={{ fontFamily: "var(--font-display)", color: C.text, lineHeight: 0.9, letterSpacing: "0.03em", fontWeight: 700 }}
          className="text-[clamp(2.5rem,7vw,6rem)] uppercase mt-3">
          Two disciplines.<br />
          <span style={{ color: C.blue, fontWeight: 300 }}>One practice.</span>
        </p>
      </div>
    </div>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section id="process" className="px-6 md:px-14 py-20 dot-matrix"
      style={{ borderBottom: `1px solid ${C.rule}` }}>

      <div className="flex items-baseline gap-4 mb-14">
        <Mono>Section 02</Mono>
        <h2 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700, lineHeight: 0.9 }}
          className="text-[clamp(2.2rem,6vw,5rem)] uppercase">
          How I Work
        </h2>
      </div>

      {/* Two-voice panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border max-w-3xl mb-12"
        style={{ borderColor: C.rule }}>
        {[
          { role: "Developer",  body: "I build in Unreal and Unity — shaders, netcode, spatial interaction, performance profiling. I own the implementation, not just the spec." },
          { role: "Researcher", body: "I plan and run user studies, analyse qualitative and quantitative data, and translate findings into decisions that actually ship." },
        ].map(({ role, body }, i) => (
          <div key={role} className="p-6 border-r last:border-r-0"
            style={{ background: C.surface, borderColor: C.rule }}>
            <div className="flex items-center gap-2 mb-4">
              {/* Only the Developer gets the one bold-color dot */}
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? C.blue : C.muted, display: "inline-block" }} />
              <Mono color={i === 0 ? C.blue : C.muted}>{role}</Mono>
            </div>
            <p className="text-[13px] leading-relaxed font-light"
              style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border"
        style={{ borderColor: C.rule }}>
        {process.map(({ n, title, body }) => (
          <div key={n} className="p-6 border-r last:border-r-0"
            style={{ background: C.surface, borderColor: C.rule }}>
            <p style={{ fontFamily: "var(--font-display)", color: C.dim, fontSize: 40, fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em" }}
              className="mb-4">
              {n}
            </p>
            <h3 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.06em", fontWeight: 600 }}
              className="text-[14px] uppercase mb-3">
              {title}
            </h3>
            <p className="text-[12px] leading-relaxed font-light"
              style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="px-6 md:px-14 py-20"
      style={{ borderBottom: `1px solid ${C.rule}` }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

        {/* Portrait */}
        <div className="md:col-span-4">
          <div className="overflow-hidden" style={{ background: C.lift }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700&h=900&fit=crop&auto=format"
              alt="Portrait"
              className="w-full h-[440px] object-cover"
              style={{ filter: "brightness(0.55) saturate(0.25) sepia(10%)" }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            <Mono>Amsterdam, NL</Mono>
            <Mono>2024</Mono>
          </div>
        </div>

        {/* Bio */}
        <div className="md:col-span-8">
          <div className="flex items-baseline gap-4 mb-10">
            <Mono>Section 03</Mono>
            <h2 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700, lineHeight: 0.9 }}
              className="text-[clamp(2.2rem,6vw,5rem)] uppercase">
              About
            </h2>
          </div>

          <div className="space-y-4 text-[14px] leading-relaxed font-light max-w-xl mb-12"
            style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
            <p>
              I'm Kai Nakamura — XR developer and UX researcher, eight years building
              and studying immersive technology from both sides of the monitor.
            </p>
            <p>
              Research gives engineering decisions an empirical anchor. Engineering makes
              research actionable — a usability finding can become a pull request the same day.
            </p>
            <p>
              Previously at{" "}
              <span style={{ color: C.text }}>Niantic Labs</span>,{" "}
              <span style={{ color: C.text }}>Ready at Dawn</span>, and{" "}
              <span style={{ color: C.text }}>Microsoft Research</span>.
              Now independent.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border mb-10"
            style={{ borderColor: C.rule }}>
            {[
              { n: "8+",   label: "Years XR" },
              { n: "200+", label: "Participants" },
              { n: "22",   label: "Shipped titles" },
              { n: "3",    label: "GDC talks" },
            ].map(({ n, label }) => (
              <div key={label} className="p-5 border-r last:border-r-0"
                style={{ background: C.surface, borderColor: C.rule }}>
                <p style={{ fontFamily: "var(--font-display)", color: C.text, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, lineHeight: 1, letterSpacing: "0.04em" }}>
                  {n}
                </p>
                <Mono>{label}</Mono>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-8">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <Mono color={C.muted}>{group.label}</Mono>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map(item => (
                    <li key={item} className="text-[12px] font-light"
                      style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  const types = ["VR Experience", "AR Application", "Game Development", "UX Research", "Embedded Research", "Mixed Reality", "Consulting"];

  const fieldStyle = {
    background: "transparent",
    borderBottom: `1px solid ${C.rule}`,
    padding: "10px 0",
    fontSize: 13,
    color: C.text,
    width: "100%",
    outline: "none",
    fontFamily: "var(--font-sans)",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="px-6 md:px-14 py-20 dot-matrix">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">

        {/* Left */}
        <div className="md:col-span-4">
          <div className="flex items-baseline gap-4 mb-10">
            <Mono>Section 04</Mono>
            <h2 style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700, lineHeight: 0.9 }}
              className="text-[clamp(2.2rem,6vw,5rem)] uppercase">
              Start a<br />Project
            </h2>
          </div>

          <p className="text-[13px] leading-relaxed font-light mb-10"
            style={{ color: C.muted, fontFamily: "var(--font-sans)" }}>
            Open for XR development, embedded research, and hybrid engagements
            where both disciplines matter.
          </p>

          <div style={{ border: `1px solid ${C.rule}` }}>
            {[
              { label: "Email",    value: "kai@nakamura.dev" },
              { label: "Location", value: "Amsterdam / Remote" },
              { label: "Dev",      value: "Q1 2025 — Open" },
              { label: "Research", value: "Q1 2025 — Limited" },
              { label: "Response", value: "< 24 hours" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-4 py-3.5 border-b last:border-b-0"
                style={{ borderColor: C.rule, background: C.surface }}>
                <Mono>{label}</Mono>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: C.text }}>{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-6">
            {["GitHub", "LinkedIn", "Scholar"].map(s => (
              <a key={s} href="#"
                style={{ fontFamily: "var(--font-display)", color: C.muted, fontSize: 13, letterSpacing: "0.08em" }}
                className="uppercase hover:text-[#C0BAB2] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-8">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-24 text-center border"
              style={{ borderColor: C.rule, background: C.surface }}>
              <Mono color={C.blue}>Transmission received</Mono>
              <p style={{ fontFamily: "var(--font-display)", color: C.text, letterSpacing: "0.04em", fontWeight: 700 }}
                className="text-[clamp(2rem,5vw,4rem)] uppercase mt-4">
                I'll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: "Name",  key: "name",  type: "text",  ph: "Your name" },
                  { label: "Email", key: "email", type: "email", ph: "your@email.com" },
                ].map(({ label, key, type, ph }) => (
                  <div key={key}>
                    <Mono>{label}</Mono>
                    <input type={type} required placeholder={ph}
                      value={form[key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{ ...fieldStyle, marginTop: 8, display: "block" }}
                      onFocus={e => { e.currentTarget.style.borderBottomColor = C.blue; }}
                      onBlur={e => { e.currentTarget.style.borderBottomColor = C.rule; }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <Mono>Engagement type</Mono>
                <div className="flex flex-wrap gap-2 mt-3">
                  {types.map(type => {
                    const active = form.type === type;
                    return (
                      <button key={type} type="button"
                        onClick={() => setForm({ ...form, type })}
                        style={{
                          fontFamily: "var(--font-display)",
                          letterSpacing: "0.08em",
                          fontWeight: 600,
                          fontSize: 12,
                          background: active ? C.blue : "transparent",
                          color: active ? "#F0EDE8" : C.muted,
                          border: `1px solid ${active ? C.blue : C.dim}`,
                          padding: "6px 14px",
                        }}
                        className="uppercase hover:border-[#6A6460] hover:text-[#C0BAB2] transition-all duration-150">
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Mono>Message</Mono>
                <textarea required rows={6}
                  placeholder="Platform, research goals, timeline..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ ...fieldStyle, resize: "none", display: "block", marginTop: 8 }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = C.blue; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = C.rule; }}
                />
              </div>

              <button type="submit"
                style={{ fontFamily: "var(--font-display)", background: C.blue, color: "#F0EDE8", letterSpacing: "0.1em", fontWeight: 700, fontSize: 14, width: "100%", padding: "14px" }}
                className="uppercase hover:opacity-90 transition-opacity">
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-6 md:px-14 py-6 flex flex-col md:flex-row items-center justify-between gap-3"
      style={{ borderTop: `1px solid ${C.rule}` }}>
      <Mono>© 2024 Kai Nakamura — All rights reserved</Mono>
      <div className="flex items-center gap-3">
        <Mono>XR Dev</Mono>
        <span style={{ color: C.dim }}>·</span>
        <Mono>UX Research</Mono>
        <span style={{ color: C.dim }}>·</span>
        <Mono>Amsterdam</Mono>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Interlude />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
