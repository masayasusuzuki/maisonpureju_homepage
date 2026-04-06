import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  const { noteId } = await params;
  const supabase = await createSupabaseAdminClient();

  const { error } = await supabase
    .from("application_notes")
    .delete()
    .eq("id", noteId);

  if (error) {
    console.error("note delete error:", error);
    return NextResponse.json({ error: "削除に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  const { noteId } = await params;
  const { body } = await req.json();

  if (!body?.trim()) {
    return NextResponse.json({ error: "メモ内容が空です" }, { status: 400 });
  }

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("application_notes")
    .update({ body: body.trim() })
    .eq("id", noteId);

  if (error) {
    console.error("note update error:", error);
    return NextResponse.json({ error: "更新に失敗しました" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
