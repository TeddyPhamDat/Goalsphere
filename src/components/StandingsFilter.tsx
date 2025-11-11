"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Standing = {
  id: number;
  position: number;
  team: string;
  crest: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
};

const COMPETITIONS = [
  { code: "PL", name: "Premier League", flag: "🏴󐁧󐁢󐁥󐁮󐁧󐁿" },
  { code: "PD", name: "La Liga", flag: "🇪🇸" },
  { code: "SA", name: "Serie A", flag: "🇮🇹" },
  { code: "BL1", name: "Bundesliga", flag: "🇩🇪" },
  { code: "FL1", name: "Ligue 1", flag: "🇫🇷" },
  { code: "CL", name: "Champions League", flag: "🏆" },
];

export default function StandingsFilter() {
  const [selectedCompetition, setSelectedCompetition] = useState("PL");
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(false);
  const [competitionName, setCompetitionName] = useState("Premier League");

  useEffect(() => {
    fetchStandings();
  }, [selectedCompetition]);

  const fetchStandings = async () => {
    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const season = currentYear >= 2025 ? 2025 : 2024;
      const response = await fetch(`/api/standings?competition=${selectedCompetition}&season=${season}`);
      const data = await response.json();
      
      if (data.standings) {
        setStandings(data.standings);
      }
      
      const comp = COMPETITIONS.find((c) => c.code === selectedCompetition);
      if (comp) {
        setCompetitionName(comp.name);
      }
    } catch (error) {
      console.error("Error fetching standings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[var(--navy)]">{competitionName} Standings</h2>
        <Link className="text-sm nav-link" href="/standings">
          View all
        </Link>
      </div>

      {/* Competition Dropdown */}
      <div className="mb-4">
        <label className="text-sm font-medium text-zinc-700 mb-1 block">
          Competition
        </label>
        <select
          value={selectedCompetition}
          onChange={(e) => setSelectedCompetition(e.target.value)}
          className="w-full max-w-xs border border-zinc-300 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--navy)]"
        >
          {COMPETITIONS.map((comp) => (
            <option key={comp.code} value={comp.code}>
              {comp.flag} {comp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Standings Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--navy)]"></div>
          <p className="mt-2 text-sm text-zinc-600">Loading standings...</p>
        </div>
      ) : standings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2">#</th>
                <th className="text-left py-2 px-2">Team</th>
                <th className="text-center py-2 px-2">P</th>
                <th className="text-center py-2 px-2">W</th>
                <th className="text-center py-2 px-2">D</th>
                <th className="text-center py-2 px-2">L</th>
                <th className="text-center py-2 px-2">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.slice(0, 5).map((item) => (
                <tr key={item.id} className="border-b hover:bg-zinc-50">
                  <td className="py-2 px-2 font-semibold">{item.position}</td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      {item.crest && (
                        <Image
                          src={item.crest}
                          alt={item.team}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      )}
                      <span className="truncate">{item.team}</span>
                    </div>
                  </td>
                  <td className="text-center py-2 px-2">{item.played}</td>
                  <td className="text-center py-2 px-2">{item.win}</td>
                  <td className="text-center py-2 px-2">{item.draw}</td>
                  <td className="text-center py-2 px-2">{item.loss}</td>
                  <td className="text-center py-2 px-2 font-bold">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-zinc-600 py-4">No standings data available</p>
      )}
    </section>
  );
}
