import Link from "next/link";
import { BlogForm } from "../BlogForm";

export default function NewBlogPage() {
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
          新規ブログ記事
        </h1>
      </div>
      <BlogForm mode="create" />
    </div>
  );
}
