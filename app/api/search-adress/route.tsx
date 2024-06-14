import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
  const searchText = searchParams.get("q");
  const res = await fetch(
    `${BASE_URL}?q=${searchText}&language=en&limit=6&session_token=[GENERATED-UUID]&proximity=-83.748708,42.265837&country=US&access_token=${process.env.MAPBOX_ACCES_TOKEN}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const searchResult = await res.json();

  return NextResponse.json(searchResult);
}
