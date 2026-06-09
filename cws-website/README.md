# Coffee With Storyphiler (CWS) — Podcast Landing Page

A cinematic, high-converting dark-editorial podcast landing page built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Lenis** smooth scroll.

> Real conversations from Sikar, Rajasthan. Hindi interview podcast hosted by Sumit Nayak.
> YouTube: <https://www.youtube.com/@CoffeeWithStoryphiler_CWS>
> Instagram: <https://www.instagram.com/coffeewithstoryphiler/>

---

## Tech stack

| Concern        | Tool                                          |
|----------------|-----------------------------------------------|
| Framework      | Next.js 14 (App Router, TypeScript)           |
| Styling        | Tailwind CSS (custom design tokens)           |
| Motion         | Framer Motion (useScroll, useTransform, etc.) |
| Smooth scroll  | Lenis                                         |
| Type           | Bebas Neue · Cormorant Garamond · DM Mono · Inter (Google Fonts via `next/font`) |
| Data           | YouTube Data API v3 (server route, 1h revalidate) + Apify Instagram scrape (baked into fallback) |

No external UI libraries. No MUI. No shadcn. Pure custom components.

---

## Run locally

```bash
cd cws-website
npm install
cp .env.example .env.local        # fill in values (see below)
npm run dev
# → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## Environment variables

| Var                              | Required? | Purpose                                                                 |
|----------------------------------|-----------|-------------------------------------------------------------------------|
| `YOUTUBE_API_KEY`                | optional  | YouTube Data API v3 key. If empty, latest-episodes uses the static fallback. |
| `YOUTUBE_CHANNEL_ID`             | optional  | Defaults to `UCCMaS5BLPS7sdJ9KTOWXL7A`.                                  |
| `NEXT_PUBLIC_FORMSPREE_ID`       | optional  | Formspree form ID. If empty, contact form simulates a success state.    |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`    | optional  | E.164 format (e.g. `919XXXXXXXXX`). Used in the WhatsApp links.         |

To get a YouTube API key: <https://console.cloud.google.com/apis/credentials> → enable **YouTube Data API v3** → create an API key.

---

## How the data is sourced

The page is populated with real numbers from the live web:

- **YouTube channel + latest 6 videos** — `app/api/youtube/route.ts` calls YouTube Data API v3 server-side (the key never reaches the client), pulls the channel's `uploads` playlist, hydrates with statistics, and is cached for 1h via Next.js `revalidate`. On any failure it serves the static fallback.
- **Static fallback** — `lib/data.ts` ships 6 episodes, the polaroid images, the channel stats (subscribers / total videos / total views) and the Instagram follower count that were captured via an **Apify scrape** of the live channel/handle. These were pulled on 2026-06-06:
  - Instagram: `apify~instagram-profile-scraper` on `coffeewithstoryphiler` → 1,194 followers · 117 posts
  - YouTube: `streamers~youtube-scraper` on `@CoffeeWithStoryphiler_CWS` → 963 subscribers · 86 videos · 68,406 views · joined Apr 23, 2018

---

## Image slots to fill in

The site ships with a built-in SVG placeholder for the hero (silhouette + brick wall + mic arm + 3 frames) and three real Instagram promo images for the polaroid cluster. To finalize:

| File                            | Status         | Notes                                                                                                |
|---------------------------------|----------------|------------------------------------------------------------------------------------------------------|
| `public/images/hero-studio.jpg` | **placeholder** | Replace the SVG with the B&W studio photo of Sumit Nayak. Update `HERO_IMG` in `Hero.tsx` and `Contact.tsx` to `.jpg`. |
| `public/images/polaroid-1..3.jpg` | real IG promos | Swap with behind-the-scenes stills from the studio for a more authentic feel.                        |
| `public/images/cws-avatar.jpg`  | real IG avatar | Currently unused (the navigation uses a coffee-cup monoline SVG). Drop in if you want a logo image.  |

All other imagery is loaded from YouTube's CDN (`i.ytimg.com`) and is automatic.

---

## Sections built

1. **Navigation** — fixed top, `COFFEE WITH STORYPHILER` wordmark left, nav + subscribe pill right.
2. **Hero** — full-bleed B&W studio image, ghosted `CWS` watermark behind the figure, episode thumbnail strip drifting left, lower-right `Watch on YouTube →` CTA.
3. **THE SHOW** — editorial intro with `No script. No filter.` highlighting to lime on scroll, count-up stats (subscribers / episodes / City), polaroid cluster that spreads on hover.
4. **LATEST EPISODES** — marquee ticker, 3-col grid of 6 most recent videos from YouTube Data API, hover lift, full-width CTA row.
5. **FOR BRANDS** — subtitle marquee, editorial pitch with `authentic reach in Tier-2 India` highlight, 2×2 glassmorphism bento (AUDIENCE / FORMAT / REACH / WORK WITH US), amber pill CTA.
6. **CONTACT** — tinted hero background, frosted-glass form (Name / Phone / Story), Formspree-ready, WhatsApp + Instagram escape hatches.
7. **Sticky mobile CTA bar** — amber, appears after 30% scroll, full-width subscribe link (≤ 768px only).
8. **Footer** — wordmark + tagline left, center nav, three social icons right.
9. **Custom cursor** — 6px white dot that morphs to a 28px ring on interactive elements, `mix-blend-mode: difference`.
10. **Lenis smooth scroll** — wraps the entire page.

---

## File layout

```
cws-website/
├── app/
│   ├── api/youtube/route.ts       ← server-side YouTube fetch
│   ├── globals.css                ← design tokens, vignette, marquee, form
│   ├── layout.tsx                 ← fonts, smooth scroll, custom cursor
│   └── page.tsx                   ← composes the sections
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── TheShow.tsx
│   ├── LatestEpisodes.tsx
│   ├── MarqueeTicker.tsx
│   ├── ForBrands.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── MobileStickyBar.tsx
│   ├── SmoothScroll.tsx
│   └── CustomCursor.tsx
├── lib/
│   └── data.ts                    ← SITE, fallback episodes, polaroids, helpers
├── public/images/
│   ├── hero-studio.svg            ← placeholder (swap for .jpg)
│   ├── polaroid-1..3.jpg          ← real IG promos
│   └── cws-avatar.jpg
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── package.json
```

---

## Design tokens

| Token        | Hex      | Use                                  |
|--------------|----------|--------------------------------------|
| `studio`     | `#0D0D0D` | primary background                   |
| `deep`       | `#080808` | footer                               |
| `surface`    | `#111111` | For Brands section variation         |
| `cream`      | `#F5E2C8` | primary text, form button, accents   |
| `lime`       | `#D4F87A` | highlights, focus, hover borders     |
| `amber`      | `#F5A623` | CTAs, mobile sticky bar, For Brands CTA |
| `mouse`      | `#888888` | captions, fine print                 |
| `muted`      | `#666666` | secondary body, dates                |
| `glass`      | `rgba(255,255,255,0.08)` | card borders              |

---

## Performance

- Hero image uses `priority` semantics through `<img loading="eager">` + `fetchpriority="high"` attribute on the Hero element.
- YouTube API call is server-side only (no key leak) and cached via `revalidate: 3600`.
- Polaroid + episode thumbnails are lazy-loaded.
- No layout shift — image dimensions are reserved.
- Target: Lighthouse 90+ desktop, 80+ mobile.
