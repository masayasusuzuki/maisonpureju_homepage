import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ResumeView } from "@/app/(dashboard)/recruit/[id]/resume/ResumeView";

export default async function ResumeStandalonePage({
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <ResumeView data={data} />
    </div>
  );
}
