import Link from "next/link";
import { getContent } from "@/lib/microcms/client";
import { BlogForm } from "../../BlogForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;

  let post: Record<string, unknown> | null = null;
  try {
    post = await getContent<Record<string, unknown>>("blog", id);
  } catch {
    // not found
  }

  if (!post) {
    return (
      <div>
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; ブログ管理に戻る
        </Link>
        <p className="mt-4 text-gray-500">記事が見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; ブログ管理に戻る
        </Link>
        <h1 className="text-xl font-semibold text-gray-900 mt-2">
          ブログ記事を編集
        </h1>
        <p className="text-xs text-gray-400 mt-1">ID: {id}</p>
      </div>
      <BlogForm
        mode="edit"
        contentId={id}
        defaultValues={{
          title: (post.title as string) ?? "",
          slug: (post.slug as string) ?? "",
          author: (post.author as string) ?? "",
          category: (post.category as string[]) ?? [],
          tags: (post.tags as string) ?? "",
          body: (post.body as string) ?? "",
          instagram_url: (post.instagram_url as string) ?? "",
          published_at: (post.published_at as string) ?? (post.publishedAt as string) ?? "",
        }}
      />
    </div>
  );
}
