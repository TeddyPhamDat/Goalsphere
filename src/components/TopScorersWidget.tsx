"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const COMPETITIONS = [
  { code: "PL", name: "Premier League" },
  { code: "PD", name: "La Liga" },
  { code: "SA", name: "Serie A" },
  { code: "BL1", name: "Bundesliga" },
  { code: "FL1", name: "Ligue 1" },
];

const SEASONS = [2022, 2023, 2024, 2025];

type Scorer = { 
  name: string; 
  team: string; 
  goals: number;
  assists: number | null;
  nationality: string;
  teamCrest: string;
};

export default function TopScorersWidget() {
  const [competition, setCompetition] = useState("PL");
  const [season, setSeason] = useState(new Date().getFullYear() - 1);
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchScorers() {
      setLoading(true);
      try {
        const res = await fetch(`/api/standings?competition=${competition}&season=${season}`);
        if (res.ok) {
          const json = await res.json();
          setScorers(Array.isArray(json.scorers) ? json.scorers.slice(0, 5) : []);
        } else {
          setScorers([]);
        }
      } catch {
        setScorers([]);
      }
      setLoading(false);
    }
    fetchScorers();
  }, [competition, season]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-600">Chọn giải đấu</label>
        <select
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={competition}
          onChange={(e) => setCompetition(e.target.value)}
        >
          {COMPETITIONS.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-zinc-600">Chọn mùa giải</label>
        <select
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
        >
          {SEASONS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-4 text-sm text-zinc-500">Đang tải...</div>
      ) : scorers.length === 0 ? (
        <div className="text-center py-4 text-sm text-zinc-500">Không có dữ liệu</div>
      ) : (
        <ul className="text-sm space-y-2">
          {scorers.map((s, i) => (
            <li key={s.name + s.team} className="flex items-center gap-2 p-2 rounded hover:bg-zinc-50 transition-colors">
              <span className="flex-shrink-0 w-6 h-6 bg-[var(--navy)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <img src={s.teamCrest} alt={s.team} className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[var(--navy)] truncate">{s.name}</div>
                <div className="text-xs text-zinc-500 truncate">{s.team}</div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2">
                <span className="font-bold text-[var(--navy)]">{s.goals}</span>
                <span className="text-xs text-zinc-400">⚽</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Link 
        href="/standings" 
        className="block w-full text-center bg-[var(--navy)] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        View All Standings →
      </Link>
    </div>
  );
}
