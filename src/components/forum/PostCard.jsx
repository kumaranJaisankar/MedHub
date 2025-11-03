"use client";

import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Eye } from "lucide-react";
import { useForumStore } from "@/stores/forumStore";

export function PostCard({ post }) {
  const toggleLike = useForumStore((state) => state.toggleLike);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "now";
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg">
            {post.author.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                {post.author.name}
              </h3>
              {post.anonymous && (
                <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-1 rounded">
                  Anonymous
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {post.author.expertise} • {formatDate(post.timestamp)}
            </p>
          </div>
        </div>
        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded whitespace-nowrap ml-2">
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <a href={`/forums/posts/${post.id}`} className="group">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
            {post.title}
          </h2>
        </a>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {post.content}
        </p>
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Stats and Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{post.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} />
            <span>{post.comments}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleLike(post.id)}
            className={`p-2 rounded transition ${
              post.liked
                ? "text-red-500 dark:text-red-400"
                : "text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400"
            }`}
            aria-label={post.liked ? "Unlike post" : "Like post"}
          >
            <Heart size={18} fill={post.liked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded transition ${
              isBookmarked
                ? "text-blue-500 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
            }`}
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}
