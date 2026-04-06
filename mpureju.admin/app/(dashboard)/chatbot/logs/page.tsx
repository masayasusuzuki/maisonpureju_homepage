import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { ChatLogViewer } from "./ChatLogViewer";

export default async function ChatLogsPage() {
  const supabase = await createSupabaseAdminClient();

  const { data: sessions } = await supabase
    .from("chat_sessions")
    .select("*, chat_messages(count)")
    .order("started_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">チャットログ</h1>
      </div>
      <ChatLogViewer sessions={sessions ?? []} />
    </div>
  );
}
