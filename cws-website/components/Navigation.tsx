"use client";

import { SITE } from "@/lib/data";

const NAV = [
  { label: "Episodes", href: "#episodes" },
  { label: "About", href: "#show" },
  { label: "For Brands", href: "#brands" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12"
      data-cursor="hover"
    >
      {/* FIX 6: Logo - profile photo + wordmark, aligned on baseline */}
      <a
        href="#top"
        className="group flex items-center"
        style={{ gap: "8px" }}
        data-cursor="hover"
      >
        <img
            src="/images/profile-Photoroom-nobg.png"
          alt="Coffee With Storyphiler profile"
          width={512}
          height={376}
          className="h-14 w-auto flex-shrink-0 object-contain align-middle md:h-20"
          style={{
            imageRendering: "-webkit-optimize-contrast",
          }}
        />
        <span
          className="hidden font-sans uppercase md:inline"
          style={{
            color: "#F5E2C8",
            fontSize: "11px",
            letterSpacing: "0.22em",
            fontWeight: 600,
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          Coffee With Storyphiler
        </span>
        <span
          className="font-sans uppercase md:hidden"
          style={{
            color: "#F5E2C8",
            fontSize: "11px",
            letterSpacing: "0.22em",
            fontWeight: 600,
            lineHeight: 1,
            marginTop: "1px",
          }}
        >
          CWS
        </span>
      </a>

      {/* Desktop nav — update.txt: 11px, 0.18em, color rgba(255,255,255,0.75),
          hover #FAFAFA, underline draws left-to-right (300ms ease) */}
      <nav className="hidden items-center gap-8 md:flex">
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="text-[11px] uppercase"
            style={{
              position: "relative",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
            }}
            data-cursor="hover"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FAFAFA";
              const line = e.currentTarget.querySelector(".nav-line") as HTMLElement;
              if (line) line.style.width = "100%";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              const line = e.currentTarget.querySelector(".nav-line") as HTMLElement;
              if (line) line.style.width = "0%";
            }}
          >
            {n.label}
            <span className="nav-line absolute -bottom-[4px] left-0 h-px bg-cream transition-all duration-300" style={{ width: "0%" }} />
          </a>
        ))}
        <a
          href={SITE.youtube.subscribe}
          target="_blank"
          rel="noreferrer"
          className="rounded-full px-5 py-2 text-[12px] uppercase transition-all duration-300 hover:bg-amber hover:border-amber hover:text-studio"
          style={{
            letterSpacing: "0.18em",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "var(--cream)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F5A623";
            e.currentTarget.style.borderColor = "#F5A623";
            e.currentTarget.style.color = "#0D0D0D";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
            e.currentTarget.style.color = "var(--cream)";
          }}
          data-cursor="hover"
        >
          Subscribe on YouTube
        </a>
      </nav>

      {/* Mobile compact: amber SUBSCRIBE button (sticky bottom is separate) */}
      <a
        href={SITE.youtube.subscribe}
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-amber px-3 py-2 text-xs font-bold uppercase text-black md:hidden"
        style={{ letterSpacing: "0.2em" }}
      >
        Subscribe
      </a>
    </header>
  );
}
