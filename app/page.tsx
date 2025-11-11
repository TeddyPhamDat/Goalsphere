import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import Sidebar from "@/components/Sidebar";
import MatchesFilter from "@/components/MatchesFilter";
import StandingsFilter from "@/components/StandingsFilter";
import { getNews } from "@/lib/cms";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoalSphere — Football News, Matches, Standings & Live Scores",
  description:
    "GoalSphere - Your ultimate destination for football news, live scores, match schedules, standings, and in-depth analysis. Stay updated with Premier League, La Liga, Serie A, Bundesliga, Champions League and more. Real-time updates 24/7.",
  keywords: "football news, soccer news, live scores, match results, standings, Premier League, La Liga, Champions League, football updates, sports news, GoalSphere",
  authors: [{ name: "GoalSphere Editorial Team" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://goalsphere.vercel.app",
    title: "GoalSphere — Football News, Matches & Standings",
    description: "Stay updated with the latest football news, live scores, and standings from top leagues worldwide",
    siteName: "GoalSphere",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalSphere — Football News & Live Scores",
    description: "Your ultimate destination for football news and updates",
  },
};

export default async function Home() {
  // Fetch news data
  const news = await getNews();

  return (
    <main className="container-app">
      {/* Top Banner */}
      <div className="flex justify-center py-4">
        <AdSlot size="728x90" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-8">
          {/* Latest News */}
          <section className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--navy)]">Latest News</h2>
              <Link className="text-sm nav-link" href="/news">View all</Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {news.slice(0, 6).map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="card card-hover p-4 flex gap-4">
                  <div className="relative w-28 h-20 bg-zinc-200 rounded overflow-hidden">
                    {n.thumbnail?.url && (
                      <Image 
                        src={n.thumbnail.url} 
                        alt={n.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-2">{n.title}</h3>
                    <p className="text-sm text-zinc-600 line-clamp-2">{n.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Upcoming Matches with Filter */}
          <MatchesFilter />

          {/* Standings with Filter */}
          <StandingsFilter />
        </div>
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}
