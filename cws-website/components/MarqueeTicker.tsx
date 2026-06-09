"use client";

import { ReactNode } from "react";

type Props = {
  items: string[];
  className?: string;
  separator?: ReactNode;
};

export default function MarqueeTicker({
  items,
  className = "",
  separator = "·",
}: Props) {
  const content = items.join(`  ${separator}  `);
  return (
    <div className={`overflow-hidden border-y border-white/5 bg-studio ${className}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-loop {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `,
        }}
      />
      <div
        className="flex py-5"
        style={{
          width: "max-content",
          animation: "marquee-loop 35s linear infinite",
        }}
        onMouseEnter={(e) => e.currentTarget.style.animationPlayState = "paused"}
        onMouseLeave={(e) => e.currentTarget.style.animationPlayState = "running"}
      >
        <span
          className="px-6 font-sans uppercase text-[11px] tracking-[0.2em] text-[#555555]"
          style={{ whiteSpace: "nowrap" }}
        >
          {content} &nbsp; {separator} &nbsp;{" "}
        </span>
        <span
          className="px-6 font-sans uppercase text-[11px] tracking-[0.2em] text-[#555555]"
          style={{ whiteSpace: "nowrap" }}
        >
          {content} &nbsp; {separator} &nbsp;{" "}
        </span>
      </div>
    </div>
  );
}
