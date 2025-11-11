"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MatchDetailPage() {
  const { id } = useParams();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/matches/${id}`);
        if (res.ok) {
          const json = await res.json();
          setMatch(json);
        } else {
          setError("Không tìm thấy trận đấu hoặc lỗi API.");
        }
      } catch {
        setError("Không thể tải dữ liệu.");
      }
      setLoading(false);
    }
    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải thông tin trận đấu...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!match) return null;

  return (
    <main className="container-app py-6 space-y-4">
      <h1 className="text-2xl font-semibold text-[var(--navy)] mb-4">Chi tiết trận đấu</h1>
      <div className="card p-4 mb-4">
        <div className="flex items-center gap-4 mb-2">
          <img src={match.homeTeam.crest} alt={match.homeTeam.name} style={{width:32,height:32}} />
          <span className="font-bold text-lg">{match.homeTeam.name}</span>
          <span className="mx-2">vs</span>
          <img src={match.awayTeam.crest} alt={match.awayTeam.name} style={{width:32,height:32}} />
          <span className="font-bold text-lg">{match.awayTeam.name}</span>
        </div>
        <div className="text-sm text-zinc-600 mb-2">Thời gian: {new Date(match.utcDate).toLocaleString()}</div>
        <div className="text-sm text-zinc-600 mb-2">Vòng: {match.matchday} | Giai đoạn: {match.stage} {match.group ? `| Nhóm: ${match.group}` : ""}</div>
        <div className="text-sm text-zinc-600 mb-2">Trạng thái: {match.status}</div>
        {match.status === "FINISHED" && match.score ? (
          <div className="text-lg font-bold text-green-700 mb-2">
            Tỉ số: {match.score.fullTime.home} - {match.score.fullTime.away}
          </div>
        ) : null}
      </div>
      {/* Bàn thắng */}
      {match.goals && match.goals.length > 0 && (
        <div className="card p-4 mb-4">
          <h2 className="font-semibold mb-2">Bàn thắng</h2>
          <ul className="list-disc pl-6">
            {match.goals.map((g: any, idx: number) => (
              <li key={idx}>
                <span className="font-bold">Phút {g.minute}{g.injuryTime ? `+${g.injuryTime}` : ""}:</span> 
                <span className="text-green-700">{g.scorer?.name}</span> ({g.team?.name})
                {g.assist ? <> kiến tạo: <span className="text-blue-700">{g.assist.name}</span></> : null}
                <span className="ml-2 text-xs text-zinc-500">Tỉ số: {g.score.home} - {g.score.away}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Thẻ */}
      {match.bookings && match.bookings.length > 0 && (
        <div className="card p-4 mb-4">
          <h2 className="font-semibold mb-2">Thẻ phạt</h2>
          <ul className="list-disc pl-6">
            {match.bookings.map((b: any, idx: number) => (
              <li key={idx}>
                <span className="font-bold">Phút {b.minute}:</span> 
                <span>{b.player?.name}</span> ({b.team?.name}) - <span className={b.card === "YELLOW" ? "text-yellow-600" : b.card === "RED" ? "text-red-600" : ""}>{b.card}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Thay người */}
      {match.substitutions && match.substitutions.length > 0 && (
        <div className="card p-4 mb-4">
          <h2 className="font-semibold mb-2">Thay người</h2>
          <ul className="list-disc pl-6">
            {match.substitutions.map((s: any, idx: number) => (
              <li key={idx}>
                <span className="font-bold">Phút {s.minute}:</span> 
                <span>{s.playerOut?.name}</span> ({s.team?.name}) ra, <span>{s.playerIn?.name}</span> vào
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Penalty */}
      {match.penalties && match.penalties.length > 0 && (
        <div className="card p-4 mb-4">
          <h2 className="font-semibold mb-2">Penalty</h2>
          <ul className="list-disc pl-6">
            {match.penalties.map((p: any, idx: number) => (
              <li key={idx}>
                <span className="font-bold">Phút {p.minute}:</span> 
                <span>{p.scorer?.name}</span> ({p.team?.name})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Đội hình */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["homeTeam", "awayTeam"].map(side => (
          match[side]?.lineup && match[side].lineup.length > 0 && (
            <div key={side} className="card p-4 mb-4">
              <h2 className="font-semibold mb-2">Đội hình xuất phát: {match[side].name}</h2>
              <ul className="list-disc pl-6">
                {match[side].lineup.map((p: any, idx: number) => (
                  <li key={idx}>{p.shirtNumber ? `#${p.shirtNumber} ` : ""}{p.name} <span className="text-xs text-zinc-500">({p.position})</span></li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["homeTeam", "awayTeam"].map(side => (
          match[side]?.statistics && (
            <div key={side} className="card p-4 mb-4">
              <h2 className="font-semibold mb-2">Thống kê: {match[side].name}</h2>
              <ul className="list-disc pl-6">
                {Object.entries(match[side].statistics).map(([stat, value]) => (
                  <li key={stat}>{stat.replace(/_/g, " ")}: <span className="font-bold">{String(value)}</span></li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>

      {/* Trọng tài, VAR */}
      {match.referees && match.referees.length > 0 && (
        <div className="card p-4 mb-4">
          <h2 className="font-semibold mb-2">Tổ trọng tài & VAR</h2>
          <ul className="list-disc pl-6">
            {match.referees.map((r: any) => (
              <li key={r.id}>{r.name} ({r.nationality}) {r.type && <span className="text-xs text-zinc-500">[{r.type}]</span>}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
