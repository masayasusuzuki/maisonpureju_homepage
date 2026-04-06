import Link from "next/link";
import { listContents } from "@/lib/microcms/client";
import { BlogDeleteButton } from "./BlogDeleteButton";

type BlogPost = {
  id: string;
  title: string;
  author?: string;
  category?: string[];
  slug?: string;
  published_at?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let totalCount = 0;

  try {
    const data = await listContents<BlogPost>("blog", {
      limit: 100,
      orders: "-publishedAt",
    });
    posts = data.contents;
    totalCount = data.totalCount;
  } catch {
    // fallback
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">ブログ管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            microCMS &quot;blog&quot; エンドポイント &middot; {totalCount}件
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://mpureju.microcms.io/apis/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
          >
            microCMS
            <span className="text-xs">&#x2197;</span>
          </a>
          <Link
            href="/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            新規作成
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full table-fixed text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-[340px]">タイトル</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-20">著者</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-32">カテゴリ</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">公開日</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-36">slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500 w-28">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  記事がありません
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-900">
                    <p className="truncate font-medium">{post.title}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {post.author ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    {post.category && post.category.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {post.category.map((cat) => (
                          <span
                            key={cat}
                            className="inline-block text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {(post.published_at ?? post.publishedAt ?? post.createdAt).split("T")[0]}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    <p className="truncate">{post.slug ?? post.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blog/${post.id}/edit`}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        編集
                      </Link>
                      <BlogDeleteButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
