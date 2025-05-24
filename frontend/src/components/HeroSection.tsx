
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const [typedText, setTypedText] = useState('');
  const commands = [
    'Send 100 SUI to alice.sui',
    'What\'s my wallet balance?',
    'Mint a new NFT collection',
    'Swap 50 SUI for USDC'
  ];
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  useEffect(() => {
    const currentCommand = commands[currentCommandIndex];
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= currentCommand.length) {
        setTypedText(currentCommand.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentCommandIndex]);

  return (
    <section className="section relative h-screen flex items-center justify-center px-8">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-3d"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 40}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <div className="w-16 h-16 border border-[#00d4ff]/30 bg-gradient-to-br from-[#00d4ff]/10 to-transparent backdrop-blur-sm transform rotate-45 animate-spin-slow" />
          </div>
        ))}
      </div>

      <div className="text-center z-20 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent animate-fade-in">
          SuiMate
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Your Smart Sui Blockchain Companion
        </p>
        
        <p className="text-lg text-gray-400 mb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          Chat with AI to interact with Sui blockchain - No coding required
        </p>

        {/* Typing Animation */}
        <div className="mb-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <div className="bg-[#1a1a2e]/80 backdrop-blur-md rounded-lg p-4 max-w-md mx-auto border border-[#00d4ff]/20">
            <div className="text-[#00d4ff] text-sm mb-2">Try saying:</div>
            <div className="text-white font-mono">
              "{typedText}"
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '2s' }}>
          <Link 
            to="/chat"
            className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#00d4ff]/25 transform hover:scale-105 transition-all duration-300 hover:from-[#00d4ff]/90 hover:to-[#4fa8da]/90"
          >
            Start Chatting
          </Link>
          
          <button className="px-8 py-4 border border-[#00d4ff] rounded-lg font-semibold text-lg hover:bg-[#00d4ff]/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};
