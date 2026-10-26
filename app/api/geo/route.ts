import { City, State } from "country-state-city";

// /api/geo            -> all Indian states and union territories
// /api/geo?state=GJ   -> cities of that state, sorted
// Kept on the server so the big city list never ships to the browser.
export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("state");
  const headers = { "Cache-Control": "public, max-age=86400, s-maxage=86400" };
  if (!code) {
    const states = State.getStatesOfCountry("IN").map((s) => ({ code: s.isoCode, name: s.name })).sort((a, b) => a.name.localeCompare(b.name));
    return Response.json({ states }, { headers });
  }
  if (!/^[A-Z]{2}$/.test(code)) return Response.json({ error: "Invalid state" }, { status: 400 });
  const cities = [...new Set(City.getCitiesOfState("IN", code).map((c) => c.name))].sort((a, b) => a.localeCompare(b));
  return Response.json({ cities }, { headers });
}
