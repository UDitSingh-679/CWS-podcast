import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` :
    "https://coffeewithstoryphiler.com")
  ),

  title: {
    default: "Coffee With Storyphiler | Hindi Podcast from Sikar",
    template: "%s | Coffee With Storyphiler",
  },

  description: "Real conversations from Sikar, Rajasthan. Hindi podcast by Sumit Nayak featuring entrepreneurs, activists, artists and real stories. Watch on YouTube.",

  keywords: [
    "Coffee With Storyphiler",
    "CWS podcast",
    "Hindi podcast",
    "Sikar podcast",
    "Rajasthan podcast",
    "Sumit Nayak podcast",
    "Hindi interview podcast",
    "Sikar Rajasthan",
  ],

  authors: [{ name: "Sumit Nayak", url: "https://coffeewithstoryphiler.com" }],

  creator: "Sumit Nayak",

  alternates: {
    canonical: "https://coffeewithstoryphiler.com",
  },

  openGraph: {
    type: "website",
    locale: "hi_IN",
    url: "https://coffeewithstoryphiler.com",
    siteName: "Coffee With Storyphiler",
    title: "Coffee With Storyphiler | Hindi Podcast from Sikar",
    description: "Real conversations from Sikar. Hindi podcast by Sumit Nayak.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Coffee With Storyphiler — Hindi Podcast from Sikar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Coffee With Storyphiler | Hindi Podcast",
    description: "Real conversations from Sikar, Rajasthan.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${cormorant.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body className="bg-studio text-cream antialiased">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
