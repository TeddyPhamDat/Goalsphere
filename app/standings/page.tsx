

"use client";
import { useState, useEffect } from "react";
import React from "react";

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

export default function StandingsPage() {
  const [competition, setCompetition] = useState("PL");
  const [season, setSeason] = useState(new Date().getFullYear() - 1);
  const [standings, setStandings] = useState<any[]>([]);
  const [scorers, setScorers] = useState<any[]>([]);
  const [source, setSource] = useState("api");
  const [loading, setLoading] = useState(false);
  const [teamModal, setTeamModal] = useState<{open: boolean, team: any | null}>({open: false, team: null});
  const [teamLoading, setTeamLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setSource("api");
      try {
        const apiUrl = `/api/standings?competition=${competition}&season=${season}`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const json = await res.json();
          setStandings(Array.isArray(json.standings) ? json.standings : []);
          setScorers(Array.isArray(json.scorers) ? json.scorers : []);
        } else {
          setSource("error");
          setStandings([]);
          setScorers([]);
        }
      } catch {
        setSource("error");
        setStandings([]);
      }
      setLoading(false);
    }
    fetchData();
  }, [competition, season]);

  async function handleTeamClick(teamId: number) {
    setTeamLoading(true);
    setTeamModal({open: true, team: null});
    try {
      const res = await fetch(`/api/team?id=${teamId}`);
      if (res.ok) {
        const json = await res.json();
        setTeamModal({open: true, team: json});
      } else {
        setTeamModal({open: true, team: null});
      }
    } catch {
      setTeamModal({open: true, team: null});
    }
    setTeamLoading(false);
  }

  return (
    <main className="container-app py-6">
      <h1 className="text-2xl font-semibold mb-4 text-[var(--navy)]">Standings</h1>
      <div className="flex flex-col items-center justify-center gap-2 mb-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-start">
            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="competition">Giải đấu</label>
            <select
              id="competition"
              className="border rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
              value={competition}
              onChange={e => setCompetition(e.target.value)}
            >
              {COMPETITIONS.map(c => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-start">
            <label className="mb-1 text-sm font-medium text-gray-700" htmlFor="season">Mùa giải</label>
            <select
              id="season"
              className="border rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm"
              value={season}
              onChange={e => setSeason(Number(e.target.value))}
            >
              {SEASONS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mb-2 text-xs text-gray-500">Nguồn dữ liệu: <span className={source === "api" ? "text-green-600" : "text-red-600"}>{source === "api" ? "Football-Data.org" : "Lỗi API"}</span></div>
      <div className="card p-0 table-responsive mb-8">
        {loading ? (
          <div className="p-4 text-center text-sm text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-100">
              <tr className="text-center">
                <th className="p-3">#</th>
                <th className="p-3">Team</th>
                <th className="p-3">Logo</th>
                <th className="p-3">Short</th>
                <th className="p-3">TLA</th>
                <th className="p-3">P</th>
                <th className="p-3">W</th>
                <th className="p-3">D</th>
                <th className="p-3">L</th>
                <th className="p-3">Pts</th>
                <th className="p-3">GF</th>
                <th className="p-3">GA</th>
                <th className="p-3">GD</th>
                <th className="p-3">Form</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((s: any) => (
                <tr key={s.position + s.team} className="border-t text-center align-middle">
                  <td className="p-3 font-medium align-middle">{s.position}</td>
                  <td className="p-3 align-middle">
                    <button
                      className="text-blue-600 hover:underline font-semibold"
                      onClick={() => handleTeamClick(s.id)}
                      title="Xem đội bóng và cầu thủ"
                    >
                      {s.team}
                    </button>
                  </td>
                  <td className="p-3 align-middle"><img src={s.crest} alt={s.team} style={{width:24,height:24}} /></td>
                  <td className="p-3 align-middle">{s.shortName}</td>
                  <td className="p-3 align-middle">{s.tla}</td>
                  <td className="p-3 align-middle">{s.played}</td>
                  <td className="p-3 align-middle">{s.win}</td>
                  <td className="p-3 align-middle">{s.draw}</td>
                  <td className="p-3 align-middle">{s.loss}</td>
                  <td className="p-3 font-semibold align-middle">{s.points}</td>
                  <td className="p-3 align-middle">{s.goalsFor}</td>
                  <td className="p-3 align-middle">{s.goalsAgainst}</td>
                  <td className="p-3 align-middle">{s.goalDifference}</td>
                  <td className="p-3 align-middle">
                    {s.form ? s.form.split(',').map((f: string, idx: number) => {
                      let color = '';
                      if (f === 'W') color = 'bg-green-500 text-white';
                      else if (f === 'D') color = 'bg-yellow-400 text-black';
                      else if (f === 'L') color = 'bg-red-500 text-white';
                      return <span key={idx} className={`inline-block rounded px-2 py-1 mx-0.5 text-xs font-bold ${color}`}>{f}</span>;
                    }) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal hiển thị thông tin đội bóng và cầu thủ */}
      {teamModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setTeamModal({open: false, team: null})}
              title="Đóng"
            >×</button>
            {teamLoading ? (
              <div className="text-center py-8 text-gray-500">Đang tải thông tin đội bóng...</div>
            ) : teamModal.team ? (
              <>
                <div className="flex items-center gap-4 mb-4">
                  <img src={teamModal.team.crest} alt={teamModal.team.name} style={{width:48,height:48}} />
                  <div>
                    <h3 className="text-xl font-bold text-[var(--navy)]">{teamModal.team.name}</h3>
                    <div className="text-sm text-gray-600">{teamModal.team.area?.name} | Thành lập: {teamModal.team.founded}</div>
                    <div className="text-sm text-gray-600">HLV: {teamModal.team.coach?.name ?? '-'}</div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2">Danh sách cầu thủ</h4>
                {Array.isArray(teamModal.team.squad) && teamModal.team.squad.length > 0 ? (
                  <div className="overflow-y-auto max-h-[55vh]">
                    <table className="min-w-full text-sm mb-2">
                      <thead className="bg-zinc-100">
                        <tr>
                          <th className="p-2">#</th>
                          <th className="p-2">Tên</th>
                          <th className="p-2">Vị trí</th>
                          <th className="p-2">Quốc tịch</th>
                          <th className="p-2">Số áo</th>
                          <th className="p-2">Giá trị</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamModal.team.squad.map((p: any, idx: number) => (
                          <tr key={p.id} className="border-t">
                            <td className="p-2">{idx + 1}</td>
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.position}</td>
                            <td className="p-2">{p.nationality}</td>
                            <td className="p-2">{p.shirtNumber ?? '-'}</td>
                            <td className="p-2">{p.marketValue ? p.marketValue.toLocaleString() + ' €' : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-gray-500">Không có dữ liệu cầu thủ.</div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-red-500">Không lấy được thông tin đội bóng.</div>
            )}
          </div>
        </div>
      )}

      {/* Top Scorers */}
      <div className="card p-0 table-responsive">
        <h2 className="text-lg font-semibold px-4 py-2 text-[var(--navy)]">Vua phá lưới</h2>
        {loading ? (
          <div className="p-4 text-center text-sm text-gray-500">Đang tải dữ liệu...</div>
        ) : scorers.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">Không có dữ liệu vua phá lưới.</div>
        ) : (
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-100">
              <tr className="text-left">
                <th className="p-3">#</th>
                <th className="p-3">Tên</th>
                <th className="p-3">Đội</th>
                <th className="p-3">Logo</th>
                <th className="p-3">Quốc tịch</th>
                <th className="p-3">Vị trí</th>
                <th className="p-3">Bàn</th>
                <th className="p-3">Kiến tạo</th>
                <th className="p-3">Trận</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((s: any, idx: number) => (
                <tr key={s.name + s.team} className="border-t">
                  <td className="p-3 font-medium">{idx + 1}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.team}</td>
                  <td className="p-3"><img src={s.teamCrest} alt={s.team} style={{width:24,height:24}} /></td>
                  <td className="p-3">{s.nationality}</td>
                  <td className="p-3">{s.position}</td>
                  <td className="p-3 font-semibold">{s.goals}</td>
                  <td className="p-3">{s.assists ?? '-'}</td>
                  <td className="p-3">{s.played}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
