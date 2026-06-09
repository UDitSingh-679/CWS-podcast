// Static fallback data sourced from the live Apify scrape of
//   - Instagram: https://www.instagram.com/coffeewithstoryphiler/  (Apify: apify~instagram-profile-scraper)
//   - YouTube:   https://www.youtube.com/@CoffeeWithStoryphiler_CWS (Apify: streamers~youtube-scraper)
//
// If the YouTube Data API v3 is configured (.env), /api/youtube auto-fetches
// fresh data on the server. This file is the pixel-identical fallback so the
// page never breaks if the API key is missing or the request fails.

export const SITE = {
  name: "Coffee With Storyphiler",
  short: "CWS",
  host: "Sumit Nayak",
  city: "Sikar, Rajasthan",
  // Brand mark — circular logo extracted from the YouTube channel avatar
  // (Apify scrape, 2026-06-06), 800x800 saved at /public/images/logo-yt.jpg
  logo: "/images/logo-yt.jpg",
  logoSrc:
    "https://yt3.googleusercontent.com/s8ieeGfzZ_EWkdKTrilYW7fS2YqymShQp4RYTNuDLpO-bKFIsn1o0YrSw8SllEgX259K2yYr",
  ogBanner: "/images/og-banner.jpg",
  youtube: {
    channelId: "UCCMaS5BLPS7sdJ9KTOWXL7A",
    handle: "CoffeeWithStoryphiler_CWS",
    url: "https://www.youtube.com/@CoffeeWithStoryphiler_CWS",
    subscribe: "https://www.youtube.com/@CoffeeWithStoryphiler_CWS?sub_confirmation=1",
    // Real values from the live Apify scrape (2026-06-06)
    subscribers: 963,
    totalVideos: 12,
    totalViews: 68406,
    joined: "Apr 23, 2018",
    location: "India",
    avatar:
      "https://yt3.googleusercontent.com/s8ieeGfzZ_EWkdKTrilYW7fS2YqymShQp4RYTNuDLpO-bKFIsn1o0YrSw8SllEgX259K2yYr=s800-c-k-c0x00ffffff-no-rj",
  },
  instagram: {
    username: "coffeewithstoryphiler",
    url: "https://www.instagram.com/coffeewithstoryphiler/",
    followers: 1194,
    posts: 117,
  },
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918690774136",
};

// 6 most recent CWS YouTube videos (from the live Apify scrape).
// `thumb` uses YouTube's maxresdefault CDN for best quality.
export type Episode = {
  id: string;
  title: string;
  guest: string;
  publishedAt: string; // ISO
  views: number;
  likes: number;
  duration: string;
  url: string;
  thumb: string;
};

export const FALLBACK_EPISODES: Episode[] = [
  {
    id: "I1DU-04PvPs",
    title: "MP Amra Ram Ji Podcast | Kisaan Andolan, Jail | Part 1",
    guest: "Amra Ram (MP, Sikar)",
    publishedAt: "2025-12-26T05:30:06.000Z",
    views: 486,
    likes: 36,
    duration: "00:33:38",
    url: "https://www.youtube.com/watch?v=I1DU-04PvPs",
    thumb: "https://i.ytimg.com/vi/I1DU-04PvPs/maxresdefault.jpg",
  },
  {
    id: "B6v1rFKhteM",
    title: "From Sikar to Dubai | The Inspiring Journey of Artist Manish Dhaka",
    guest: "Artist Manish Dhaka",
    publishedAt: "2025-11-02T13:03:06.000Z",
    views: 758,
    likes: 79,
    duration: "01:03:27",
    url: "https://www.youtube.com/watch?v=B6v1rFKhteM",
    thumb: "https://i.ytimg.com/vi/B6v1rFKhteM/maxresdefault.jpg",
  },
  {
    id: "sOJ9IjWf3nI",
    title: "CWS PODCAST Official Intro | Real Stories, Unfiltered Conversations",
    guest: "Sumit Nayak",
    publishedAt: "2025-11-02T06:25:25.000Z",
    views: 50,
    likes: 15,
    duration: "00:00:12",
    url: "https://www.youtube.com/watch?v=sOJ9IjWf3nI",
    thumb: "https://i.ytimg.com/vi/sOJ9IjWf3nI/sddefault.jpg",
  },
  {
    id: "gWd3n1cA3OM",
    title: "Truth of Indian Education System | Paper Leaks, Frauds & Student Struggles",
    guest: "Dr. DK Bajiya",
    publishedAt: "2025-09-11T14:30:16.000Z",
    views: 142,
    likes: 28,
    duration: "00:51:46",
    url: "https://www.youtube.com/watch?v=gWd3n1cA3OM",
    thumb: "https://i.ytimg.com/vi/gWd3n1cA3OM/maxresdefault.jpg",
  },
  {
    id: "1upoiO-3eC0",
    title: "Real Struggles of an Artist | The Life of a Singer, Writer & Lyricist",
    guest: "Junior KD",
    publishedAt: "2025-07-26T15:15:06.000Z",
    views: 1937,
    likes: 73,
    duration: "01:10:09",
    url: "https://www.youtube.com/watch?v=1upoiO-3eC0",
    thumb: "https://i.ytimg.com/vi/1upoiO-3eC0/maxresdefault.jpg",
  },
  {
    id: "h5nC4UAE5CU",
    title: "Selection Fraud | SSC, UPSC, NEET, JEE Students | ft. Dr. DK Bajiya",
    guest: "Dr. DK Bajiya",
    publishedAt: "2025-06-29T12:45:06.000Z",
    views: 433,
    likes: 30,
    duration: "01:20:54",
    url: "https://www.youtube.com/watch?v=h5nC4UAE5CU",
    thumb: "https://i.ytimg.com/vi/h5nC4UAE5CU/maxresdefault.jpg",
  },
];

// 4 hero episode cards (recent & high-engagement, used in the hero floating strip).
export const HERO_EPISODE_CARDS = [
  { num: "EP 12", title: "Artist Manish Dhaka", videoId: "B6v1rFKhteM" },
  { num: "EP 13", title: "MP Amra Ram", videoId: "I1DU-04PvPs" },
  { num: "EP 09", title: "Junior KD", videoId: "1upoiO-3eC0" },
  { num: "EP 07", title: "Satyendra Yogi", videoId: "2E_v8k_c2dQ" },
];

// Instagram polaroid candidates (sourced from the live Apify scrape of
// @coffeewithstoryphiler, downloaded locally to /public/images).
// [IMAGE: 3 candid photos from the CWS studio — guest laughing, mid-conversation
//  gesture, coffee cup on the table. The current set is CWS Instagram promos
//  featuring Amra Ram (MP) and the show's Instagram announcement. Replace with
//  actual behind-the-scenes stills from the studio for a more authentic feel.]
export const POLAROIDS: { src: string; alt: string; caption: string }[] = [
  {
    src: "/images/logo-yt.jpg",
    alt: "Coffee With Storyphiler — Brand logo",
    caption: "Coffee With Storyphiler",
  },
  {
    src: "/images/polaroid-1.jpg",
    alt: "MP Amra Ram — Guest on Coffee With Storyphiler",
    caption: "Guest · Amra Ram",
  },
  {
    src: "/images/start.jpg",
    alt: "Coffee With Storyphiler studio setup",
    caption: "Studio · Sikar",
  },
];

export function formatSubs(n: number): string {
  return n.toLocaleString("en-IN");
}
