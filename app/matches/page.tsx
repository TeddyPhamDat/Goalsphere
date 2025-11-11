
"use client";
import { useState, useEffect } from "react";

const COMPETITIONS = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "SA", name: "Serie A" },
  { code: "BL1", name: "Bundesliga" },
  { code: "FL1", name: "Ligue 1" },
  { code: "PPL", name: "Primeira Liga" },
  { code: "DED", name: "Eredivisie" },
  { code: "BSA", name: "Serie A Brazil" },
];
const SEASONS = [2022, 2023, 2024, 2025];

export default function MatchesPage() {
  const [competition, setCompetition] = useState("PL");
  const [season, setSeason] = useState(new Date().getFullYear() - 1);
  const [selectedMatchday, setSelectedMatchday] = useState<string>("all");
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("api");
  const [availableMatchdays, setAvailableMatchdays] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setSource("api");
      try {
        const apiUrl = `/api/matches?competition=${competition}&season=${season}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const json = await res.json();
          const matchesData = Array.isArray(json.matches) ? json.matches : [];
          setMatches(matchesData);
          
          // Get unique matchdays
          const matchdays = [...new Set(
            matchesData
              .filter((m: any) => m.matchday)
              .map((m: any) => String(m.matchday))
          )].sort((a, b) => Number(a) - Number(b)) as string[];
          
          setAvailableMatchdays(matchdays);
          setSelectedMatchday("all"); // Reset to "all" when changing competition/season
        } else {
          setSource("error");
          setMatches([]);
          setAvailableMatchdays([]);
        }
      } catch {
        setSource("error");
        setMatches([]);
        setAvailableMatchdays([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [competition, season]);

  // Filter matches by selected matchday
  const filteredMatches = selectedMatchday === "all" 
    ? matches 
    : matches.filter(m => String(m.matchday) === selectedMatchday);

  return (
    <main className="container-app py-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-[var(--navy)]">Matches</h1>
        <div className="flex flex-wrap gap-2">
          {/* Competition Dropdown */}
          <select
            className="border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
            value={competition}
            onChange={e => setCompetition(e.target.value)}
          >
            {COMPETITIONS.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          
          {/* Season Dropdown */}
          <select
            className="border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
            value={season}
            onChange={e => setSeason(Number(e.target.value))}
          >
            {SEASONS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          
          {/* Matchday Dropdown */}
          {availableMatchdays.length > 0 && (
            <select
              className="border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
              value={selectedMatchday}
              onChange={e => setSelectedMatchday(e.target.value)}
            >
              <option value="all">Tất cả vòng đấu</option>
              {availableMatchdays.map(md => (
                <option key={md} value={md}>Vòng {md}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      {/* Matches List */}
      <div className="card p-0">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-500">Đang tải dữ liệu...</div>
        ) : filteredMatches.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-500">Không có dữ liệu lịch thi đấu.</div>
        ) : (
          Object.entries(
            filteredMatches.reduce((acc, m) => {
              const key = m.matchday || "Khác";
              if (!acc[key]) acc[key] = [];
              acc[key].push(m);
              return acc;
            }, {} as Record<string, any[]>)
          ).map(([matchday, list]) => (
            <div key={matchday} className="mb-6">
              <div className="bg-zinc-100 px-4 py-2 font-semibold text-[var(--navy)] rounded-t">Vòng {matchday}</div>
              <ul>
                {(list as any[])
                  .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
                  .map((m: any) => {
                    const d = new Date(m.utcDate);
                    const dateStr = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth()+1).toString().padStart(2, "0")}/${d.getFullYear()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
                    return (
                      <li key={m.id} className="flex items-center justify-between px-4 py-3 border-b last:border-b-0 hover:bg-zinc-50 transition">
                        <a href={`/matches/${m.id}`} className="flex flex-1 items-center gap-4">
                          <div className="flex items-center gap-2">
                            <img src={m.homeTeam.crest} alt={m.homeTeam.name} style={{width:32,height:32}} />
                            <span className="font-semibold text-[var(--navy)]">{m.homeTeam.name}</span>
                          </div>
                          <span className="mx-2 text-lg font-bold text-gray-700">{m.status === "FINISHED" && m.score.fullTime.home !== null && m.score.fullTime.away !== null ? `${m.score.fullTime.home} - ${m.score.fullTime.away}` : <span className="text-xs text-zinc-500">{m.status}</span>}</span>
                          <div className="flex items-center gap-2">
                            <img src={m.awayTeam.crest} alt={m.awayTeam.name} style={{width:32,height:32}} />
                            <span className="font-semibold text-[var(--navy)]">{m.awayTeam.name}</span>
                          </div>
                          <span className="ml-auto text-sm text-zinc-500">{dateStr}</span>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
