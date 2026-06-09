"use client";

import { useEffect, useRef, useState } from "react";
import { motion, PanInfo, useReducedMotion } from "framer-motion";
import { FALLBACK_EPISODES, type Episode, SITE } from "@/lib/data";
import MarqueeTicker from "./MarqueeTicker";

const FALLBACKS = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];

function FeaturedSlide({ ep, epNumber }: { ep: Episode; epNumber: number }) {
  const [imgSrc, setImgSrc] = useState(ep.thumb);
  const fallbackIdx = useRef(0);
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={ep.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="relative block w-full flex-shrink-0 overflow-hidden rounded-[6px]"
    >
      <div className="relative aspect-video overflow-hidden bg-[#0a0a0a]">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center bg-studio p-4">
            <span
              className="text-center text-cream"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: "14px",
              }}
            >
              {ep.title}
            </span>
          </div>
        ) : (
        <img
          src={imgSrc}
          alt={ep.title}
          className="h-full w-full object-cover"
          loading="eager"
          onError={() => {
            const next = fallbackIdx.current + 1;
            if (next < FALLBACKS.length) {
              const currentKey = FALLBACKS[fallbackIdx.current];
              const nextKey = FALLBACKS[next];
              setImgSrc(imgSrc.replace(currentKey, nextKey));
              fallbackIdx.current = next;
            } else {
              setFailed(true);
            }
          }}
        />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

        <span
          className="absolute left-3 top-3 rounded-sm bg-lime px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-studio"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          EP {String(epNumber).padStart(2, "0")}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <span className="text-[10px] uppercase tracking-label text-lime md:text-[11px]">
          {ep.guest}
        </span>

        <h3
          className="mt-0.5 line-clamp-1 text-[16px] leading-tight text-cream md:mt-1 md:line-clamp-2 md:text-[28px]"
          style={{ fontFamily: "var(--font-bebas), sans-serif", fontWeight: 400 }}
        >
          {ep.title}
        </h3>

        <div className="mt-2 w-fit rounded-[4px] bg-amber px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-black md:mt-4 md:px-5 md:py-2.5 md:text-[12px]">
          ▶ Watch Episode
        </div>
      </div>
    </a>
  );
}

function FeaturedSwiper({ episodes }: { episodes: Episode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const maxIdx = Math.max(0, episodes.length - 1);

  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (paused || tabHidden || episodes.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((p) => (p >= maxIdx ? 0 : p + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, tabHidden, maxIdx, episodes.length]);

  const goTo = (i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 60;
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
    if (info.offset.x < -threshold || info.velocity.x < -200) {
      setCurrent((p) => Math.min(p + 1, maxIdx));
    } else if (info.offset.x > threshold || info.velocity.x > 200) {
      setCurrent((p) => Math.max(p - 1, 0));
    }
  };

  if (!episodes.length) return null;

  return (
    <div className="relative">
      <div ref={containerRef} className="overflow-hidden rounded-[6px]">
        <motion.div
          className="flex"
          drag={prefersReducedMotion ? false : "x"}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${current * 100}%` }}
          transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 35 }}
        >
          {episodes.map((ep, i) => (
            <FeaturedSlide key={ep.id} ep={ep} epNumber={13 - i} />
          ))}
        </motion.div>
      </div>

      {episodes.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2 md:mt-6">
          {episodes.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-lime" : "w-2 bg-white/20"
              }`}
              style={{ height: "8px" }}
              aria-label={`Go to episode ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LatestEpisodes() {
  const prefersReducedMotion = useReducedMotion();
  const [episodes, setEpisodes] = useState<Episode[]>(FALLBACK_EPISODES);
  const [source, setSource] = useState<"apify" | "fallback">("fallback");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) throw new Error(`status ${res.status}`);
        const j = await res.json();
        if (cancelled) return;
        if (Array.isArray(j?.episodes) && j.episodes.length) {
          setEpisodes(j.episodes);
          setSource(j.source === "apify" ? "apify" : "fallback");
        } else {
          setEpisodes(FALLBACK_EPISODES);
          setSource("fallback");
        }
      } catch {
        if (!cancelled) {
          setEpisodes(FALLBACK_EPISODES);
          setSource("fallback");
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      {episodes.map((episode, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PodcastEpisode",
              name: episode.title,
              description: episode.title,
              url: episode.url,
              thumbnailUrl: episode.thumb,
              partOfSeries: {
                "@type": "PodcastSeries",
                name: "Coffee With Storyphiler",
                url: "https://coffeewithstoryphiler.com",
              },
              author: {
                "@type": "Person",
                name: "Sumit Nayak",
              },
              inLanguage: "hi",
              publication: {
                "@type": "BroadcastEvent",
                isLiveBroadcast: false,
                startDate: episode.publishedAt,
              },
            }),
          }}
        />
      ))}
      <section id="episodes" className="bg-studio">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto pt-24 md:pt-40"
        style={{
          maxWidth: "1400px",
          paddingLeft: "clamp(16px, 4vw, 60px)",
          paddingRight: "clamp(16px, 4vw, 60px)",
        }}
      >
        <div className="flex items-center">
          <h2
            className="text-cream"
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: 400,
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              fontSize: "clamp(40px, 5.5vw, 72px)",
            }}
          >
            LATEST EPISODES
          </h2>
          <div className="ml-8 hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
          <span
            className="ml-4 hidden text-[10px] uppercase text-mouse md:block"
            style={{ letterSpacing: "0.2em" }}
          >
            {source === "apify" ? "Live \u00B7 Apify" : "Cached"}
          </span>
        </div>
      </motion.div>

      <MarqueeTicker
        className="mt-6 md:mt-10"
        items={[
          "Real Conversations",
          "Sikar",
          "Culture",
          "Business",
          "Society",
          "Hindi Podcast",
          "No Filter",
          "Coffee With Storyphiler",
        ]}
      />

      <div
        className="mx-auto pb-20 pt-12 md:py-28"
        style={{
          maxWidth: "1400px",
          paddingLeft: "clamp(16px, 4vw, 60px)",
          paddingRight: "clamp(16px, 4vw, 60px)",
        }}
      >
        <FeaturedSwiper episodes={episodes} />

        <div className="mt-12 flex flex-col items-start justify-between border-t border-white/10 pt-6 md:mt-20 md:flex-row md:items-center">
          <p
            className="font-editorial text-[20px] italic text-mouse"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            New episodes every week.
          </p>
          <a
            href={SITE.youtube.url}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="group relative mt-4 inline-block md:mt-0"
          >
            <span className="border-b border-lime pb-1 font-sans text-[13px] font-medium text-cream transition-all duration-300 hover:border-b-2" style={{ letterSpacing: "0.1em" }}>
              See All Episodes on YouTube &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
