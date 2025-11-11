type Scorer = { player: string; team: string; goals: number };

const mockTopScorers: Scorer[] = [
  { player: "Erling Haaland", team: "Man City", goals: 22 },
  { player: "Harry Kane", team: "Bayern", goals: 21 },
  { player: "Kylian Mbappé", team: "PSG", goals: 20 },
  { player: "Mohamed Salah", team: "Liverpool", goals: 18 },
];

export default function TopScorersWidget() {
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-2 text-[var(--navy)]">Top Scorers</h3>
      <ul className="text-sm space-y-1">
        {mockTopScorers.map((s, i) => (
          <li key={s.player} className="flex justify-between">
            <span>{i + 1}. {s.player} <span className="text-zinc-500">({s.team})</span></span>
            <span className="font-semibold">{s.goals}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
