import { matches, standings, news } from "@/lib/mockData";
import TopScorersWidget from "@/components/TopScorersWidget";
import AdSlot from "@/components/AdSlot";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${title} | GoalSphere`,
    description: `Tin tức, lịch thi đấu và bảng xếp hạng của ${title}.`,
  };
}

export default async function LeaguePage({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const leagueMatches = matches.filter(m => m.league.toLowerCase().replace(/\s/g, '-') === slug);
  const leagueNews = news.slice(0, 5);

  return (
    <main className="container-app py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="lg:col-span-8 space-y-6">
        <div className="card p-5">
          <h1 className="text-2xl font-semibold text-[var(--navy)]">{title}</h1>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold mb-3">Standings (Top 10)</h2>
          <div className="table-responsive">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-100">
                <tr className="text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Team</th>
                  <th className="p-3">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map(s => (
                  <tr key={s.position} className="border-t">
                    <td className="p-3 font-medium">{s.position}</td>
                    <td className="p-3">{s.team}</td>
                    <td className="p-3 font-semibold">{s.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Upcoming Matches</h2>
            <Link href="/matches" className="nav-link text-sm">View all</Link>
          </div>
          <ul className="divide-y">
            {leagueMatches.map(m => (
              <li key={m.id} className="py-3 flex items-center justify-between">
                <span className="font-medium">{m.home} vs {m.away}</span>
                <span className="text-sm text-zinc-600">{new Date(m.kickoff).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h2 className="text-xl font-semibold mb-3">Latest News</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {leagueNews.map(n => (
              <Link key={n.id} href={`/news/${n.slug}`} className="card card-hover p-4">
                <h3 className="font-medium line-clamp-2">{n.title}</h3>
                <p className="text-sm text-zinc-600 line-clamp-2">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <aside className="lg:col-span-4 space-y-6">
        <AdSlot size="300x600" className="w-[300px]" />
        <TopScorersWidget />
      </aside>
    </main>
  );
}
