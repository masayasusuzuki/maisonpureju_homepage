"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type Application = {
  id: string;
  created_at: string;
  position: string;
  name: string;
  furigana: string;
  email: string;
  phone: string;
  status: string;
};

const POSITION_LABEL: Record<string, string> = {
  nurse:         "看護師",
  receptionist:  "受付カウンセラー",
  "pr-creator":  "広報/SNSクリエイター",
};

const STATUS_LABEL: Record<string, string> = {
  new:        "新着",
  reviewing:  "書類選考中",
  interview:  "面接調整中",
  offered:    "内定",
  rejected:   "不採用",
  withdrawn:  "辞退",
};

const STATUS_STYLE: Record<string, string> = {
  new:       "bg-amber-50 text-amber-700",
  reviewing: "bg-blue-50 text-blue-700",
  interview: "bg-purple-50 text-purple-700",
  offered:   "bg-green-50 text-green-700",
  rejected:  "bg-gray-100 text-gray-500",
  withdrawn: "bg-red-50 text-red-400",
};

export function ApplicationTable({ applications }: { applications: Application[] }) {
  const [positionFilter, setPositionFilter] = useState("すべて");
  const [statusFilter,   setStatusFilter]   = useState("すべて");
  const router = useRouter();

  const filtered = applications.filter((a) => {
    if (positionFilter !== "すべて" && a.position !== positionFilter) return false;
    if (statusFilter   !== "すべて" && a.status   !== statusFilter)   return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* 職種フィルター */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {["すべて", "nurse", "receptionist", "pr-creator"].map((v) => (
            <button
              key={v}
              onClick={() => setPositionFilter(v)}
              className={`px-4 py-1.5 text-sm transition-colors ${
                positionFilter === v
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {v === "すべて" ? "すべて" : POSITION_LABEL[v]}
            </button>
          ))}
        </div>

        {/* ステータスフィルター */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-700"
        >
          <option value="すべて">すべてのステータス</option>
          {Object.entries(STATUS_LABEL).map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>

        <span className="text-sm text-gray-400 ml-auto">{filtered.length}件表示</span>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">応募日</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-40">職種</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-32">氏名</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-56">メールアドレス</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">ステータス</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                  該当する応募はありません
                </td>
              </tr>
            )}
            {filtered.map((a) => (
              <tr
                key={a.id}
                onClick={() => router.push(`/recruit/${a.id}`)}
                className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {a.created_at.split("T")[0]}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {POSITION_LABEL[a.position] ?? a.position}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-900 font-medium">{a.name}</td>
                <td className="px-4 py-3 text-gray-500">{a.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${STATUS_STYLE[a.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {STATUS_LABEL[a.status] ?? a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
