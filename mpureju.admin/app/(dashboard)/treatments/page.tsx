import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { TreatmentTable } from "./TreatmentTable";

export default async function TreatmentsPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: items } = await supabase
    .from("treatment_items")
    .select("*")
    .order("section")
    .order("sub_tab")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">施術一覧管理</h1>
      </div>
      <TreatmentTable items={items ?? []} />
    </div>
  );
}
