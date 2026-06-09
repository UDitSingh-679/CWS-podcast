"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<"dot" | "ring">("dot");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 768;
      setHidden(isMobile);
      document.body.style.cursor = isMobile ? "auto" : "none";
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      document.body.style.cursor = "auto";
    };
  }, []);

  useEffect(() => {
    if (hidden) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        'a, button, [data-cursor="hover"], input, textarea, label'
      );
      setVariant(isInteractive ? "ring" : "dot");
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <div
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          transform: `translate3d(${pos.x - (variant === "ring" ? 14 : 3)}px, ${
            pos.y - (variant === "ring" ? 14 : 3)
          }px, 0)`,
          transition:
            "width 250ms cubic-bezier(0.16,1,0.3,1), height 250ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease",
          mixBlendMode: "difference",
        }}
      >
        {variant === "dot" ? (
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        ) : (
          <div className="h-7 w-7 rounded-full border border-white" />
        )}
      </div>
    </>
  );
}
