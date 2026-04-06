import { NextRequest, NextResponse } from "next/server";
import { getContent, patchContent, deleteContent } from "@/lib/microcms/client";

type Ctx = { params: Promise<{ endpoint: string; contentId: string }> };

/** GET /api/microcms/[endpoint]/[contentId] — 単一取得 */
export async function GET(_req: NextRequest, ctx: Ctx) {
  const { endpoint, contentId } = await ctx.params;

  try {
    const data = await getContent(endpoint, contentId);
    return NextResponse.json(data);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/** PATCH /api/microcms/[endpoint]/[contentId] — 部分更新 */
export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { endpoint, contentId } = await ctx.params;
  const body = await req.json();

  try {
    const result = await patchContent(endpoint, contentId, body);
    return NextResponse.json(result);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

/** DELETE /api/microcms/[endpoint]/[contentId] — 削除 */
export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { endpoint, contentId } = await ctx.params;

  try {
    await deleteContent(endpoint, contentId);
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
