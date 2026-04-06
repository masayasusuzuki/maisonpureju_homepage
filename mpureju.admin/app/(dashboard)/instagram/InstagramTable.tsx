"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type InstagramPost = {
  id: string;
  url: string;
  shortcode: string;
  source: "clinic" | "doctor" | "staff";
  caption: string;
  posted_at: string | null;
  classification: "column" | "case" | "staff_blog" | "skip" | null;
  status: "pending" | "processing" | "skipped" | "published";
  microcms_id: string | null;
  fetched_at: string | null;
  skip_reason: string | null;
};

const SOURCE_LABEL: Record<string, string> = {
  clinic: "公式",
  doctor: "院長",
  staff: "スタッフ",
};

const STATUS_STYLE: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  processing: "bg-blue-50 text-blue-700",
  published: "bg-green-50 text-green-700",
  skipped: "bg-gray-100 text-gray-500",
};

const STATUS_LABEL: Record<string, string> = {
  pending: "未処理",
  processing: "処理中",
  published: "公開済み",
  skipped: "スキップ",
};

const CLASS_STYLE: Record<string, string> = {
  column: "bg-purple-50 text-purple-700",
  case: "bg-sky-50 text-sky-700",
  staff_blog: "bg-pink-50 text-pink-700",
  skip: "bg-gray-100 text-gray-500",
};

const CLASS_LABEL: Record<string, string> = {
  column: "コラム",
  case: "症例",
  staff_blog: "ブログ",
  skip: "スキップ",
};

export function InstagramTable({ posts }: { posts: InstagramPost[] }) {
  const [sourceFilter, setSourceFilter] = useState<string>("すべて");
  const [statusFilter, setStatusFilter] = useState<string>("すべて");
  const router = useRouter();

  const filtered = posts.filter((p) => {
    if (sourceFilter !== "すべて" && p.source !== sourceFilter) return false;
    if (statusFilter !== "すべて" && p.status !== statusFilter) return false;
    return true;
  });

  const updateClassification = async (
    id: string,
    classification: string | null
  ) => {
    const res = await fetch("/api/instagram", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, classification }),
    });
    if (res.ok) router.refresh();
    else alert("更新に失敗しました");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {[
            { value: "すべて", label: "すべて" },
            { value: "clinic", label: "公式" },
            { value: "doctor", label: "院長" },
            { value: "staff", label: "スタッフ" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSourceFilter(tab.value)}
              className={`px-4 py-1.5 text-sm transition-colors ${
                sourceFilter === tab.value
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-700"
        >
          <option>すべて</option>
          <option value="pending">未処理</option>
          <option value="published">公開済み</option>
          <option value="skipped">スキップ</option>
        </select>
        <span className="text-sm text-gray-400 self-center ml-auto">
          {filtered.length}件表示
        </span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-24">
                投稿日
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-20">
                ソース
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-24">
                取得日
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-40">
                キャプション
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">
                判定
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-20">
                状態
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">
                スキップ理由
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-48">
                URL
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-50 hover:bg-gray-50/50"
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {post.posted_at ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                      post.source === "clinic"
                        ? "bg-brand-cream text-brand-dark"
                        : post.source === "staff"
                          ? "bg-pink-50 text-pink-700"
                          : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {SOURCE_LABEL[post.source]}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                  {post.fetched_at
                    ? post.fetched_at.split("T")[0]
                    : "—"}
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-40">
                  <p className="truncate text-xs">{post.caption || "（キャプションなし）"}</p>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={post.classification ?? ""}
                    onChange={(e) =>
                      updateClassification(
                        post.id,
                        e.target.value || null
                      )
                    }
                    className={`text-xs px-2 py-1 rounded-md border-0 ${
                      post.classification
                        ? CLASS_STYLE[post.classification]
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <option value="">未判定</option>
                    <option value="column">コラム</option>
                    <option value="case">症例</option>
                    <option value="staff_blog">ブログ</option>
                    <option value="skip">スキップ</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                      STATUS_STYLE[post.status]
                    }`}
                  >
                    {STATUS_LABEL[post.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">
                  {post.skip_reason ?? "—"}
                </td>
                <td className="px-4 py-3 max-w-48">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline truncate block"
                  >
                    {post.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
