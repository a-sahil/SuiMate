
import { useState, useEffect } from 'react';

export const StatsSection = () => {
  const [counters, setCounters] = useState({
    transactions: 0,
    users: 0,
    uptime: 0,
    assets: 0
  });

  const finalValues = {
    transactions: 10000,
    users: 500,
    uptime: 99.9,
    assets: 2000000
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        transactions: Math.floor(finalValues.transactions * progress),
        users: Math.floor(finalValues.users * progress),
        uptime: parseFloat((finalValues.uptime * progress).toFixed(1)),
        assets: Math.floor(finalValues.assets * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCounters(finalValues);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      value: `${counters.transactions.toLocaleString()}+`,
      label: 'Transactions Processed',
      icon: '⚡',
      color: 'from-[#00d4ff] to-[#4fa8da]'
    },
    {
      value: `${counters.users.toLocaleString()}+`,
      label: 'Active Users',
      icon: '👥',
      color: 'from-[#4fa8da] to-[#00d4ff]'
    },
    {
      value: `${counters.uptime}%`,
      label: 'Uptime',
      icon: '🚀',
      color: 'from-green-400 to-[#00d4ff]'
    },
    {
      value: `$${(counters.assets / 1000000).toFixed(1)}M+`,
      label: 'Assets Managed',
      icon: '💎',
      color: 'from-purple-400 to-[#4fa8da]'
    }
  ];

  return (
    <section className="section h-screen flex items-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join a growing community of users who trust SuiMate with their blockchain interactions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 hover:border-[#00d4ff]/50 transition-all duration-500 hover:transform hover:scale-105 group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              
              <div className="text-gray-300 text-lg">
                {stat.label}
              </div>

              {/* Animated particles around stats */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-[#00d4ff] rounded-full opacity-30 animate-float"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#00d4ff] rounded-full animate-pulse"></div>
              <span>Enterprise security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
