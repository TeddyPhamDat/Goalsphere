"use client";
import { useEffect, useState } from "react";

export default function FollowTeamButton({ team }: { team: string }) {
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("followedTeams") || "[]");
    setFollowing(list.includes(team));
  }, [team]);

  const toggle = () => {
    const raw = localStorage.getItem("followedTeams");
    const list: string[] = raw ? JSON.parse(raw) : [];
    const next = following ? list.filter(t => t !== team) : [...new Set([...list, team])];
    localStorage.setItem("followedTeams", JSON.stringify(next));
    setFollowing(!following);
  };

  return (
    <button onClick={toggle} className={`text-sm px-3 py-1 rounded border ${following ? 'bg-[var(--navy)] text-white' : 'bg-white text-zinc-700'} border-zinc-200 hover:bg-zinc-50`}>
      {following ? 'Đang theo dõi' : 'Theo dõi đội'}
    </button>
  );
}
