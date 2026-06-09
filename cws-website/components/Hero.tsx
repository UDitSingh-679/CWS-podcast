"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { HERO_EPISODE_CARDS, SITE } from "@/lib/data";

const HERO_IMG_DESKTOP = "/images/herosection.jpg";
const HERO_IMG_MOBILE = "/images/mobileHeroSection.jpg";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);
  const wmY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "20%"]);
  const stripX = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? ["0%", "0%"] : ["0%", "-40%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-studio"
    >
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ y: bgY, willChange: "transform" }}
      >
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)"
        }} />
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='grain'><feTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23grain)'/></svg>")`,
          opacity: 0.06,
          mixBlendMode: "overlay" as any,
        }} />
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMG_MOBILE} />
          <img
            src={HERO_IMG_DESKTOP}
            alt="Sumit Nayak, host of Coffee With Storyphiler, in the Sikar studio"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.92)" }}
          />
        </picture>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] hidden items-end justify-center overflow-hidden md:flex"
        style={{ y: wmY, willChange: "transform" }}
        aria-hidden
      >
        <span
          className="translate-y-[10%] whitespace-nowrap px-4"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(220px, 28vw, 460px)",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.01em",
            lineHeight: 0.9,
          }}
        >
          CWS
        </span>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 z-[1] flex justify-center overflow-hidden md:hidden"
        style={{
          bottom: "15%",
          y: wmY,
          willChange: "transform",
        }}
        aria-hidden
      >
        <span
          className="whitespace-nowrap px-4"
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(160px, 38vw, 320px)",
            color: "rgba(255,255,255,0.12)",
            letterSpacing: "0.01em",
            lineHeight: 0.9,
          }}
        >
          CWS
        </span>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.8, duration: 0.9 }}
        className="absolute left-0 right-0 top-0 z-[3] px-8 md:px-12 lg:px-16"
        style={{ paddingTop: "clamp(72px, 14vh, 140px)" }}
      >
        <div
          className="flex flex-col items-start gap-4 md:gap-5"
          style={{ maxWidth: "clamp(420px, 92vw, 1000px)" }}
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-7 bg-cream/60" aria-hidden />
            <p
              className="text-[11px] font-semibold uppercase text-cream/80 md:text-xs"
              style={{ letterSpacing: "0.3em", lineHeight: "1" }}
            >
              New episode every week
            </p>
          </div>
          <h1
            className="text-left uppercase text-cream"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 120px)",
              lineHeight: "1.02",
              letterSpacing: "-0.035em",
              textWrap: "balance",
            }}
          >
            Real
            <br />
            conversations
            <br />
            from Sikar
          </h1>
        </div>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: 1.2, duration: 0.8 }}
        className="absolute bottom-20 left-0 right-0 z-20 flex flex-col gap-4 px-6 md:bottom-24 md:flex-row md:items-end md:justify-between md:px-12"
      >
        <motion.div
          className="flex w-full max-w-2xl gap-3 overflow-x-auto pb-2 md:overflow-visible"
          style={{ x: stripX, willChange: "transform" }}
        >
          {HERO_EPISODE_CARDS.map((ep) => (
            <a
              key={ep.videoId}
              href={`https://www.youtube.com/watch?v=${ep.videoId}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="group relative h-[100px] w-[180px] flex-shrink-0 overflow-hidden border border-cream/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-cream/50"
              style={{
                borderRadius: "4px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={`https://i.ytimg.com/vi/${ep.videoId}/mqdefault.jpg`}
                alt={ep.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "grayscale(40%) brightness(0.65)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span
                className="absolute left-2 top-2 text-[10px] uppercase text-lime"
                style={{ letterSpacing: "0.2em" }}
              >
                {ep.num}
              </span>
              <span className="absolute bottom-2 left-2 right-2 text-[12px] font-medium text-cream">
                {ep.title}
              </span>
              <span className="absolute bottom-2 right-2 text-[9px] uppercase text-cream/0 transition-all duration-300 group-hover:text-cream">
                ▶ Watch
              </span>
              <div
                className="absolute -bottom-2 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-amber opacity-0 transition-all duration-300 group-hover:w-2/3 group-hover:opacity-100"
                style={{ boxShadow: "0 8px 24px rgba(245,166,35,0.4)" }}
              />
            </a>
          ))}
        </motion.div>

        <a
          href={SITE.youtube.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="group hidden flex-shrink-0 items-center gap-2 md:inline-flex"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "rgba(245, 232, 200, 0.12)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(245, 232, 200, 0.3)",
            color: "#F5E2C8",
            borderRadius: "24px",
            padding: "12px 24px",
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            transition: "color 300ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#000000";
            const fill = e.currentTarget.querySelector(".amber-fill") as HTMLElement;
            if (fill) fill.style.transform = "translateY(0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#F5E2C8";
            const fill = e.currentTarget.querySelector(".amber-fill") as HTMLElement;
            if (fill) fill.style.transform = "translateY(100%)";
          }}
        >
          <span className="amber-fill absolute inset-0" style={{
            background: "var(--amber)",
            transform: "translateY(100%)",
            transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            zIndex: -1,
          }} />
          <span style={{ position: "relative", zIndex: 1 }}>
            Watch on YouTube
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ position: "relative", zIndex: 1 }}>
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}
