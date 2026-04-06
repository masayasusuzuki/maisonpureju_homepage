"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORIES = [
  "施術レポート",
  "美容コラム",
  "お知らせ",
  "スタッフブログ",
  "キャンペーン",
];

type BlogFormData = {
  title: string;
  slug: string;
  author: string;
  category: string[];
  tags: string;
  body: string;
  instagram_url: string;
  published_at: string;
};

type Props = {
  mode: "create" | "edit";
  contentId?: string;
  defaultValues?: Partial<BlogFormData>;
};

export function BlogForm({ mode, contentId, defaultValues }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<BlogFormData>({
    title: defaultValues?.title ?? "",
    slug: defaultValues?.slug ?? "",
    author: defaultValues?.author ?? "",
    category: defaultValues?.category ?? [],
    tags: defaultValues?.tags ?? "",
    body: defaultValues?.body ?? "",
    instagram_url: defaultValues?.instagram_url ?? "",
    published_at: defaultValues?.published_at
      ? defaultValues.published_at.split("T")[0]
      : new Date().toISOString().split("T")[0],
  });

  const updateField = <K extends keyof BlogFormData>(
    key: K,
    value: BlogFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("タイトルは必須です");
      return;
    }

    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = {
      title: form.title,
      slug: form.slug || undefined,
      author: form.author || undefined,
      category: form.category.length > 0 ? form.category : undefined,
      tags: form.tags || undefined,
      body: form.body,
      instagram_url: form.instagram_url || undefined,
      published_at: form.published_at
        ? `${form.published_at}T00:00:00.000Z`
        : undefined,
    };

    // Remove undefined values
    for (const key of Object.keys(payload)) {
      if (payload[key] === undefined) delete payload[key];
    }

    try {
      const url =
        mode === "edit"
          ? `/api/microcms/blog/${contentId}`
          : "/api/microcms/blog";
      const method = mode === "edit" ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "保存に失敗しました");
      }

      router.push("/blog");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {error && (
        <div className="px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* タイトル */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="記事タイトルを入力"
        />
      </div>

      {/* slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          slug
        </label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => updateField("slug", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="url-friendly-slug"
        />
        <p className="text-xs text-gray-400 mt-1">
          空欄の場合、microCMSが自動生成します
        </p>
      </div>

      {/* 著者 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          著者
        </label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => updateField("author", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="著者名"
        />
      </div>

      {/* カテゴリ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          カテゴリ
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                form.category.includes(cat)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* タグ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          タグ
        </label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => updateField("tags", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="カンマ区切り（例: ヒアルロン酸,ボトックス）"
        />
      </div>

      {/* 公開日 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          公開日
        </label>
        <input
          type="date"
          value={form.published_at}
          onChange={(e) => updateField("published_at", e.target.value)}
          className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
      </div>

      {/* Instagram URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Instagram URL
        </label>
        <input
          type="url"
          value={form.instagram_url}
          onChange={(e) => updateField("instagram_url", e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          placeholder="https://www.instagram.com/p/..."
        />
      </div>

      {/* 本文 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          本文（HTML / リッチテキスト）
        </label>
        <textarea
          value={form.body}
          onChange={(e) => updateField("body", e.target.value)}
          rows={16}
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-y"
          placeholder="記事本文を入力（HTML可）"
        />
      </div>

      {/* 送信ボタン */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving
            ? "保存中..."
            : mode === "create"
              ? "記事を作成"
              : "変更を保存"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
