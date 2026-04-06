import { createSupabaseAdminClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseAdminClient();

  const [{ count: treatmentCount }, { count: priceCount }, { count: igPendingCount }] = await Promise.all([
    supabase.from("treatment_items").select("*", { count: "exact", head: true }),
    supabase.from("price_items").select("*", { count: "exact", head: true }),
    supabase.from("instagram_posts").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">ダッシュボード</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">施術一覧</p>
          <p className="text-2xl font-semibold text-gray-900">
            {treatmentCount ?? 0}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">料金項目</p>
          <p className="text-2xl font-semibold text-gray-900">
            {priceCount ?? 0}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">Instagram未処理</p>
          <p className="text-2xl font-semibold text-amber-600">
            {igPendingCount ?? 0}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
      </div>
    </div>
  );
}
