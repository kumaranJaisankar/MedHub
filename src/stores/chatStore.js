import { create } from "zustand";

const mockConversations = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "👩‍⚕️",
    online: true,
    typing: false,
    lastMessage: "That sounds good, let me know when you're free.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 0,
    messages: [
      {
        id: "1",
        sender: "Dr. Sarah Chen",
        content: "Hi, how are you doing?",
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        isMine: false,
      },
      {
        id: "2",
        sender: "demo_user",
        content: "Good! I wanted to chat about the case we discussed.",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        isMine: true,
      },
      {
        id: "3",
        sender: "Dr. Sarah Chen",
        content: "That sounds good, let me know when you're free.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isMine: false,
      },
    ],
  },
  {
    id: "2",
    name: "Medical Students Group",
    avatar: "👥",
    online: true,
    typing: true,
    lastMessage: "Emma: Anyone free for study session later?",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    unreadCount: 3,
    isGroup: true,
    members: ["Emma", "Mike", "Lisa"],
    messages: [
      {
        id: "1",
        sender: "Mike",
        content: "Hey everyone!",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isMine: false,
      },
      {
        id: "2",
        sender: "Emma",
        content: "Anyone free for study session later?",
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
        isMine: false,
      },
    ],
  },
];

export const useChatStore = create((set, get) => ({
  conversations: mockConversations,
  selectedConversation: null,
  searchTerm: "",

  setSelectedConversation: (id) => set({ selectedConversation: id }),
  setSearchTerm: (term) => set({ searchTerm: term }),

  getConversations: () => {
    const { conversations, searchTerm } = get();
    if (!searchTerm) return conversations;
    return conversations.filter((conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  },

  getSelectedConversation: () => {
    const { conversations, selectedConversation } = get();
    return conversations.find((c) => c.id === selectedConversation);
  },

  sendMessage: (conversationId, content) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Date.now().toString(),
                  sender: "demo_user",
                  content,
                  timestamp: new Date(),
                  isMine: true,
                },
              ],
              lastMessage: content,
              timestamp: new Date(),
            }
          : conv,
      ),
    }));
  },
}));
