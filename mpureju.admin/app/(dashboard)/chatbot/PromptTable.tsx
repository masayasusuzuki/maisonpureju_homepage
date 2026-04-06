"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Prompt = {
  id: string;
  name: string;
  content: string;
  is_active: boolean;
  version: number;
  updated_at: string;
};

export function PromptTable({ prompts }: { prompts: Prompt[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Prompt>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newContent, setNewContent] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const startEdit = (prompt: Prompt) => {
    setEditingId(prompt.id);
    setEditForm({ content: prompt.content });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    const res = await fetch("/api/chatbot/prompts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, content: editForm.content }),
    });
    setSaving(false);
    if (!res.ok) {
      const { error } = await res.json();
      alert("保存に失敗しました: " + error);
      return;
    }
    setEditingId(null);
    setEditForm({});
    router.refresh();
  };

  const toggleActive = async (prompt: Prompt) => {
    const res = await fetch("/api/chatbot/prompts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: prompt.id, is_active: !prompt.is_active }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      alert("更新に失敗しました: " + error);
      return;
    }
    router.refresh();
  };

  const addPrompt = async () => {
    if (!newName.trim() || !newContent.trim()) {
      alert("名前と内容を入力してください");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/chatbot/prompts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), content: newContent.trim() }),
    });
    setSaving(false);
    if (!res.ok) {
      const { error } = await res.json();
      alert("追加に失敗しました: " + error);
      return;
    }
    setShowAdd(false);
    setNewName("");
    setNewContent("");
    router.refresh();
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-3 py-1.5 text-xs rounded-md bg-brand-dark text-white hover:bg-brand-brown transition-colors"
        >
          ＋ 新規プロンプト
        </button>
        <Link
          href="/chatbot/logs"
          className="px-3 py-1.5 text-xs rounded-md bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
        >
          チャットログ →
        </Link>
      </div>

      {showAdd && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">名前（一意キー）</label>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="例: additional_context"
              className="w-full text-sm border border-gray-200 rounded px-3 py-2"
            />
          </div>
          <div className="mb-3">
            <label className="block text-xs font-medium text-gray-500 mb-1">内容</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={6}
              className="w-full text-sm border border-gray-200 rounded px-3 py-2 font-mono"
              placeholder="プロンプト内容を入力..."
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={addPrompt}
              disabled={saving}
              className="px-3 py-1.5 text-xs rounded-md bg-brand-gold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "保存中..." : "追加"}
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewName(""); setNewContent(""); }}
              className="px-3 py-1.5 text-xs rounded-md bg-gray-200 text-gray-600"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-48">名前</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-20">有効</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 w-16">Ver</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 w-40">更新日時</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">内容プレビュー</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((prompt) => (
              <tr key={prompt.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-xs font-medium text-gray-900 font-mono">{prompt.name}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleActive(prompt)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${
                      prompt.is_active ? "bg-brand-gold" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        prompt.is_active ? "left-[18px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 text-center tabular-nums">v{prompt.version}</td>
                <td className="px-4 py-3 text-xs text-gray-400">{formatDate(prompt.updated_at)}</td>
                <td className="px-4 py-3 text-xs text-gray-500 truncate max-w-xs">
                  {prompt.content.slice(0, 80)}…
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => startEdit(prompt)}
                    className="text-[10px] px-2 py-1 text-brand-gold hover:bg-brand-cream rounded"
                  >
                    編集
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3">{prompts.length} 件</p>

      {/* Edit modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">
                プロンプト編集: {prompts.find((p) => p.id === editingId)?.name}
              </h2>
              <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 text-lg">×</button>
            </div>
            <div className="p-5 flex-1 overflow-auto">
              <textarea
                value={editForm.content ?? ""}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={20}
                className="w-full text-sm border border-gray-200 rounded px-3 py-2 font-mono leading-relaxed resize-y"
              />
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex gap-2 justify-end">
              <button
                onClick={cancelEdit}
                className="px-3 py-1.5 text-xs rounded-md bg-gray-200 text-gray-600"
              >
                キャンセル
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-4 py-1.5 text-xs rounded-md bg-brand-gold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "保存中..." : "保存（version +1）"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
