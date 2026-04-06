import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { ApplicationTable } from "./ApplicationTable";

export default async function RecruitPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: applications } = await supabase
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false });

  const list = applications ?? [];

  const counts = {
    total:     list.length,
    newCount:  list.filter((a) => a.status === "new").length,
    interview: list.filter((a) => a.status === "interview").length,
    offered:   list.filter((a) => a.status === "offered").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">採用応募管理</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">全応募</p>
          <p className="text-2xl font-semibold text-gray-900">
            {counts.total}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">新着</p>
          <p className="text-2xl font-semibold text-amber-600">
            {counts.newCount}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">面接調整中</p>
          <p className="text-2xl font-semibold text-purple-600">
            {counts.interview}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="text-xs text-gray-400 mb-1">内定</p>
          <p className="text-2xl font-semibold text-green-600">
            {counts.offered}
            <span className="text-sm font-normal text-gray-400 ml-1">件</span>
          </p>
        </div>
      </div>

      <ApplicationTable applications={list} />
    </div>
  );
}
