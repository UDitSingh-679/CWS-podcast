import { NextResponse } from "next/server";
import { FALLBACK_EPISODES, type Episode } from "@/lib/data";

// Server-side Apify YouTube scraper fetcher.
// Uses the Apify `streamers~youtube-scraper` actor (the same one the client
// already uses to pre-populate the static dataset). API key is never
// exposed to the client. Response is cached for 1h. If no key is configured
// or the request fails, returns the static fallback so the page is always
// populated.

import { SITE } from "@/lib/data";

export const revalidate = 3600;

const APIFY_TOKEN = process.env.APIFY_API_KEY;
const CHANNEL_URL =
  process.env.YOUTUBE_CHANNEL_URL ||
  "https://www.youtube.com/@CoffeeWithStoryphiler_CWS/videos";

// Apify's `streamers~youtube-scraper` actor. We invoke it synchronously
// and read the dataset items in one round-trip.
const APIFY_RUN_SYNC =
  "https://api.apify.com/v2/acts/streamers~youtube-scraper/run-sync-get-dataset-items";

// Fetch a generous slice of the channel — the CWS channel currently has ~12
// videos, so 50 is more than enough headroom to cover all uploads.
const CHANNEL_SCRAPE_LIMIT = 50;
// We only render 6 episode cards on the home page.
const EPISODE_DISPLAY_LIMIT = 6;

type ApifyItem = {
  id?: string;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
  viewCount?: number;
  date?: string;
  likes?: number;
  duration?: string;
};

function normalizeApify(items: ApifyItem[], limit = EPISODE_DISPLAY_LIMIT): Episode[] {
  return (items || [])
    .filter((it) => it?.id && it?.title)
    .slice(0, limit)
    .map((it) => {
      const title = (it.title || "").trim();
      return {
        id: it.id as string,
        title,
        guest: title.split(/[|·•\-–—:|]/)[0].trim() || "Episode",
        publishedAt: it.date || new Date().toISOString(),
        views: Number(it.viewCount || 0),
        likes: Number(it.likes || 0),
        duration: (it.duration || "").toLowerCase(),
        url:
          it.url ||
          `https://www.youtube.com/watch?v=${it.id}`,
        thumb:
          it.thumbnailUrl ||
          `https://i.ytimg.com/vi/${it.id}/maxresdefault.jpg`,
      } satisfies Episode;
    });
}

function sumChannelViews(items: ApifyItem[]): number {
  return (items || []).reduce(
    (acc, it) => acc + Number(it.viewCount || 0),
    0,
  );
}

export async function GET() {
  if (!APIFY_TOKEN) {
    return NextResponse.json(
      {
        source: "fallback",
        episodes: FALLBACK_EPISODES,
        channelStats: {
          totalViews: SITE.youtube.totalViews,
          totalVideos: SITE.youtube.totalVideos,
          subscribers: SITE.youtube.subscribers,
        },
      },
      { status: 200 },
    );
  }

  try {
    // Synchronous Apify run — returns dataset items directly.
    const res = await fetch(APIFY_RUN_SYNC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APIFY_TOKEN}`,
      },
      body: JSON.stringify({
        startUrls: [{ url: CHANNEL_URL }],
        maxResults: CHANNEL_SCRAPE_LIMIT,
        // Use English locale to keep titles consistent with the fallback.
        locale: "en",
      }),
      // The actor can take a while on a cold start — give it 90s.
      signal: AbortSignal.timeout(90_000),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`Apify API ${res.status}`);
    const items = (await res.json()) as ApifyItem[];
    const episodes = normalizeApify(items, EPISODE_DISPLAY_LIMIT);
    if (!episodes.length) throw new Error("no items returned by Apify");

    const channelStats = {
      totalViews: sumChannelViews(items),
      totalVideos: items.length,
      // Subscribers aren't returned by the per-video scraper — keep the
      // last-known value from the static dataset so the UI still renders.
      subscribers: SITE.youtube.subscribers,
    };

    return NextResponse.json({ source: "apify", episodes, channelStats });
  } catch (err) {
    console.warn("[youtube route] Apify fetch failed, serving fallback:", err);
    return NextResponse.json(
      {
        source: "fallback",
        episodes: FALLBACK_EPISODES,
        channelStats: {
          totalViews: SITE.youtube.totalViews,
          totalVideos: SITE.youtube.totalVideos,
          subscribers: SITE.youtube.subscribers,
        },
      },
      { status: 200 },
    );
  }
}
