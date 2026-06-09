"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SITE } from "@/lib/data";

const CONTACT_BG_IMG = "/images/start.jpg";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const phone = (form.elements.namedItem("phone") as HTMLInputElement)?.value || "";
    const story = (form.elements.namedItem("story") as HTMLTextAreaElement)?.value || "";
    setSubmitted(true);
    const msg = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nStory: ${story}`);
    window.location.href = `https://wa.me/918690774136?text=${msg}`;
  }

  useEffect(() => {
    if (!mobileFormOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFormOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileFormOpen]);

  useEffect(() => {
    if (!mobileFormOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileFormOpen]);

  const renderFormBody = (idPrefix: string) => (
    <>
      {submitted ? (
        <div
          className="mt-8 border border-lime/30 bg-lime/5 p-6 text-center"
          style={{ borderRadius: "4px" }}
        >
          <p
            className="text-cream"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "18px",
            }}
          >
            Thank you. We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6"
          action={
            process.env.NEXT_PUBLIC_FORMSPREE_ID
              ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`
              : undefined
          }
          method="POST"
        >
          <div>
            <label
              className="block text-[11px] uppercase text-muted"
              style={{ letterSpacing: "0.15em" }}
              htmlFor={`${idPrefix}name`}
            >
              Your Name
            </label>
            <input
              id={`${idPrefix}name`}
              name="name"
              type="text"
              required
              className="bg-transparent border-none border-b focus:border-lime outline-none text-cream w-full py-[10px] transition-all duration-200"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
              }}
              placeholder=""
              onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D4F87A"}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)"}
            />
          </div>
          <div>
            <label
              className="block text-[11px] uppercase text-muted"
              style={{ letterSpacing: "0.15em" }}
              htmlFor={`${idPrefix}phone`}
            >
              Phone / WhatsApp
            </label>
            <input
              id={`${idPrefix}phone`}
              name="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              className="bg-transparent border-none border-b focus:border-lime outline-none text-cream w-full py-[10px] transition-all duration-200"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
              }}
              onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D4F87A"}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)"}
              onInput={(e) => {
                const input = e.currentTarget;
                input.value = input.value.replace(/\D/g, "").slice(0, 10);
              }}
            />
          </div>
          <div>
            <label
              className="block text-[11px] uppercase text-muted"
              style={{ letterSpacing: "0.15em" }}
              htmlFor={`${idPrefix}story`}
            >
              Your Story
            </label>
            <textarea
              id={`${idPrefix}story`}
              name="story"
              rows={3}
              required
              className="resize-none bg-transparent border-none border-b focus:border-lime outline-none text-cream w-full py-[10px] transition-all duration-200"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.2)",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "14px",
              }}
              onFocus={(e) => e.currentTarget.style.borderBottomColor = "#D4F87A"}
              onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.2)"}
            />
          </div>

          <button
            type="submit"
            data-cursor="hover"
            className="mt-2 w-full bg-cream py-3.5 text-[13px] font-medium uppercase text-studio transition-colors duration-300 hover:bg-lime"
            style={{ letterSpacing: "0.15em" }}
          >
            Send Message
          </button>
        </form>
      )}

      <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-muted">
        <span>Or message directly on</span>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="inline-flex items-center gap-1 text-cream/80 transition-colors hover:text-lime"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.21 8.21 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.23 8.23 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.49-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </>
  );

  return (
    <section
      id="contact"
      className="relative isolate min-h-[720px] overflow-hidden bg-studio"
    >
      <div className="absolute inset-0 -z-10">
        <img
          src={CONTACT_BG_IMG}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[50%_8%] md:object-center"
          style={{
            filter: "grayscale(100%) brightness(0.6)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,166,35,0.05) 0%, rgba(13,13,13,0.35) 60%, rgba(13,13,13,0.75) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[720px] items-start md:items-center" style={{
        maxWidth: "1400px",
        paddingLeft: "clamp(20px, 4vw, 60px)",
        paddingRight: "clamp(20px, 4vw, 60px)",
        paddingTop: "48px",
        paddingBottom: "96px",
      }}>
        <div
          className="hidden w-full max-w-[480px] p-10 md:block md:p-12"
          style={{
            background: "rgba(13,13,13,0.75)",
            backdropFilter: "blur(20px) saturate(1.4)",
            WebkitBackdropFilter: "blur(20px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
          }}
        >
          <h2
            className="font-editorial text-cream"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "32px",
              lineHeight: 1.2,
            }}
          >
            Have a story worth telling?
          </h2>
          <p
            className="mt-2 text-[10px] uppercase text-mouse"
            style={{ letterSpacing: "0.25em" }}
          >
            SEND US A MESSAGE
          </p>
          {renderFormBody("d-")}
        </div>

        {!mobileFormOpen && (
          <div className="relative z-10 mx-4 w-[calc(100%-32px)] md:hidden">
            <button
              type="button"
              onClick={() => setMobileFormOpen(true)}
              className="block w-full p-8 text-left backdrop-blur-xl"
              style={{
                background: "rgba(13,13,13,0.75)",
                WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
              }}
            >
              <h2
                className="font-editorial text-cream"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 300,
                  fontSize: "30px",
                  lineHeight: 1.15,
                }}
              >
                Have a story worth telling?
              </h2>
              <p
                className="mt-2 text-[10px] uppercase text-mouse"
                style={{ letterSpacing: "0.25em" }}
              >
                SEND US A MESSAGE
              </p>
              <div
                className="mt-8 flex items-center justify-between"
                style={{ letterSpacing: "0.15em" }}
              >
                <span className="text-[13px] font-medium uppercase text-cream">
                  Start your conversation
                </span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-cream"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {mobileFormOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close form"
              onClick={() => setMobileFormOpen(false)}
              className="fixed inset-0 z-40 cursor-default bg-black/70 backdrop-blur-sm md:hidden"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Contact form"
              className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-2xl border-t border-white/10 p-6 pt-3 backdrop-blur-xl md:hidden"
              style={{
                background: "rgba(13,13,13,0.96)",
                WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              }}
              initial={prefersReducedMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={prefersReducedMotion ? undefined : { y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
            <div className="mx-auto mb-3 mt-1 h-1 w-12 rounded-full bg-white/25" />
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  className="font-editorial text-cream"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 300,
                    fontSize: "30px",
                    lineHeight: 1.15,
                  }}
                >
                  Have a story worth telling?
                </h2>
                <p
                  className="mt-2 text-[10px] uppercase text-mouse"
                  style={{ letterSpacing: "0.25em" }}
                >
                  SEND US A MESSAGE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileFormOpen(false)}
                aria-label="Close"
                className="-mr-1 -mt-1 shrink-0 p-2 text-cream/80 transition-colors hover:text-cream"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {renderFormBody("m-")}
          </motion.div>
        </>
      )}
      </AnimatePresence>
    </section>
  );
}
