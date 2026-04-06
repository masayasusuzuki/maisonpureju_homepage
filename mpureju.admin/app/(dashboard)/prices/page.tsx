import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { PriceTable } from "./PriceTable";

export default async function PricesPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: items } = await supabase
    .from("price_items")
    .select("*")
    .order("section")
    .order("sub_tab")
    .order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">料金管理</h1>
      </div>
      <PriceTable items={items ?? []} />
    </div>
  );
}
