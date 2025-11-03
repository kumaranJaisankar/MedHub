"use client";

import { useForumStore } from "@/stores/forumStore";
import { CommentThread } from "@/components/forum/CommentThread";
import { Heart, Bookmark, Share2, Eye } from "lucide-react";
import { useState } from "react";

export default function PostDetailPage({ params }) {
  const posts = useForumStore((state) => state.posts);
  const toggleLike = useForumStore((state) => state.toggleLike);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 pb-16 pt-8 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
              Post not found
            </h1>
            <a
              href="/forums"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to forums
            </a>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-slate-50 pb-16 pt-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <a
          href="/forums"
          className="mb-6 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back to Forums
        </a>

        {/* Post Container */}
        <article className="rounded-lg border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="mb-6 border-b border-slate-200 pb-6 dark:border-slate-800">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-2xl">
                  {post.author.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {post.author.name}
                    </h2>
                    {post.anonymous && (
                      <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                        Anonymous
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {post.author.expertise} • {formatDate(post.timestamp)}
                  </p>
                </div>
              </div>
              <span className="rounded bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-50">
              {post.title}
            </h1>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="mb-8 border-b border-slate-200 pb-8 dark:border-slate-800">
            <p className="leading-relaxed text-slate-700 dark:text-slate-300">
              {post.content}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap gap-6 border-b border-slate-200 pb-8 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <Eye size={18} />
              <span className="text-sm">{post.views} views</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="text-sm">{post.comments} comments</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <span className="text-sm">{post.bookmarks} bookmarks</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                post.liked
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Heart size={18} fill={post.liked ? "currentColor" : "none"} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition ${
                isBookmarked
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <Bookmark
                size={18}
                fill={isBookmarked ? "currentColor" : "none"}
              />
              <span>Bookmark</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-8">
          <CommentThread postId={params.id} />
        </div>
      </div>
    </div>
  );
}
