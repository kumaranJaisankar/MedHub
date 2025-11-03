"use client";

import { useState } from "react";
import { useForumStore } from "@/stores/forumStore";
import { PostCard } from "@/components/forum/PostCard";
import {
  Edit,
  Mail,
  MapPin,
  Briefcase,
  Link as LinkIcon,
  BookOpen,
} from "lucide-react";

export default function ProfilePage() {
  const posts = useForumStore((state) => state.posts);
  const [activeTab, setActiveTab] = useState("posts");

  // Mock user data
  const user = {
    name: "Dr. Sarah Chen",
    expertise: "Cardiology",
    email: "sarah.chen@medical.edu",
    location: "San Francisco, CA",
    bio: "Cardiologist with 10+ years of clinical experience. Passionate about sharing knowledge and mentoring the next generation of healthcare professionals.",
    joinDate: "January 2023",
    website: "www.drchenshealth.com",
    avatar: "👩‍⚕️",
  };

  // User's posts
  const userPosts = posts.filter((post) => post.author.name === user.name);

  const stats = {
    posts: userPosts.length,
    comments: 47,
    likes: 128,
    bookmarks: 34,
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-6xl flex-shrink-0">
              {user.avatar}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                    {user.name}
                  </h1>
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {user.expertise}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                  <Edit size={18} />
                  <span>Edit Profile</span>
                </button>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {user.bio}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LinkIcon size={16} />
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.posts}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">Posts</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">
              {stats.comments}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Comments
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              {stats.likes}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Likes Received
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              {stats.bookmarks}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Bookmarks
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === "posts"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
              }`}
            >
              My Posts
            </button>
            <button
              onClick={() => setActiveTab("expertise")}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === "expertise"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
              }`}
            >
              Expertise
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === "activity"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "posts" && (
              <div>
                {userPosts.length > 0 ? (
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-600 dark:text-slate-400">
                      No posts yet
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "expertise" && (
              <div>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Briefcase
                        size={20}
                        className="text-blue-600 dark:text-blue-400"
                      />
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                        {user.expertise}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      10+ years of clinical experience
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen
                        size={20}
                        className="text-teal-600 dark:text-teal-400"
                      />
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                        Education
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      MD from Stanford University • Board Certified in
                      Cardiology
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl">💬</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      Replied to "Best practices for diagnosing hypertension"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      2 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl">📝</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      Created new post: "ECG interpretation tips for residents"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      1 day ago
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="text-2xl">❤️</div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">
                      Liked "Nutrition tips for type 2 diabetes management"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      3 days ago
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
