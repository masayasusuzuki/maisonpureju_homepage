import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { CalendarEditor } from "./CalendarEditor";

export default async function CalendarPage() {
  const supabase = await createSupabaseAdminClient();

  const [{ data: holidays }, { data: overrides }] = await Promise.all([
    supabase.from("clinic_regular_holidays").select("*").order("day_of_week"),
    supabase.from("clinic_holiday_overrides").select("*").order("date"),
  ]);

  return (
    <div>
      <h1 className="text-lg font-semibold text-gray-900 mb-6">営業カレンダー</h1>
      <CalendarEditor
        initialHolidays={holidays ?? []}
        initialOverrides={overrides ?? []}
      />
    </div>
  );
}
