import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function DELETE(request: NextRequest) {
  const { session_id } = await request.json();

  if (!session_id) return NextResponse.json({ error: "session_id is required" }, { status: 400 });

  const supabase = await createSupabaseAdminClient();

  // メッセージを先に削除（FK制約）
  const { error: msgError } = await supabase
    .from("chat_messages")
    .delete()
    .eq("session_id", session_id);

  if (msgError) return NextResponse.json({ error: msgError.message }, { status: 500 });

  const { error: sessError } = await supabase
    .from("chat_sessions")
    .delete()
    .eq("id", session_id);

  if (sessError) return NextResponse.json({ error: sessError.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
