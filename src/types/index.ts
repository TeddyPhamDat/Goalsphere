export type NewsItem = {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  publishedAt: string; // ISO
};

export type MatchItem = {
  id: string;
  home: string;
  away: string;
  league: string;
  kickoff: string; // ISO datetime
};

export type StandingItem = {
  position: number;
  team: string;
  played: number;
  win: number;
  draw: number;
  loss: number;
  points: number;
};
