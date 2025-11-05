"use client";

import { useState } from "react";
import { ConversationList } from "@/components/chat/ConversationList";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { Plus } from "lucide-react";
import { ProtectedRoute } from "../../components/auth/ProtectedRoute";

export default function ChatPage() {
  const [showNewChat, setShowNewChat] = useState(false);

  return (
    <ProtectedRoute>
      <div className="h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 flex">
        {/* Sidebar - Conversations List */}
        <div className="w-full md:w-72 flex flex-col border-r border-slate-200 dark:border-slate-800">
          <ConversationList />
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowNewChat(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition font-medium"
            >
              <Plus size={18} />
              <span>New Chat</span>
            </button>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="hidden md:flex flex-1 flex-col">
          <ChatWindow />
        </div>

        {/* Mobile View - Chat Window */}
        <div className="md:hidden absolute inset-0 z-40">
          <ChatWindow />
        </div>
      </div>
    </ProtectedRoute>
  );
}
