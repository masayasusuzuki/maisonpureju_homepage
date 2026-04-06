import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { PromptTable } from "./PromptTable";

export default async function ChatbotPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: prompts } = await supabase
    .from("chatbot_prompts")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">チャットボット設定</h1>
      </div>
      <PromptTable prompts={prompts ?? []} />
    </div>
  );
}
