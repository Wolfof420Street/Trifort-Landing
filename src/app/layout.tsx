import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollObserver from "@/components/ui/ScrollObserver";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AnalyticsTracker from "@/components/AnalyticsTracker";


export const metadata: Metadata = {
  metadataBase: new URL("https://trifort.site"),

  title: {
    default: "Trifort Construction Kenya | Building With Transparency",
    template: "%s | Trifort Construction",
  },

  description:
    "Leading construction company in Kenya specializing in residential homes, commercial buildings, renovations, project management, and AI-powered building cost estimation. Get accurate construction estimates instantly.",

  keywords: [
    // Brand
    "Trifort Construction",
    "Trifort Kenya",
    "Trifort Estimator",

    // Construction
    "Construction Company Kenya",
    "Construction Company Nairobi",
    "Building Contractors Kenya",
    "Residential Construction Kenya",
    "Commercial Construction Kenya",
    "Home Builders Kenya",
    "Property Development Kenya",
    "Building Construction Nairobi",
    "Turnkey Construction Kenya",
    "Civil Engineering Kenya",
    "Construction Project Management",

    // Cost estimation
    "Building Cost Estimator Kenya",
    "Construction Cost Calculator",
    "House Cost Estimator Kenya",
    "AI Construction Estimator",
    "Quantity Surveying Kenya",
    "Building Budget Calculator",
    "Construction Planning Kenya",

    // Services
    "Home Renovation Kenya",
    "Office Construction Kenya",
    "Architectural Construction",
    "Construction Consultancy",
  ],

  authors: [{ name: "Trifort Construction" }],
  creator: "Trifort Construction",
  publisher: "Trifort Construction",

  alternates: {
    canonical: "https://trifort.site",
  },

  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://trifort.site",
    siteName: "Trifort Construction",

    title: "Trifort Construction Kenya",
    description:
      "Construction, renovation, project management, and AI-powered building cost estimation for residential and commercial developments across Kenya.",

    images: [
      {
        url: "/api/og?title=Trifort%20Construction%20Kenya",
        width: 1200,
        height: 630,
        alt: "Trifort Construction Kenya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trifort Construction Kenya",
    description:
      "Build smarter with Trifort. Residential, commercial, and AI-powered building cost estimation across Kenya.",
    images: ["/api/og?title=Trifort%20Construction%20Kenya"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "Construction",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Trifort Construction",
    "image": "https://trifort.site/logo.png",
    "url": "https://trifort.site",
    "telephone": "+254700000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Westlands",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body >
        <AnalyticsTracker />
        <ScrollProgress />
        <CustomCursor />
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}