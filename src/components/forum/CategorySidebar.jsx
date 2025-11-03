"use client";

import { useForumStore } from "@/stores/forumStore";

export function CategorySidebar() {
  const categories = useForumStore((state) => state.categories);
  const selectedCategory = useForumStore((state) => state.selectedCategory);
  const setSelectedCategory = useForumStore(
    (state) => state.setSelectedCategory,
  );

  return (
    <aside className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 h-fit sticky top-24">
      <h3 className="font-bold text-lg text-slate-900 dark:text-slate-50 mb-4">
        Categories
      </h3>
      <nav className="space-y-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full text-left px-4 py-2 rounded transition text-sm font-medium ${
            selectedCategory === null
              ? "bg-blue-500 text-white"
              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`w-full text-left px-4 py-2 rounded transition text-sm font-medium flex items-center gap-3 ${
              selectedCategory === category.name
                ? "bg-blue-500 text-white"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="truncate">{category.name}</div>
              <div className="text-xs opacity-75">
                {category.postCount} posts
              </div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
