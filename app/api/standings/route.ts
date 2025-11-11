import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Use Football-Data.org API
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || "d0ce288006114da59af12b87226e26a3";
const COMPETITIONS = [
  "PL",      // Premier League
  "LL",      // La Liga
  "SA",      // Serie A
  "BL1",     // Bundesliga
  "FL1",     // Ligue 1
  "CL",      // Champions League
  "PD",      // La Liga (alt)
  "PPL",     // Primeira Liga
  "DED",     // Eredivisie
  "BSA",     // Serie A Brazil
  "WC",      // World Cup
  "EC"       // Euro
];
const SEASONS = [2022, 2023, 2024, 2025]; // You can extend or adjust as needed

async function fetchCompetitionStandings(code: string, season: number): Promise<any[]> {
  const url = `https://api.football-data.org/v4/competitions/${code}/standings?season=${season}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_KEY,
        "Accept": "application/json",
      } as Record<string, string>,
      next: {
        revalidate: 86400,
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Failed to fetch standings for ${code} ${season}:`, errorText);
      return [];
    }
    const data = await response.json();
    // Map to full format
    return (data.standings?.[0]?.table || []).map((item: any) => ({
      id: item.team.id,
      position: item.position,
      team: item.team.name,
      shortName: item.team.shortName,
      tla: item.team.tla,
      crest: item.team.crest,
      played: item.playedGames,
      win: item.won,
      draw: item.draw,
      loss: item.lost,
      points: item.points,
      goalsFor: item.goalsFor,
      goalsAgainst: item.goalsAgainst,
      goalDifference: item.goalDifference,
      form: item.form,
    }));
  } catch (error) {
    console.error(`Error fetching standings for ${code} ${season}:`, error);
    return [];
  }

}

async function fetchCompetitionScorers(code: string, season: number): Promise<any[]> {
  const url = `https://api.football-data.org/v4/competitions/${code}/scorers?season=${season}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": API_KEY,
        "Accept": "application/json",
      } as Record<string, string>,
      next: {
        revalidate: 3600,
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`Failed to fetch scorers for ${code} ${season}:`, errorText);
      return [];
    }
    const data = await response.json();
    return (data.scorers || []).map((item: any) => ({
      name: item.player.name,
      nationality: item.player.nationality,
      position: item.player.position,
      team: item.team.name,
      teamCrest: item.team.crest,
      goals: item.goals,
      assists: item.assists,
      played: item.playedMatches,
    }));
  } catch (error) {
    console.error(`Error fetching scorers for ${code} ${season}:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    console.error("Football-Data.org API key is missing.");
    return NextResponse.json(
      { error: "API key is not configured. Please set FOOTBALL_DATA_API_KEY." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const competition = searchParams.get("competition") || "PL";
  const season = Number(searchParams.get("season")) || new Date().getFullYear() - 1;

    const [standings, scorers] = await Promise.all([
      fetchCompetitionStandings(competition, season),
      fetchCompetitionScorers(competition, season)
    ]);
  return NextResponse.json({ competition, season, standings, scorers });
}