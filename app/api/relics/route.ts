import { NextRequest, NextResponse } from "next/server";
import { getRelics } from "@/lib/relics";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "ancient israel";
  const site = request.nextUrl.searchParams.get("site") ?? undefined;
  const data = await getRelics(query, site);
  return NextResponse.json(data);
}
