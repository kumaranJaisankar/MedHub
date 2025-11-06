"use client";

import { useState, useMemo } from "react";
import { useForumStore } from "@/stores/forumStore";
import { PostCard } from "@/components/forum/PostCard";
import { Search as SearchIcon, Filter } from "lucide-react";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

const SearchPage = () => {
  const posts = useForumStore((state) => state.posts);
  const categories = useForumStore((state) => state.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("relevant");

  const searchResults = useMemo(() => {
    let results = posts;

    // Filter by search term
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      results = results.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter((post) => post.category === selectedCategory);
    }

    // Sort
    if (sortBy === "recent") {
      results.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "popular") {
      results.sort((a, b) => b.views - a.views);
    } else if (sortBy === "trending") {
      results.sort((a, b) => b.likes - a.likes);
    }

    return results;
  }, [posts, searchTerm, selectedCategory, sortBy]);

  return (
    <ProtectedRoute>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-8 pb-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Search Discussions
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Find answers, resources, and connect with experts
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 mb-8">
            <div className="relative mb-4">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, content, or tags..."
                className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                Results {searchTerm && `for "${searchTerm}"`}
              </h2>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {searchResults.length} found
              </span>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                  No results found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>💡 Tips:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Check your spelling and try different keywords</li>
                    <li>Try more general terms</li>
                    <li>Browse categories to explore topics</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};
export default SearchPage;
