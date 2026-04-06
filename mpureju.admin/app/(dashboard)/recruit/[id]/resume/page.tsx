import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ResumeView } from "./ResumeView";
import { PrintButton } from "./PrintButton";

export default async function ResumePage({
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
      <div className="flex items-center justify-between mb-4 print:hidden">
        <a href={`/recruit/${id}`} className="text-sm text-gray-400 hover:text-gray-600">
          ← 詳細に戻る
        </a>
        <PrintButton />
      </div>

      <ResumeView data={data} />
    </div>
  );
}
