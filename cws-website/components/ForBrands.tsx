"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SITE, formatSubs } from "@/lib/data";
import MarqueeTicker from "./MarqueeTicker";

const CARDS = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a7 7 0 0 1 16 0v1" />
      </svg>
    ),
    title: "AUDIENCE",
    body: "Hindi-speaking, 18–35 age group, Rajasthan + pan-India reach",
    accent: "lime",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="2" width="6" height="12" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
    title: "FORMAT",
    body: "Organic mid-roll mentions, dedicated episodes, Instagram reels",
    accent: "lime",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" y1="20" x2="4" y2="10" />
        <line x1="10" y1="20" x2="10" y2="4" />
        <line x1="16" y1="20" x2="16" y2="14" />
        <line x1="22" y1="20" x2="22" y2="8" />
      </svg>
    ),
    title: "REACH",
    body: `${formatSubs(SITE.youtube.subscribers)} YouTube subscribers + ${formatSubs(
      SITE.instagram.followers
    )} Instagram followers`,
    accent: "lime",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    title: "WORK WITH US",
    body: "Reach out to discuss a partnership that actually makes sense.",
    accent: "amber",
  },
];

export default function ForBrands() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="brands"
      className="bg-brands-bg"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <MarqueeTicker
        className=""
        items={[
          "Brand Partnerships",
          "Authentic Hindi Audience",
          "Tier-2 India",
          "Sponsored Episodes",
          "Sikar",
          "Rajasthan",
          "Real Reach",
        ]}
      />

      <div ref={ref} className="mx-auto py-20 md:py-[120px]" style={{
        maxWidth: "1400px",
        paddingLeft: "clamp(20px, 4vw, 60px)",
        paddingRight: "clamp(20px, 4vw, 60px)",
      }}
      >
        <div className="relative flex items-center gap-4">
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: "3px",
              height: "40px",
              borderRadius: "4px",
              background: "#D4F87A",
            }}
          />
          <h2
            className="text-cream"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              lineHeight: 0.9,
              fontSize: "clamp(40px, 5vw, 64px)",
              letterSpacing: "0.02em",
            }}
          >
            WHY BRANDS WORK WITH US
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <p
              className="text-[19px]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "#C8BFB3",
                maxWidth: "640px",
              }}
            >
              CWS reaches a real, loyal Hindi-speaking audience that actually
              watches. No inflated numbers. No bots. If your brand wants{" "}
              <span
                className={`transition-colors duration-500 ${
                  inView ? "text-lime" : "text-cream"
                }`}
              >
                authentic reach in Tier-2 India
              </span>{" "}
              — the audience that&apos;s growing, buying, and paying attention —
              this is where you show up.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                data-cursor="hover"
                className="group border p-7 transition-all duration-250"
                style={{
                  borderRadius: "4px",
                  background: "rgba(255,255,255,0.03)",
                  borderColor:
                    c.accent === "amber"
                      ? "rgba(245,166,35,0.3)"
                      : "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  padding: "28px 24px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor =
                    c.accent === "amber"
                      ? "rgba(245,166,35,0.4)"
                      : "rgba(212,248,122,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor =
                    c.accent === "amber"
                      ? "rgba(245,166,35,0.3)"
                      : "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    c.accent === "amber" ? "text-amber" : "text-lime"
                  }`}
                >
                  {c.icon}
                </div>
                <h3
                  className="font-mono uppercase"
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.2em",
                    color: "#888888",
                    marginBottom: "12px",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "#C0B8B0",
                    fontWeight: 400,
                  }}
                >
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-[14px] font-medium uppercase text-studio transition-all duration-300 hover:scale-[1.02] hover:bg-[#E09515]"
            style={{ letterSpacing: "0.15em" }}
          >
            Start a Conversation
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
