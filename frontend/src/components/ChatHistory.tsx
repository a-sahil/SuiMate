
import { useState } from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage: string;
}

interface ChatHistoryProps {
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export const ChatHistory = ({ currentChatId, onSelectChat, onNewChat }: ChatHistoryProps) => {
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Wallet Balance Check',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      lastMessage: 'Your current balance: 2,456.78 SUI'
    },
    {
      id: '2',
      title: 'NFT Minting',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      lastMessage: 'NFT minted successfully!'
    },
    {
      id: '3',
      title: 'Token Swap',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      lastMessage: 'Swapped 50 SUI for 122.5 USDC'
    }
  ]);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="w-80 bg-[#1a1a2e]/80 backdrop-blur-md border-r border-[#00d4ff]/20 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#00d4ff]/20">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300"
        >
          <Plus size={20} />
          <span>New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Recent Chats</h3>
        {chatSessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectChat(session.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
              currentChatId === session.id
                ? 'bg-[#00d4ff]/20 border border-[#00d4ff]/30'
                : 'bg-[#0a0a0f]/50 hover:bg-[#00d4ff]/10 border border-transparent'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <MessageSquare size={14} className="text-[#00d4ff] flex-shrink-0" />
                  <h4 className="text-sm font-medium text-white truncate">
                    {session.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 truncate mb-1">
                  {session.lastMessage}
                </p>
                <span className="text-xs text-gray-500">
                  {formatTime(session.timestamp)}
                </span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all duration-200">
                <Trash2 size={12} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
