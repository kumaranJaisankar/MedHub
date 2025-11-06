"use client";

import { useState } from "react";
import { useForumStore } from "@/stores/forumStore";
import { PostCard } from "@/components/forum/PostCard";
import { CategorySidebar } from "@/components/forum/CategorySidebar";
import { ForumFilters } from "@/components/forum/ForumFilters";
import { CreatePostModal } from "@/components/forum/CreatePostModal";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

export default function ForumsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const selectedCategory = useForumStore((state) => state.selectedCategory);
  const posts = useForumStore((state) => state.posts);
  const getSortedPosts = useForumStore((state) => state.getSortedPosts);

  const filteredPosts = selectedCategory
    ? getSortedPosts().filter((post) => post.category === selectedCategory)
    : getSortedPosts();

  return (
    <ProtectedRoute>
      <div className="bg-slate-50 dark:bg-slate-950  pt-8 pb-16">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Medical Discussion Forum
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Share knowledge, ask questions, and connect with healthcare
              professionals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <CategorySidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters and Search */}
              <ForumFilters onNewPost={() => setShowCreateModal(true)} />

              {/* Posts List */}
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-12 text-center">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      No posts found in this category yet.
                    </p>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Be the first to post!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <CreatePostModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
    </ProtectedRoute>
  );
}
