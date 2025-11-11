import { NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_DATA_API_KEY || "d0ce288006114da59af12b87226e26a3";

async function fetchMatchDetail(id: string): Promise<any> {
  const url = `https://api.football-data.org/v4/matches/${id}`;
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
      console.warn(`Failed to fetch match detail for ${id}:`, errorText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching match detail for ${id}:`, error);
    return null;
  }
}


export async function GET(request: Request, context: { params: { id: string } }) {
  if (!API_KEY) {
    console.error("Football-Data.org API key is missing.");
    return NextResponse.json(
      { error: "API key is not configured. Please set FOOTBALL_DATA_API_KEY." },
      { status: 500 }
    );
  }

  const id = context.params.id;
  const match = await fetchMatchDetail(id);
  if (!match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
  return NextResponse.json(match);
}
