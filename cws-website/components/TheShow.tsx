"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { POLAROIDS, SITE } from "@/lib/data";

function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  trigger,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  trigger: boolean;
}) {
  const [val, setVal] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number>();
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(eased * to);
      setVal(countRef.current);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trigger, to, duration]);
  return (
    <span>
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TheShow() {
  const ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [polaroids, setPolaroids] = useState([...POLAROIDS]);
  const [swapKey, setSwapKey] = useState(0);
  function handleSwap() {
    setPolaroids((prev) => {
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
    setSwapKey((k) => k + 1);
  }
  const [totalViews, setTotalViews] = useState<number>(SITE.youtube.totalViews);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error(`status ${res.status}`);
        const j = await res.json();
        if (cancelled) return;
        const live = j?.channelStats?.totalViews;
        if (typeof live === "number" && live > 0) {
          setTotalViews(live);
        } else if (Array.isArray(j?.episodes) && j.episodes.length) {
          setTotalViews(
            j.episodes.reduce((a: number, e: { views?: number }) => a + Number(e.views || 0), 0),
          );
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="show"
      className="relative bg-studio py-20 md:py-[120px]"
    >
      <div
        ref={ref}
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          paddingLeft: "clamp(20px, 4vw, 60px)",
          paddingRight: "clamp(20px, 4vw, 60px)",
        }}
      >
        <div className="relative flex items-center justify-center">
          <div aria-hidden className="absolute left-0 right-0 top-1/2 -translate-y-1/2" style={{ height: "1px", background: "rgba(255,255,255,0.15)" }} />
          <h2
            className="relative z-10 bg-studio px-6 text-center text-cream"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              fontSize: "clamp(40px, 6vw, 80px)",
            }}
          >
            COFFEE WITH STORYPHILER
          </h2>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-12">
            <p
              className="max-w-xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "#E8DDD0",
                fontSize: "18px",
              }}
            >
              Real conversations from{" "}
              <span
                className={`transition-colors duration-[400ms] ${
                  inView ? "text-lime" : "text-cream"
                }`}
              >
                Sikar
              </span>
              .{" "}
              <span
                className={`transition-colors duration-[400ms] delay-150 ${
                  inView ? "text-lime" : "text-cream"
                }`}
              >
                No script. No filter.
              </span>{" "}
              Every week, {SITE.host} sits down with people who have something
              worth saying — entrepreneurs, activists, thinkers, and the{" "}
              <span
                className={`transition-colors duration-[400ms] delay-300 ${
                  inView ? "text-lime" : "text-cream"
                }`}
              >
                quietly extraordinary
              </span>
              .
            </p>

            <div
              ref={statsRef}
              className="flex w-full flex-col sm:flex-row"
              style={{ paddingTop: "48px" }}
            >
              <div
                className="flex flex-1 flex-col"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="pt-6 text-lime"
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    fontSize: "clamp(56px, 7vw, 96px)",
                    lineHeight: 1,
                  }}
                >
                  <CountUp to={SITE.youtube.subscribers} trigger={statsInView} />
                </div>
                <p
                  className="mt-3 font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.2em", color: "#555555" }}
                >
                  YouTube Subscribers
                </p>
              </div>
              <div
                className="flex flex-1 flex-col sm:border-l"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderLeftColor: "rgba(255,255,255,0.1)",
                  paddingLeft: "clamp(20px, 2vw, 32px)",
                }}
              >
                <div
                  className="pt-6 text-lime"
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    fontSize: "clamp(56px, 7vw, 96px)",
                    lineHeight: 1,
                  }}
                >
                  <CountUp to={SITE.youtube.totalVideos} trigger={statsInView} />
                </div>
                <p
                  className="mt-3 font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.2em", color: "#555555" }}
                >
                  Episodes Published
                </p>
              </div>
              <div
                className="flex flex-1 flex-col sm:border-l"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderLeftColor: "rgba(255,255,255,0.1)",
                  paddingLeft: "clamp(20px, 2vw, 32px)",
                }}
              >
                <div
                  className="pt-6 text-lime"
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.01em",
                    fontSize: "clamp(56px, 7vw, 96px)",
                    lineHeight: 1,
                  }}
                >
                  <CountUp to={totalViews} trigger={statsInView} />
                </div>
                <p
                  className="mt-3 font-mono text-[10px] uppercase"
                  style={{ letterSpacing: "0.2em", color: "#555555" }}
                >
                  View
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative h-[520px] cursor-pointer"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={handleSwap}
            data-cursor="hover"
          >
            {polaroids.map((p, i) => {
              const baseRot = i === 0 ? -3 : i === 1 ? 2 : -1;
              const spreadRot = i === 0 ? -6 : i === 1 ? 0 : 5;
              const spreadX = i === 0 ? -10 : i === 1 ? 0 : 10;
              const rot = hovering ? spreadRot : baseRot;
              const x = hovering ? spreadX : 0;
              return (
                <motion.div
                  key={`${i}-${swapKey}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: inView && swapKey === 0 ? i * 0.2 : 0.05 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute"
                  style={{
                    top: `${i * 60}px`,
                    left: `${i === 0 ? 0 : i === 1 ? 80 : 40}px`,
                    zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
                    ...(prefersReducedMotion ? {} : {
                      transform: `rotate(${rot}deg) translateX(${x}px) ${
                        hovering && i === 1 ? "scale(1.02)" : ""
                      }`,
                      transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }),
                  }}
                >
                  <div
                    className="bg-white p-2"
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                      border: "3px solid white",
                    }}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="h-[340px] w-[260px] object-cover"
                      loading="lazy"
                    />
                    <p
                      className="mt-2 px-1 pb-1 font-editorial text-[12px] italic text-black/70"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {p.caption}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
