import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("application_notes")
    .select("*")
    .eq("application_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "取得に失敗しました" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { author, body } = await req.json();

  if (!body?.trim()) {
    return NextResponse.json({ error: "メモ内容が空です" }, { status: 400 });
  }
  if (!author?.trim()) {
    return NextResponse.json({ error: "投稿者名が空です" }, { status: 400 });
  }

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("application_notes").insert({
    application_id: id,
    author: author.trim(),
    body: body.trim(),
  });

  if (error) {
    console.error("note insert error:", error);
    return NextResponse.json({ error: "保存に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
