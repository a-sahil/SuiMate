// src/pages/Chat.tsx

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { ChatHistory } from '@/components/ChatHistory';

interface Message {
  id: string | number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm SuiMate, your Sui blockchain companion. I can help you with wallet operations, NFT minting, token swaps, and blockchain queries. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('initial-chat'); // Used for UI/history list
  const [currentThreadId, setCurrentThreadId] = useState<string>(`SuiMate-Thread-${Date.now()}`); // For Langchain memory
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup EventSource on component unmount or when a new chat is started
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [currentThreadId]); // Re-run if threadId changes, implying a new "session"

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Add user message to local state
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    // Prepare messages for LangChain: current input as HumanMessage
    // The backend's MemorySaver will handle fetching/saving history based on thread_id
    const langchainPayload = {
        messages: [{ role: 'user', content: currentInput }],
        thread_id: currentThreadId,
    };

    let botResponseText = '';
    let partialBotMessageId: string | number | null = null;

    try {
        const response = await fetch(`http://localhost:3001/api/chat`, { // Or '/api/chat' if using Vite proxy
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(langchainPayload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        if (!response.body) {
            throw new Error("Response body is null");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                setIsTyping(false);
                if (partialBotMessageId && botResponseText.trim() === '') {
                     // If a bot message shell was created but no content was added
                    setMessages(prev => prev.filter(m => m.id !== partialBotMessageId));
                }
                break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const eventMessages = chunk.split('\n\n').filter(msg => msg.trim() !== '');

            for (const eventMessage of eventMessages) {
                if (eventMessage.startsWith('data: ')) {
                    const jsonData = eventMessage.substring(6);
                    try {
                        const parsedData = JSON.parse(jsonData);

                        if (parsedData.event === "end_of_stream") {
                            setIsTyping(false);
                            if (partialBotMessageId && botResponseText.trim() === '') {
                                setMessages(prev => prev.filter(m => m.id !== partialBotMessageId));
                            }
                            reader.cancel();
                            return;
                        }
                        
                        if (parsedData.error) {
                            console.error("Stream error from backend:", parsedData.error);
                            botResponseText += `\nError: ${parsedData.error}`;
                            // Update or finalize the message with the error
                            if (partialBotMessageId) {
                                setMessages(prev => prev.map(msg =>
                                    msg.id === partialBotMessageId ? { ...msg, text: botResponseText } : msg
                                ));
                            } else {
                                 const errorBotMsg: Message = {
                                    id: `msg-${Date.now()}-bot-error`,
                                    text: `Error: ${parsedData.error}`,
                                    sender: 'bot',
                                    timestamp: new Date()
                                };
                                setMessages(prev => [...prev, errorBotMsg]);
                                partialBotMessageId = errorBotMsg.id;
                            }
                            setIsTyping(false);
                            reader.cancel();
                            return;
                        }


                        if (parsedData.content) {
                            botResponseText += parsedData.content;
                            if (partialBotMessageId === null) {
                                const newBotMessageShell: Message = {
                                    id: `msg-${Date.now()}-bot`,
                                    text: botResponseText,
                                    sender: 'bot',
                                    timestamp: new Date()
                                };
                                setMessages(prev => [...prev, newBotMessageShell]);
                                partialBotMessageId = newBotMessageShell.id;
                            } else {
                                setMessages(prev => prev.map(msg =>
                                    msg.id === partialBotMessageId ? { ...msg, text: botResponseText } : msg
                                ));
                            }
                        }
                    } catch (parseError) {
                        console.error("Failed to parse JSON from stream:", jsonData, parseError);
                        // Potentially handle malformed JSON if necessary
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error sending message or processing stream:", error);
        setIsTyping(false);
        const errorBotResponse: Message = {
          id: `msg-${Date.now()}-bot-catch`,
          text: `Sorry, I encountered an error: ${(error as Error).message}`,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorBotResponse]);
    }
  };

  const handleNewChat = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    const newChatSessionId = `chat-session-${Date.now()}`;
    const newLangChainThreadId = `SuiMate-Thread-${Date.now()}`;

    setCurrentChatId(newChatSessionId); // For UI history list
    setCurrentThreadId(newLangChainThreadId); // For LangChain memory

    setMessages([
      {
        id: 1,
        text: "New chat started! How can I assist you with the Sui blockchain?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setIsTyping(false);
  };

  const handleSelectChat = (selectedChatId: string) => {
    // This is a simplified version. In a real app:
    // 1. You'd fetch the history for 'selectedChatId'
    // 2. You'd fetch/set the corresponding LangChain 'thread_id' for 'selectedChatId'
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setCurrentChatId(selectedChatId);
    // For demo: assume selectedChatId can be part of a new thread_id or retrieve a stored one
    setCurrentThreadId(`SuiMate-Thread-Existing-${selectedChatId}`);
    setMessages([
      {
        id: 1,
        text: `Switched to chat ${selectedChatId}. History loading is not fully implemented in this demo. Previous messages would appear here.`,
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
     setIsTyping(false);
  };
  // Remove the old getBotResponse function
  // const getBotResponse = (userMessage: string) => { ... };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <Navbar />
      <div className="flex flex-1 pt-16">
        <ChatHistory
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onNewChat={handleNewChat}
        />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-[#4fa8da]'
                        : 'bg-gradient-to-r from-[#00d4ff] to-[#4fa8da]'
                    }`}>
                      {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-lg backdrop-blur-md ${
                      message.sender === 'user'
                        ? 'bg-[#4fa8da]/20 border border-[#4fa8da]/30'
                        : 'bg-[#1a1a2e]/80 border border-[#00d4ff]/20'
                    }`}>
                      <p className="text-white whitespace-pre-line">{message.text}</p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-3xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] flex items-center justify-center flex-shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="p-4 rounded-lg bg-[#1a1a2e]/80 border border-[#00d4ff]/20 backdrop-blur-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="border-t border-[#00d4ff]/20 bg-[#1a1a2e]/80 backdrop-blur-md p-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSendMessage} className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about Sui blockchain..."
                  className="flex-1 px-4 py-3 bg-[#0a0a0f]/80 border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff]/50 focus:shadow-lg focus:shadow-[#00d4ff]/10 transition-all duration-300"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00d4ff]/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Send size={20} />
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "What's my wallet balance?",
                  "Send 100 SUI to 0xabc...",
                  "Mint an NFT",
                  "Swap SUI for USDC"
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputMessage(suggestion)}
                    disabled={isTyping}
                    className="px-3 py-1 text-sm bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;