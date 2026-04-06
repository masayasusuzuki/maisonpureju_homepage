import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { InstagramTable } from "./InstagramTable";

export default async function InstagramPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: posts } = await supabase
    .from("instagram_posts")
    .select("*")
    .order("posted_at", { ascending: false });

  const counts = {
    total: posts?.length ?? 0,
    pending: posts?.filter((p) => p.status === "pending").length ?? 0,
    published: posts?.filter((p) => p.status === "published").length ?? 0,
    skipped: posts?.filter((p) => p.status === "skipped").length ?? 0,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Instagram投稿管理
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">全投稿</p>
          <p className="text-2xl font-semibold text-gray-900">
            {counts.total}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">未処理</p>
          <p className="text-2xl font-semibold text-amber-600">
            {counts.pending}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">公開済み</p>
          <p className="text-2xl font-semibold text-green-600">
            {counts.published}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">スキップ</p>
          <p className="text-2xl font-semibold text-gray-400">
            {counts.skipped}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
      </div>

      <InstagramTable posts={posts ?? []} />
    </div>
  );
}
