"use client";

import { useState, useEffect, useCallback } from "react";

type Note = {
  id: string;
  author: string;
  body: string;
  created_at: string;
};

export function NotesSection({ applicationId }: { applicationId: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");

  const fetchNotes = useCallback(async () => {
    const res = await fetch(`/api/recruit/${applicationId}/notes`);
    if (res.ok) setNotes(await res.json());
  }, [applicationId]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  async function handleAdd() {
    if (!body.trim() || !author.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/recruit/${applicationId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, body }),
    });
    setSaving(false);
    if (res.ok) {
      setBody("");
      fetchNotes();
    } else {
      alert("保存に失敗しました");
    }
  }

  async function handleDelete(noteId: string) {
    if (!confirm("このメモを削除しますか？")) return;
    const res = await fetch(`/api/recruit/${applicationId}/notes/${noteId}`, { method: "DELETE" });
    if (res.ok) fetchNotes();
    else alert("削除に失敗しました");
  }

  async function handleUpdate(noteId: string) {
    if (!editBody.trim()) return;
    const res = await fetch(`/api/recruit/${applicationId}/notes/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: editBody }),
    });
    if (res.ok) {
      setEditingId(null);
      setEditBody("");
      fetchNotes();
    } else {
      alert("更新に失敗しました");
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
      <p className="text-xs font-medium text-gray-500 mb-3">メモ</p>

      {/* 入力欄 */}
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="投稿者名"
            className="w-32 text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-700"
          />
        </div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="メモを入力..."
          rows={3}
          className="w-full text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-700 resize-y leading-relaxed"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={handleAdd}
            disabled={saving || !body.trim() || !author.trim()}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "追加中..." : "追加"}
          </button>
        </div>
      </div>

      {/* メモ一覧 */}
      {notes.length === 0 ? (
        <p className="text-xs text-gray-400">まだメモはありません</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id} className="border border-gray-100 rounded-lg p-3">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-[11px] text-gray-400">{formatDate(n.created_at)}</span>
                <span className="text-[11px] text-gray-600 font-medium">{n.author}</span>
                <div className="ml-auto flex gap-1.5">
                  <button
                    onClick={() => { setEditingId(n.id); setEditBody(n.body); }}
                    className="px-2 py-0.5 text-[10px] rounded border border-gray-200 text-gray-400 hover:text-blue-500 hover:border-blue-300 transition-colors"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="px-2 py-0.5 text-[10px] rounded border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>

              {editingId === n.id ? (
                <div>
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={3}
                    className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 resize-y leading-relaxed"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end mt-1.5">
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 text-xs text-gray-400 hover:text-gray-600">取消</button>
                    <button onClick={() => handleUpdate(n.id)} className="px-3 py-1 text-xs bg-gray-900 text-white rounded hover:bg-gray-700">保存</button>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{n.body}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
