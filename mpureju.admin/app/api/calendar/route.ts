import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

/** 定休曜日の一括更新 */
export async function PUT(request: NextRequest) {
  const { regularHolidays }: { regularHolidays: { day_of_week: number; label: string }[] } =
    await request.json();

  const supabase = await createSupabaseAdminClient();

  // 全削除 → 再挿入
  const { error: delErr } = await supabase.from("clinic_regular_holidays").delete().gte("day_of_week", 0);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  if (regularHolidays.length > 0) {
    const { error: insErr } = await supabase.from("clinic_regular_holidays").insert(regularHolidays);
    if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

/** 臨時休診 / 定休取消の追加 */
export async function POST(request: NextRequest) {
  const body: { date: string; type: "extra" | "cancel"; note?: string } = await request.json();

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("clinic_holiday_overrides").upsert(
    { date: body.date, type: body.type, note: body.note ?? null },
    { onConflict: "date" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

/** 臨時休診 / 定休取消の削除 */
export async function DELETE(request: NextRequest) {
  const { id }: { id: string } = await request.json();

  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const supabase = await createSupabaseAdminClient();
  const { error } = await supabase.from("clinic_holiday_overrides").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
