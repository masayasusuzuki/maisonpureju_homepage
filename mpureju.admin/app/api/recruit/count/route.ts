import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createSupabaseAdminClient();

  const { count, error } = await supabase
    .from("job_applications")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count ?? 0 });
}
