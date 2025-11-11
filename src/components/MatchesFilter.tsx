"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Match = {
  id: number;
  utcDate: string;
  status: string;
  matchday?: number;
  homeTeam: {
    name: string;
    crest: string;
  };
  awayTeam: {
    name: string;
    crest: string;
  };
  score?: {
    fullTime?: {
      home: number | null;
      away: number | null;
    };
  };
};

const COMPETITIONS = [
  { code: "PL", name: "Premier League", flag: "🏴󐁧󐁢󐁥󐁮󐁧󐁿" },
  { code: "PD", name: "La Liga", flag: "🇪🇸" },
  { code: "SA", name: "Serie A", flag: "🇮🇹" },
  { code: "BL1", name: "Bundesliga", flag: "🇩🇪" },
  { code: "FL1", name: "Ligue 1", flag: "🇫🇷" },
  { code: "CL", name: "Champions League", flag: "🏆" },
];

export default function MatchesFilter() {
  const [selectedCompetition, setSelectedCompetition] = useState("PL");
  const [selectedMatchday, setSelectedMatchday] = useState<string>("all");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableMatchdays, setAvailableMatchdays] = useState<number[]>([]);

  useEffect(() => {
    fetchMatches();
  }, [selectedCompetition]);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const season = currentYear >= 2025 ? 2025 : 2024;
      const response = await fetch(`/api/matches?competition=${selectedCompetition}&season=${season}`);
      const data = await response.json();
      
      if (data.matches) {
        setMatches(data.matches);
        
        // Get unique matchdays
        const matchdays = [...new Set(
          data.matches
            .filter((m: Match) => m.matchday)
            .map((m: Match) => m.matchday)
        )].sort((a, b) => (a as number) - (b as number)) as number[];
        
        setAvailableMatchdays(matchdays);
        setSelectedMatchday("all"); // Reset to "all" when fetching new data
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter by matchday first
  const matchdayFiltered = matches.filter((m) => {
    if (selectedMatchday === "all") return true;
    return String(m.matchday) === selectedMatchday;
  });

  // Try to get upcoming matches first, if none, show recent matches
  let upcomingMatches = matchdayFiltered.filter((m) => 
    m.status === "SCHEDULED" || m.status === "TIMED" || m.status === "IN_PLAY"
  );

  // If no upcoming matches, show recent finished matches
  const filteredMatches = upcomingMatches.length > 0 
    ? upcomingMatches.slice(0, 10)
    : matchdayFiltered
        .filter(m => m.status === "FINISHED")
        .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
        .slice(0, 10);

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[var(--navy)]">Upcoming Matches</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Competition Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-sm font-medium text-zinc-700 mb-1 block">
            Competition
          </label>
          <select
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
          >
            {COMPETITIONS.map((comp) => (
              <option key={comp.code} value={comp.code}>
                {comp.flag} {comp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Matchday Dropdown */}
        {availableMatchdays.length > 0 && (
          <div className="flex-1 min-w-[150px]">
            <label className="text-sm font-medium text-zinc-700 mb-1 block">
              Matchday
            </label>
            <select
              value={selectedMatchday}
              onChange={(e) => setSelectedMatchday(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
            >
              <option value="all">Tất cả vòng</option>
              {availableMatchdays.map((day) => (
                <option key={day} value={String(day)}>
                  Vòng {day}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Matches List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--navy)]"></div>
          <p className="mt-2 text-sm text-zinc-600">Loading matches...</p>
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-600">Không có dữ liệu trận đấu</p>
          <p className="text-sm text-zinc-500 mt-1">Thử chọn giải đấu khác</p>
        </div>
      ) : filteredMatches.length > 0 ? (
        <ul className="divide-y">
          {filteredMatches.map((m) => {
            const hasScore = m.score?.fullTime?.home !== null && m.score?.fullTime?.away !== null;
            const isFinished = m.status === "FINISHED";
            
            return (
              <li key={m.id} className="py-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {/* Home Team */}
                  <div className="flex items-center gap-2 flex-1 min-w-[120px]">
                    {m.homeTeam?.crest && (
                      <Image
                        src={m.homeTeam.crest}
                        alt={m.homeTeam.name}
                        width={28}
                        height={28}
                        className="object-contain flex-shrink-0"
                      />
                    )}
                    <span className="font-semibold text-sm">{m.homeTeam?.name || "TBD"}</span>
                  </div>

                  {/* Score or VS */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {hasScore && isFinished && m.score?.fullTime ? (
                      <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1 rounded">
                        <span className="font-bold text-lg text-[var(--navy)]">
                          {m.score.fullTime.home}
                        </span>
                        <span className="text-zinc-400">-</span>
                        <span className="font-bold text-lg text-[var(--navy)]">
                          {m.score.fullTime.away}
                        </span>
                      </div>
                    ) : (
                      <span className="text-zinc-500 font-semibold text-sm">vs</span>
                    )}
                  </div>

                  {/* Away Team */}
                  <div className="flex items-center gap-2 flex-1 justify-end min-w-[120px]">
                    <span className="font-semibold text-sm">{m.awayTeam?.name || "TBD"}</span>
                    {m.awayTeam?.crest && (
                      <Image
                        src={m.awayTeam.crest}
                        alt={m.awayTeam.name}
                        width={28}
                        height={28}
                        className="object-contain flex-shrink-0"
                      />
                    )}
                  </div>

                  {/* Time & Matchday */}
                  <div className="flex flex-col items-end flex-shrink-0 min-w-[100px]">
                    <span className="text-xs font-semibold text-[var(--navy)]">
                      {new Date(m.utcDate).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {m.matchday && (
                      <span className="text-xs text-zinc-500 mt-0.5">Vòng {m.matchday}</span>
                    )}
                    {isFinished && (
                      <span className="text-xs text-green-600 font-medium mt-0.5">Đã đá</span>
                    )}
                    {m.status === "IN_PLAY" && (
                      <span className="text-xs text-red-600 font-medium mt-0.5 animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-zinc-600">Không có trận đấu cho vòng này</p>
          <p className="text-sm text-zinc-500 mt-1">
            Thử chọn "Tất cả vòng" hoặc vòng đấu khác
          </p>
        </div>
      )}
    </section>
  );
}
