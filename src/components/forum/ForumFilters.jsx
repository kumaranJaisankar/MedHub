"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useForumStore } from "@/stores/forumStore";

export function ForumFilters({ onNewPost }) {
  const [searchTerm, setSearchTerm] = useState("");
  const sortBy = useForumStore((state) => state.sortBy);
  const setSortBy = useForumStore((state) => state.setSortBy);

  const filterOptions = [
    { value: "recent", label: "Recent" },
    { value: "popular", label: "Popular" },
    { value: "trending", label: "Trending" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={onNewPost}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Post</span>
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={`px-4 py-2 rounded transition font-medium text-sm ${
              sortBy === option.value
                ? "bg-blue-500 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
