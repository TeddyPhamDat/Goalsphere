import { NextResponse } from "next/server";

// Use Football-Data.org API
const API_KEY = process.env.FOOTBALL_DATA_API_KEY || "d0ce288006114da59af12b87226e26a3";

async function fetchCompetitionMatches(code: string, season: number): Promise<any[]> {
  const url = `https://api.football-data.org/v4/competitions/${code}/matches?season=${season}`;
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
      console.warn(`Failed to fetch matches for ${code} ${season}:`, errorText);
      return [];
    }
    const data = await response.json();
    // Map to expected format
    return (data.matches || []).map((item: any) => ({
      id: item.id,
      utcDate: item.utcDate,
      status: item.status,
      matchday: item.matchday,
      stage: item.stage,
      group: item.group,
      homeTeam: {
        name: item.homeTeam.name,
        crest: item.homeTeam.crest,
      },
      awayTeam: {
        name: item.awayTeam.name,
        crest: item.awayTeam.crest,
      },
      score: item.score,
      referees: item.referees,
    }));
  } catch (error) {
    console.error(`Error fetching matches for ${code} ${season}:`, error);
    return [];
  }
}

export async function GET(request: Request) {
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

  const matches = await fetchCompetitionMatches(competition, season);
  return NextResponse.json({ competition, season, matches });
}
