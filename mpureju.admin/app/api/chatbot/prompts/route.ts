import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const supabase = await createSupabaseAdminClient();

  // content更新時はversionも+1
  if (updates.content !== undefined) {
    const { data: current } = await supabase
      .from("chatbot_prompts")
      .select("version")
      .eq("id", id)
      .single();

    updates.version = (current?.version ?? 0) + 1;
    updates.updated_at = new Date().toISOString();
  }

  // is_activeトグル時もupdated_atを更新
  if (updates.is_active !== undefined) {
    updates.updated_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("chatbot_prompts")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase
    .from("chatbot_prompts")
    .insert({
      name: body.name,
      content: body.content,
      is_active: true,
      version: 1,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
