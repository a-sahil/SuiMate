
import { useEffect, useRef } from 'react';

export const DashboardPreview = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    let animationFrame: number;
    let progress = 0;

    const animate = () => {
      progress += 0.02;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated line chart
      ctx.strokeStyle = '#00d4ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      const points = [];
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * canvas.width;
        const baseY = canvas.height * 0.6;
        const amplitude = 40;
        const y = baseY + Math.sin(i * 0.3 + progress) * amplitude;
        points.push({ x, y });
      }
      
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      
      ctx.stroke();
      
      // Add glow effect
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 10;
      ctx.stroke();
      
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <section className="section h-screen flex items-center px-8 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-6">
            Dashboard Preview
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real-time insights into your Sui blockchain portfolio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Overview */}
          <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 p-8">
            <h3 className="text-2xl font-semibold text-[#00d4ff] mb-6">Portfolio Overview</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Total Value</span>
                  <span className="text-2xl font-bold text-white">$45,678</span>
                </div>
                <div className="text-green-400 text-sm">↗ +23.5% this month</div>
              </div>

              <div className="h-48 bg-[#0a0a0f]/50 rounded-lg flex items-center justify-center border border-[#00d4ff]/10">
                <canvas ref={canvasRef} className="max-w-full h-auto" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#00d4ff]/5 rounded-lg border border-[#00d4ff]/20">
                  <div className="text-2xl font-bold text-[#00d4ff]">15</div>
                  <div className="text-sm text-gray-400">Active Tokens</div>
                </div>
                <div className="text-center p-4 bg-[#4fa8da]/5 rounded-lg border border-[#4fa8da]/20">
                  <div className="text-2xl font-bold text-[#4fa8da]">47</div>
                  <div className="text-sm text-gray-400">NFTs Owned</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 p-8">
            <h3 className="text-2xl font-semibold text-[#00d4ff] mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                { type: 'Send', amount: '-100 SUI', to: 'alice.sui', status: 'Confirmed' },
                { type: 'Receive', amount: '+250 SUI', from: 'bob.sui', status: 'Confirmed' },
                { type: 'Swap', amount: '50 SUI → 125 USDC', exchange: 'DEX', status: 'Pending' },
                { type: 'NFT Mint', amount: 'CryptoArt #1234', platform: 'SuiNFT', status: 'Confirmed' }
              ].map((tx, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#0a0a0f]/30 rounded-lg border border-[#00d4ff]/10 hover:border-[#00d4ff]/30 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      tx.status === 'Confirmed' ? 'bg-green-400' : 'bg-yellow-400'
                    } animate-pulse`} />
                    <div>
                      <div className="text-white font-medium">{tx.type}</div>
                      <div className="text-gray-400 text-sm">{tx.amount}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm ${
                      tx.status === 'Confirmed' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {tx.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
