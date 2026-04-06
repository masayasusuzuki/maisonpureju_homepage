"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function BlogDeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`「${title}」を削除しますか？この操作は取り消せません。`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/microcms/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("削除に失敗しました");
      router.refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : "削除に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs text-red-500 hover:underline disabled:opacity-50"
    >
      {loading ? "..." : "削除"}
    </button>
  );
}
