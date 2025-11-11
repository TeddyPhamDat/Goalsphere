import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GoalSphere — Football News, Matches, Standings",
  description:
    "GoalSphere: Tin tức bóng đá, lịch thi đấu, kết quả và bảng xếp hạng. SEO ready, responsive, TailwindCSS.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "GoalSphere",
    description:
      "Tin tức bóng đá, lịch thi đấu, kết quả và bảng xếp hạng.",
    url: "http://localhost:3000",
    siteName: "GoalSphere",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  
  return (
    <html lang="vi">
      <body className={`${inter.variable} antialiased bg-zinc-50 text-zinc-900`}>
        {/* Google AdSense Script */}
        {adsenseClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <Header />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
