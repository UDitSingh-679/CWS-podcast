import Hero from "@/components/Hero";
import TheShow from "@/components/TheShow";
import LatestEpisodes from "@/components/LatestEpisodes";
import ForBrands from "@/components/ForBrands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import SectionSeparator from "@/components/SectionSeparator";

const podcastSchema = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "Coffee With Storyphiler",
  description: "Real conversations from Sikar, Rajasthan. Hindi podcast by Sumit Nayak featuring entrepreneurs, activists, artists and unfiltered stories.",
  url: "https://coffeewithstoryphiler.com",
  image: "https://coffeewithstoryphiler.com/images/og-image.png",
  inLanguage: "hi",
  author: {
    "@type": "Person",
    name: "Sumit Nayak",
    url: "https://coffeewithstoryphiler.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Coffee With Storyphiler",
    logo: {
      "@type": "ImageObject",
      url: "https://coffeewithstoryphiler.com/icon.jpg",
    },
  },
  sameAs: [
    "https://www.youtube.com/@CoffeeWithStoryphiler_CWS",
    "https://www.instagram.com/coffeewithstoryphiler/",
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Coffee With Storyphiler",
  url: "https://coffeewithstoryphiler.com",
  logo: "https://coffeewithstoryphiler.com/icon.jpg",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Hindi",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sikar",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.youtube.com/@CoffeeWithStoryphiler_CWS",
  ],
};

export default function Home() {
  return (
    <main className="relative bg-studio text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Navigation />
      <Hero />
      <SectionSeparator />
      <TheShow />
      <LatestEpisodes />
      <SectionSeparator />
      <ForBrands />
      <Contact />
      <Footer />
    </main>
  );
}
