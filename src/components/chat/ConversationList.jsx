"use client";

import { useChatStore } from "@/stores/chatStore";
import { Search } from "lucide-react";

export function ConversationList() {
  const conversations = useChatStore((state) => state.getConversations());
  const selectedConversation = useChatStore(
    (state) => state.selectedConversation,
  );
  const setSelectedConversation = useChatStore(
    (state) => state.setSelectedConversation,
  );
  const searchTerm = useChatStore((state) => state.searchTerm);
  const setSearchTerm = useChatStore((state) => state.setSearchTerm);

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "now";
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="font-bold text-lg text-slate-900 dark:text-slate-50 mb-4">
          Messages
        </h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <div className="space-y-2 p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full text-left px-3 py-3 rounded-lg transition ${
                  selectedConversation === conversation.id
                    ? "bg-blue-500/10 border border-blue-500/20"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-xl">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-slate-900 dark:text-slate-50 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 flex-shrink-0">
                        {formatTime(conversation.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                      {conversation.typing ? (
                        <span className="italic">typing...</span>
                      ) : (
                        conversation.lastMessage
                      )}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center p-4">
            <div>
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                No conversations
              </p>
              <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                Start a new chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
