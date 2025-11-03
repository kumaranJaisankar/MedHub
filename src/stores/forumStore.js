import { create } from "zustand";

const mockPosts = [
  {
    id: "1",
    title: "Best practices for diagnosing hypertension in elderly patients",
    content:
      "I recently encountered a complex case where traditional BP measurements...",
    author: {
      id: "user1",
      name: "Dr. Sarah Chen",
      avatar: "👨‍⚕️",
      expertise: "Cardiology",
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: "Cardiology",
    tags: ["hypertension", "geriatric-care", "diagnosis"],
    views: 342,
    likes: 28,
    comments: 12,
    bookmarks: 5,
    liked: false,
    anonymous: false,
  },
  {
    id: "2",
    title: "Nutrition tips for type 2 diabetes management",
    content:
      "Anonymous post about dietary interventions for better blood sugar control...",
    author: {
      id: "anon",
      name: "Anonymous",
      avatar: "👤",
      expertise: "Nutrition",
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    category: "Nutrition",
    tags: ["diabetes", "nutrition", "management"],
    views: 521,
    likes: 64,
    comments: 31,
    bookmarks: 18,
    liked: false,
    anonymous: true,
  },
  {
    id: "3",
    title:
      "Mental health support during residency: Resources and coping strategies",
    content:
      "As a first-year resident, I struggled with burnout. Here are some techniques...",
    author: {
      id: "user3",
      name: "Dr. James Rodriguez",
      avatar: "👨‍⚕️",
      expertise: "Psychiatry",
    },
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    category: "Mental Health",
    tags: ["residency", "mental-health", "burnout", "wellness"],
    views: 712,
    likes: 89,
    comments: 45,
    bookmarks: 32,
    liked: false,
    anonymous: false,
  },
];

const mockCategories = [
  { id: "cardiology", name: "Cardiology", icon: "❤️", postCount: 156 },
  { id: "nutrition", name: "Nutrition", icon: "🥗", postCount: 98 },
  { id: "mental-health", name: "Mental Health", icon: "🧠", postCount: 142 },
  { id: "dermatology", name: "Dermatology", icon: "🔬", postCount: 87 },
  { id: "oncology", name: "Oncology", icon: "⚕️", postCount: 65 },
  { id: "pediatrics", name: "Pediatrics", icon: "👶", postCount: 124 },
  { id: "surgery", name: "Surgery", icon: "🏥", postCount: 176 },
  { id: "general", name: "General Discussion", icon: "💬", postCount: 234 },
];

const mockComments = {
  1: [
    {
      id: "c1",
      postId: "1",
      author: {
        id: "user2",
        name: "Dr. Michael Torres",
        avatar: "👨‍⚕️",
        expertise: "Cardiology",
      },
      content:
        "Great insights! I always recommend the 24-hour ambulatory BP monitor for accurate readings...",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 5,
      liked: false,
      anonymous: false,
    },
    {
      id: "c2",
      postId: "1",
      author: {
        id: "anon2",
        name: "Anonymous",
        avatar: "👤",
        expertise: "General",
      },
      content:
        "I found this approach helpful in my practice as well. Thank you for sharing!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      likes: 2,
      liked: false,
      anonymous: true,
    },
  ],
  2: [
    {
      id: "c3",
      postId: "2",
      author: {
        id: "user4",
        name: "Jessica Liu",
        avatar: "👩‍⚕️",
        expertise: "Nutrition",
      },
      content:
        "Excellent resources! I especially recommend the Mediterranean diet approach...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 8,
      liked: false,
      anonymous: false,
    },
  ],
  3: [
    {
      id: "c4",
      postId: "3",
      author: {
        id: "user5",
        name: "Alex Kumar",
        avatar: "👨‍⚕️",
        expertise: "Psychiatry",
      },
      content: "Really needed to hear this. Residency has been challenging...",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      likes: 12,
      liked: false,
      anonymous: false,
    },
  ],
};

export const useForumStore = create((set, get) => ({
  posts: mockPosts,
  categories: mockCategories,
  comments: mockComments,
  selectedCategory: null,
  sortBy: "recent",

  setPosts: (posts) => set({ posts }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortBy: (sort) => set({ sortBy: sort }),

  getPostsByCategory: (categoryId) => {
    if (!categoryId) return get().posts;
    return get().posts.filter((post) => post.category === categoryId);
  },

  getSortedPosts: () => {
    const { posts, sortBy } = get();
    const sorted = [...posts];
    if (sortBy === "recent") {
      return sorted.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortBy === "popular") {
      return sorted.sort((a, b) => b.views - a.views);
    } else if (sortBy === "trending") {
      return sorted.sort((a, b) => b.likes - a.likes);
    }
    return sorted;
  },

  toggleLike: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      ),
    }));
  },

  addPost: (post) => {
    set((state) => ({
      posts: [post, ...state.posts],
    }));
  },

  // Comment Management
  getCommentsByPostId: (postId) => {
    const comments = get().comments[postId] || [];
    return comments.sort((a, b) => b.timestamp - a.timestamp);
  },

  addComment: (postId, comment) => {
    const newComment = {
      id: `c${Date.now()}`,
      postId,
      timestamp: new Date(),
      likes: 0,
      liked: false,
      ...comment,
    };

    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), newComment],
      },
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      ),
    }));

    return newComment;
  },

  toggleCommentLike: (postId, commentId) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: (state.comments[postId] || []).map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                liked: !comment.liked,
                likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              }
            : comment
        ),
      },
    }));
  },

  deleteComment: (postId, commentId) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: (state.comments[postId] || []).filter(
          (c) => c.id !== commentId
        ),
      },
      posts: state.posts.map((post) =>
        post.id === postId && post.comments > 0
          ? { ...post, comments: post.comments - 1 }
          : post
      ),
    }));
  },
}));
