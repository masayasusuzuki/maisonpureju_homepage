"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "new",       label: "新着" },
  { value: "reviewing", label: "書類選考中" },
  { value: "interview", label: "面接調整中" },
  { value: "offered",   label: "内定" },
  { value: "rejected",  label: "不採用" },
  { value: "withdrawn", label: "辞退" },
];

export function StatusForm({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    const res = await fetch(`/api/recruit/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
    if (res.ok) {
      window.dispatchEvent(new Event("recruit-status-changed"));
      router.refresh();
    } else {
      alert("更新に失敗しました");
    }
  }

  return (
    <div className="flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="text-sm border border-gray-200 rounded-md px-3 py-2 text-gray-700"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <button
        onClick={handleSave}
        disabled={saving || status === currentStatus}
        className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? "保存中..." : "保存"}
      </button>
    </div>
  );
}
