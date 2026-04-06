import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { StatusForm } from "./StatusForm";
import { NotesSection } from "./NotesSection";
import { AiAnalysis } from "./AiAnalysis";
import { ResumeButton } from "./ResumeButton";

const POSITION_LABEL: Record<string, string> = {
  nurse:        "看護師",
  receptionist: "受付カウンセラー",
  "pr-creator": "広報/SNSクリエイター",
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseAdminClient();

  const { data } = await supabase
    .from("job_applications")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return (
    <div>
      {/* ヘッダー */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <a href="/recruit" className="text-sm text-gray-400 hover:text-gray-600">← 一覧に戻る</a>
        <h1 className="text-xl font-semibold text-gray-900">{data.name} さんの応募</h1>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
          {POSITION_LABEL[data.position] ?? data.position}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <StatusForm id={data.id} currentStatus={data.status} />
          <ResumeButton id={data.id} />
        </div>
      </div>

      {/* AI分析 */}
      <AiAnalysis applicationId={data.id} initialAnalysis={data.ai_analysis ?? null} />

      {/* メモ */}
      <NotesSection applicationId={data.id} />
    </div>
  );
}
