import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rivas Technologies | Digital Solutions Studio",
  description:
    "We architect and build high-performance web applications using React, Next.js, Laravel, Node.js, and modern cloud infrastructure.",
  keywords: [
    "Rivas Technologies",
    "web development",
    "React",
    "Next.js",
    "Laravel",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased noise-overlay">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
