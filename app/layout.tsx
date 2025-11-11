import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "GoalSphere — Football News, Live Scores & Match Updates",
    template: "%s | GoalSphere",
  },
  description:
    "GoalSphere delivers the latest football news, live scores, match schedules, standings, and expert analysis from Premier League, La Liga, Serie A, Bundesliga, Champions League and more. Your trusted source for football updates 24/7.",
  keywords: [
    "football news",
    "soccer news",
    "live scores",
    "match results",
    "football standings",
    "Premier League",
    "La Liga",
    "Serie A",
    "Bundesliga",
    "Champions League",
    "football updates",
    "sports news",
    "football analysis",
    "match schedules",
    "football statistics",
  ],
  authors: [{ name: "GoalSphere Editorial Team", url: "https://goalsphere.vercel.app/about" }],
  creator: "GoalSphere",
  publisher: "GoalSphere",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://goalsphere.vercel.app",
    title: "GoalSphere — Football News, Live Scores & Updates",
    description:
      "Your ultimate destination for football news, live scores, and comprehensive coverage of top leagues worldwide",
    siteName: "GoalSphere",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalSphere — Football News & Live Scores",
    description: "Stay updated with latest football news and scores",
    creator: "@goalsphere",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your Google Search Console verification code
  },
  other: {
    'google-adsense-account': 'ca-pub-1545387451714613',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
  
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased bg-zinc-50 text-zinc-900`}>
        {/* Google AdSense Script */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Header />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
