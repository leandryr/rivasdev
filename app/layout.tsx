import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MetaPixel }       from "@/components/analytics/meta-pixel";
import { JsonLd }          from "@/components/analytics/json-ld";
import "./globals.css";

const _inter = Inter({ subsets: ["latin"], display: "swap" });
const _geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

const BASE_URL = "https://rivastechnologies.com";

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default:  "Rivas Technologies LLC | Engineering That Scales",
    template: "%s | Rivas Technologies LLC",
  },
  description:
    "Enterprise software engineering partner for entrepreneurs and growing businesses. We build, automate, and scale digital products — web apps, APIs, mobile, security & AI. Based in Gainesville, GA.",
  keywords: [
    "Rivas Technologies",
    "software engineering",
    "web development",
    "React",
    "Next.js",
    "Laravel",
    "Node.js",
    "business automation",
    "AI for business",
    "scalable architecture",
    "digital transformation",
    "Gainesville GA",
    "Georgia tech company",
    "startup engineering",
    "enterprise software",
    "API development",
    "cloud infrastructure",
    "AWS",
    "Kubernetes",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "mobile app development",
    "security compliance",
    "digital business",
  ],
  authors:  [{ name: "Rivas Technologies LLC", url: BASE_URL }],
  creator:  "Rivas Technologies LLC",
  publisher:"Rivas Technologies LLC",
  category: "Technology",

  // ── Canonical & Alternate ────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:          BASE_URL,
    siteName:    "Rivas Technologies LLC",
    title:       "Rivas Technologies LLC | Engineering That Scales",
    description: "Enterprise software engineering for entrepreneurs. Web apps, automation, AI, security & cloud — built to scale.",
    images: [
      {
        url:    "/og-image.png",
        width:   1200,
        height:  630,
        alt:    "Rivas Technologies LLC — Engineering That Scales",
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    site:        "@leandryrp",
    creator:     "@leandryrp",
    title:       "Rivas Technologies LLC | Engineering That Scales",
    description: "Enterprise software engineering for entrepreneurs. Web apps, automation, AI, security & cloud.",
    images:      ["/og-image.png"],
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon:     [
      { url: "/icono/LLC.png", type: "image/png" },
      { url: "/icono/LLC.png", sizes: "32x32",  type: "image/png" },
      { url: "/icono/LLC.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/icono/LLC.png",
    apple:    "/icono/LLC.png",
  },

  // ── Manifest & verification ───────────────────────────────────────────────
  manifest:    "/manifest.json",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index:            true,
    follow:           true,
    nocache:          false,
    googleBot: {
      index:              true,
      follow:             true,
      noimageindex:       false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor:    [
    { media: "(prefers-color-scheme: dark)",  color: "#050507" },
    { media: "(prefers-color-scheme: light)", color: "#F5F7FC" },
  ],
  width:         "device-width",
  initialScale:   1,
  maximumScale:   5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />

        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://graph.instagram.com" />
      </head>
      <body className="font-sans antialiased noise-overlay">
        {/* Analytics */}
        <GoogleAnalytics />
        <MetaPixel />
        <JsonLd />

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
