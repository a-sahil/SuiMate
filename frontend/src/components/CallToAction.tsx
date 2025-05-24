
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
    }
  };

  return (
    <section className="section h-screen flex items-center px-8 py-20 relative overflow-hidden">
      {/* 3D Background Animation */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-3d"
            style={{
              left: `${10 + (i % 4) * 25}%`,
              top: `${10 + Math.floor(i / 4) * 30}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          >
            <div className="w-20 h-20 border-2 border-[#00d4ff]/20 bg-gradient-to-br from-[#00d4ff]/5 to-transparent backdrop-blur-sm transform rotate-45 animate-spin-slow" />
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-12">
          {/* Animated Sui Logo */}
          <div className="mx-auto w-24 h-24 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-[#0a0a0f] rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent">
                S
              </span>
            </div>
          </div>

          <h2 className="text-6xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-6 animate-fade-in">
            Experience the Future
          </h2>
          
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            of Blockchain Interaction
          </p>
          
          <p className="text-lg text-gray-400 mb-12 animate-fade-in" style={{ animationDelay: '1s' }}>
            Join thousands of users who are already chatting with their blockchain
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12 animate-fade-in" style={{ animationDelay: '1.5s' }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-[#1a1a2e]/80 backdrop-blur-md border border-[#00d4ff]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00d4ff]/50 focus:shadow-lg focus:shadow-[#00d4ff]/10 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-[#00d4ff]/25 transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
              >
                Get Early Access
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-md mx-auto mb-12 animate-fade-in">
            <div className="p-6 bg-green-400/10 border border-green-400/20 rounded-lg backdrop-blur-md">
              <div className="text-2xl mb-2">🎉</div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Welcome to the future!</h3>
              <p className="text-gray-300">We'll notify you when SuiMate is ready for you.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '2s' }}>
          <Link 
            to="/chat"
            className="px-10 py-5 bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] rounded-lg font-semibold text-xl hover:shadow-2xl hover:shadow-[#00d4ff]/25 transform hover:scale-105 transition-all duration-300"
          >
            Start Chatting Now
          </Link>
          
          <button className="px-10 py-5 border-2 border-[#00d4ff] rounded-lg font-semibold text-xl hover:bg-[#00d4ff]/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
            Schedule Demo
          </button>
        </div>

        {/* Social Proof */}
        <div className="mt-16 animate-fade-in" style={{ animationDelay: '2.5s' }}>
          <p className="text-gray-400 mb-6">Trusted by blockchain enthusiasts worldwide</p>
          
          <div className="flex justify-center items-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#00d4ff]/20 to-[#4fa8da]/20 rounded-full"></div>
              <span>Sui Foundation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#4fa8da]/20 to-purple-400/20 rounded-full"></div>
              <span>DeFi Alliance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400/20 to-[#00d4ff]/20 rounded-full"></div>
              <span>Web3 Builders</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
