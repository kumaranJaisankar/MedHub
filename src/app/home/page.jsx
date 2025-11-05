"use client";

import { useState, useEffect } from "react";
import { useForumStore } from "@/stores/forumStore";
import { PostCard } from "@/components/forum/PostCard";
import { CreatePostModal } from "@/components/forum/CreatePostModal";
import { MessageCircle, Users, TrendingUp, ArrowRight } from "lucide-react";
import useUser from "@/utils/useUser";

export default function HomePage() {
  const { data: user, loading } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const posts = useForumStore((state) => state.posts);
  const categories = useForumStore((state) => state.categories);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mb-4 inline-block rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
            <span className="text-4xl">⏳</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Get trending posts
  const trendingPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-blue-600 py-20 text-white dark:from-blue-900 dark:via-teal-900 dark:to-blue-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Left */}
            <div>
              <h1 className="mb-4 text-5xl font-bold leading-tight">
                Connect, Learn & Share Medical Knowledge
              </h1>
              <p className="mb-8 text-lg text-blue-100">
                A professional community for doctors, medical students, and
                healthcare professionals to discuss clinical cases, share
                insights, and support each other.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-slate-100"
                >
                  Start a Discussion
                </button>
                <a
                  href="/forums"
                  className="flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Explore Forums
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Right - Stats */}
            <div className="hidden grid-cols-2 gap-6 md:grid">
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">{posts.length}</div>
                <p className="text-blue-100">Active Discussions</p>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">
                  {categories.length}
                </div>
                <p className="text-blue-100">Medical Categories</p>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">2.5K+</div>
                <p className="text-blue-100">Community Members</p>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="mb-2 text-4xl font-bold">24/7</div>
                <p className="text-blue-100">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-slate-50">
            Why Join MedHub?
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <MessageCircle
                  className="text-blue-600 dark:text-blue-400"
                  size={24}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                Real-Time Discussions
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Participate in live discussions and get immediate feedback from
                experienced healthcare professionals.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <Users className="text-teal-600 dark:text-teal-400" size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                Anonymous Posting
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Ask sensitive questions or share experiences anonymously while
                maintaining privacy and safety.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <TrendingUp
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-50">
                Evidence-Based Content
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Access curated medical knowledge from verified healthcare
                professionals and experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
              Trending Discussions
            </h2>
            <a
              href="/forums"
              className="flex items-center gap-2 font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View All
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="space-y-4">
            {trendingPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-50">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/forums?category=${category.id}`}
                className="rounded-lg border border-slate-200 bg-white p-4 text-center transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-2 text-4xl">{category.icon}</div>
                <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">
                  {category.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {category.postCount} posts
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-500 py-16 dark:from-blue-900 dark:to-teal-900">
        <div className="mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold">Ready to Connect?</h2>
          <p className="mb-8 text-lg text-blue-100">
            Join thousands of healthcare professionals sharing knowledge and
            supporting each other.
          </p>
          <a
            href="/forums"
            className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition hover:bg-slate-100"
          >
            Explore the Community
          </a>
        </div>
      </section>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
