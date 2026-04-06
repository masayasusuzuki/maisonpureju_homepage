"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import Link from "next/link";

type Session = {
  id: string;
  page_url: string | null;
  user_agent: string | null;
  visitor_id: string | null;
  started_at: string;
  ended_at: string | null;
  chat_messages: [{ count: number }];
};

type Message = {
  id: string;
  role: string;
  content: string;
  created_at: string;
};

export function ChatLogViewer({ sessions }: { sessions: Session[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (!confirm("このセッションとメッセージをすべて削除しますか？")) return;
    const res = await fetch("/api/chatbot/logs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      alert("削除に失敗しました: " + error);
      return;
    }
    if (selectedId === sessionId) {
      setSelectedId(null);
      setMessages([]);
    }
    router.refresh();
  };

  const loadMessages = async (sessionId: string) => {
    if (selectedId === sessionId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(sessionId);
    setLoading(true);
    const supabase = createSupabaseClient();
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    setMessages(data ?? []);
    setLoading(false);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div>
      <div className="mb-4">
        <Link
          href="/chatbot"
          className="px-3 py-1.5 text-xs rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          ← プロンプト設定
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-36">開始日時</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-24">訪問者</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">ページURL</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-20">件数</th>
              <th className="px-4 py-3 w-28"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-xs text-gray-400">
                  チャットログはまだありません
                </td>
              </tr>
            )}
            {sessions.map((session) => (
              <Fragment key={session.id}>
                <tr
                  className={`border-b border-gray-100 hover:bg-gray-50/50 cursor-pointer ${
                    selectedId === session.id ? "bg-brand-cream/50" : ""
                  }`}
                  onClick={() => loadMessages(session.id)}
                >
                  <td className="px-4 py-3 text-xs text-gray-500 tabular-nums">
                    {formatDate(session.started_at)}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono truncate max-w-[6rem]" title={session.visitor_id ?? ""}>
                    {session.visitor_id ? session.visitor_id.slice(0, 8) : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-xs">
                    {session.page_url ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 text-center tabular-nums">
                    {session.chat_messages?.[0]?.count ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={(e) => deleteSession(e, session.id)}
                        className="text-[10px] px-2 py-1 text-red-400 hover:bg-red-50 rounded"
                      >
                        削除
                      </button>
                      <span className="text-xs text-brand-gold">
                        {selectedId === session.id ? "▲" : "▼"}
                      </span>
                    </div>
                  </td>
                </tr>
                {selectedId === session.id && (
                  <tr key={`${session.id}-messages`}>
                    <td colSpan={5} className="bg-gray-50 px-4 py-4">
                      {loading ? (
                        <p className="text-xs text-gray-400 text-center py-4">読み込み中...</p>
                      ) : messages.length === 0 ? (
                        <p className="text-xs text-gray-400 text-center py-4">メッセージなし</p>
                      ) : (
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {messages
                            .filter((m) => m.role !== "system")
                            .map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[70%] px-3 py-2 rounded-lg text-xs leading-relaxed ${
                                    msg.role === "user"
                                      ? "bg-brand-dark text-white"
                                      : "bg-white border border-gray-200 text-gray-700"
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap">{msg.content}</p>
                                  <p
                                    className={`text-[10px] mt-1 ${
                                      msg.role === "user" ? "text-white/50" : "text-gray-300"
                                    }`}
                                  >
                                    {formatTime(msg.created_at)}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">{sessions.length} セッション</p>
    </div>
  );
}
