
import { useState, useEffect } from 'react';

export const ChatDemo = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'What\'s my wallet balance?', timestamp: '12:34 PM' },
    { role: 'ai', content: '💰 Your current balance: 2,456.78 SUI ($12,234)', timestamp: '12:34 PM' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sampleConversations = [
    {
      user: 'Send 100 SUI to alice.sui',
      ai: '✅ Sending 100 SUI to alice.sui... Transaction confirmed! Hash: 0x1a2b3c...'
    },
    {
      user: 'Mint a new NFT',
      ai: '🎨 Creating your NFT... What image would you like to use?'
    },
    {
      user: 'Swap 50 SUI for USDC',
      ai: '💱 Best rate found: 1 SUI = 2.45 USDC. Confirm swap of 50 SUI for 122.5 USDC?'
    }
  ];

  const [currentDemo, setCurrentDemo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const conversation = sampleConversations[currentDemo];
        setMessages([
          { role: 'user', content: conversation.user, timestamp: '12:35 PM' },
          { role: 'ai', content: conversation.ai, timestamp: '12:35 PM' }
        ]);
        setIsTyping(false);
        setCurrentDemo((prev) => (prev + 1) % sampleConversations.length);
      }, 1500);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentDemo]);

  return (
    <section className="section h-screen flex items-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-6">
            Chat Interface Demo
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how natural conversation translates to blockchain actions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Chat Interface */}
          <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 p-6">
            <div className="flex items-center justify-between mb-6 border-b border-[#00d4ff]/20 pb-4">
              <h3 className="text-xl font-semibold text-[#00d4ff]">SuiMate Chat</h3>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Online</span>
              </div>
            </div>

            <div className="space-y-4 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00d4ff]/20">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] text-white'
                        : 'bg-[#0a0a0f]/60 border border-[#00d4ff]/20 text-gray-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-[#0a0a0f]/60 border border-[#00d4ff]/20 text-gray-100 max-w-xs px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-[#0a0a0f]/50 border border-[#00d4ff]/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff]/50 backdrop-blur-sm"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg hover:shadow-lg hover:shadow-[#00d4ff]/25 transition-all duration-300">
                Send
              </button>
            </div>
          </div>

          {/* Blockchain Visualization */}
          <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 p-6">
            <h3 className="text-xl font-semibold text-[#00d4ff] mb-6">Blockchain Actions</h3>
            
            <div className="space-y-6">
              {/* Transaction Flow */}
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Parse Command</div>
                      <div className="text-gray-400 text-sm">AI understands intent</div>
                    </div>
                  </div>
                  <div className="w-8 h-1 bg-gradient-to-r from-[#00d4ff] to-transparent animate-pulse"></div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Generate Transaction</div>
                      <div className="text-gray-400 text-sm">Smart contract interaction</div>
                    </div>
                  </div>
                  <div className="w-8 h-1 bg-gradient-to-r from-[#4fa8da] to-transparent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Blockchain Confirmation</div>
                      <div className="text-gray-400 text-sm">Transaction validated</div>
                    </div>
                  </div>
                  <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Live Network Status */}
              <div className="mt-8 p-4 bg-[#0a0a0f]/30 rounded-lg border border-[#00d4ff]/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Network Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Operational</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">TPS</div>
                    <div className="text-[#00d4ff] font-mono">2,847</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Gas Price</div>
                    <div className="text-[#4fa8da] font-mono">0.001 SUI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
