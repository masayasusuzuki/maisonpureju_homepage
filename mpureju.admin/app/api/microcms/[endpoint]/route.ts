import { NextRequest, NextResponse } from "next/server";
import { listContents, createContent } from "@/lib/microcms/client";

type Ctx = { params: Promise<{ endpoint: string }> };

/** GET /api/microcms/[endpoint]?limit=&offset=&orders=&filters= */
export async function GET(req: NextRequest, ctx: Ctx) {
  const { endpoint } = await ctx.params;
  const sp = req.nextUrl.searchParams;
  const params: Record<string, string> = {};
  for (const [k, v] of sp.entries()) params[k] = v;

  try {
    const data = await listContents(endpoint, params);
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/** POST /api/microcms/[endpoint] — 新規作成 */
export async function POST(req: NextRequest, ctx: Ctx) {
  const { endpoint } = await ctx.params;
  const body = await req.json();

  try {
    const result = await createContent(endpoint, body);
    return NextResponse.json(result);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
