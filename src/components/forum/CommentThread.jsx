"use client";

import { Heart } from "lucide-react";
import { useForumStore } from "@/stores/forumStore";
import CommentForm from "./CommentForm";

export function CommentThread({ postId }) {
  const comments = useForumStore((state) => state.getCommentsByPostId(postId));
  const toggleCommentLike = useForumStore((state) => state.toggleCommentLike);
  const addComment = useForumStore((state) => state.addComment);

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

  const handleAddComment = (commentData) => {
    addComment(postId, commentData);
  };

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
              >
                {/* Comment Header */}
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-lg">
                    {comment.author.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-50">
                        {comment.author.name}
                      </h4>
                      {comment.anonymous && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                          Anonymous
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {comment.author.expertise}
                      </p>
                      <span className="text-xs text-slate-400">•</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">
                  {comment.content}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleCommentLike(postId, comment.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 transition hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                  >
                    <Heart
                      size={16}
                      fill={comment.liked ? "currentColor" : "none"}
                    />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-600 dark:bg-slate-900/50">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Comment Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-50">
          Add Your Comment
        </h4>
        <CommentForm postId={postId} onCommentAdded={handleAddComment} />
      </div>
    </div>
  );
}
