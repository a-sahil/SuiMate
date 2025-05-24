
export const FeaturesSection = () => {
  const features = [
    {
      icon: '🔄',
      title: 'Send & Receive Assets',
      description: 'Effortlessly transfer SUI and tokens with simple voice commands'
    },
    {
      icon: '🎨',
      title: 'Mint NFTs',
      description: 'Create and launch NFT collections without any technical knowledge'
    },
    {
      icon: '💱',
      title: 'Swap Tokens',
      description: 'Trade tokens seamlessly with real-time market rates'
    },
    {
      icon: '📊',
      title: 'Query Balances',
      description: 'Get instant portfolio insights and transaction history'
    }
  ];

  return (
    <section className="section h-screen flex items-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to interact with the Sui blockchain, powered by conversational AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-[#00d4ff]/20 bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md p-8 hover:border-[#00d4ff]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00d4ff]/10"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Floating icon */}
              <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-[#00d4ff] mb-4 group-hover:text-[#4fa8da] transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {feature.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/5 to-[#4fa8da]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Interactive Demo Bubbles */}
        <div className="mt-16 text-center">
          <div className="inline-flex space-x-4">
            <div className="bg-[#1a1a2e]/60 backdrop-blur-md rounded-full px-6 py-3 border border-[#00d4ff]/30 animate-pulse">
              <span className="text-sm text-gray-300">"Send 50 SUI to bob.sui"</span>
            </div>
            <div className="bg-[#00d4ff]/10 backdrop-blur-md rounded-full px-6 py-3 border border-[#00d4ff]/30 animate-pulse" style={{ animationDelay: '1s' }}>
              <span className="text-sm text-[#00d4ff]">✅ Transaction confirmed!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
