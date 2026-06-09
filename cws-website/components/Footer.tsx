"use client";

import { SITE } from "@/lib/data";

const FOOTER_NAV = ["Episodes", "About", "For Brands", "Contact"];

export default function Footer() {
  return (
    <footer className="bg-deep" aria-label="Main footer">
      <div aria-hidden style={{ height: "1px", background: "rgba(255,255,255,0.08)" }} />
      <div className="mx-auto py-12" style={{
        maxWidth: "1400px",
        paddingLeft: "clamp(20px, 4vw, 60px)",
        paddingRight: "clamp(20px, 4vw, 60px)",
      }}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-center">
          {/* Left: logo + wordmark + tagline */}
          <div className="flex items-start gap-3">
            <img
              src="/images/profile-Photoroom-nobg.png"
              alt="Coffee With Storyphiler"
              width={512}
              height={376}
              className="h-14 w-auto flex-shrink-0 object-contain align-middle md:h-20"
              style={{
                imageRendering: "-webkit-optimize-contrast",
              }}
            />
            <div>
              <span
                className="block text-[11px] uppercase text-cream"
                style={{ letterSpacing: "0.25em" }}
              >
                Coffee With Storyphiler
              </span>
              <p className="mt-1 text-[16px] text-[#555555]">
                Real conversations from Sikar, Rajasthan.
              </p>
            </div>
          </div>

          {/* Center: nav */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "")}`}
                data-cursor="hover"
                className="text-[13px] uppercase text-muted transition-colors duration-300 hover:text-cream"
                style={{ letterSpacing: "0.2em" }}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="flex items-center justify-start gap-4 md:justify-end">
            <a
              href={SITE.youtube.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="Coffee With Storyphiler on YouTube"
              className="text-[#444444] transition-colors duration-300 hover:text-lime"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="Coffee With Storyphiler on Instagram"
              className="text-[#444444] transition-colors duration-300 hover:text-lime"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              aria-label="Coffee With Storyphiler on WhatsApp"
              className="text-[#444444] transition-colors duration-300 hover:text-lime"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.032 21.965a9.89 9.89 0 0 1-5.06-1.456l-.362-.214-3.718.977.982-3.633-.237-.369a9.94 9.94 0 0 1-1.54-5.286c.003-5.514 4.492-10 10.01-10a9.95 9.95 0 0 1 7.07 2.929 9.97 9.97 0 0 1 2.928 7.078c-.003 5.515-4.491 10-10.01 10m7.636-16.949A11.53 11.53 0 0 0 12.032 0C5.48 0 .033 5.444.03 12a11.56 11.56 0 0 0 1.522 5.693L0 24l6.386-1.645A11.5 11.5 0 0 0 12.032 24c6.547 0 12-5.444 12.003-12-.001-3.198-1.244-6.204-3.5-8.461m-10.15 5.477c-.33-.733-.678-.748-.987-.76-.285-.012-.61-.013-.934 0-.326.013-1.03.16-1.03.793s.847 2.233 1.966 3.433c1.125 1.207 2.29 1.723 3.3 2.03 1.107.337 1.51.268 2.006.151.488-.117 1.543-.63 1.76-1.238.216-.61.216-1.133.15-1.241-.065-.11-.222-.167-.473-.29-.247-.122-1.467-.724-1.694-.806-.227-.083-.393-.123-.557.121-.165.245-.636.806-.778.97-.143.166-.285.187-.536.066l-.013-.007c-.655-.276-1.687-1.047-2.16-1.51-.202-.197-.477-.51-.595-.781l-.013-.04c-.136-.384-.02-.585.095-.773.1-.163.22-.31.329-.474.11-.163.137-.312.204-.521.068-.209.035-.39-.016-.545z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-[15px] text-[#666666]">
          © 2025 Coffee With Storyphiler · Made in Sikar
        </p>
      </div>
    </footer>
  );
}
