
import { HeroSection } from "@/components/HeroSection";
import { ChatDemo } from "@/components/ChatDemo";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative">
      <Navbar />
      
      {/* Cursor Spotlight Effect */}
      <div className="cursor-spotlight fixed pointer-events-none z-10"></div>
      
      <div className="pt-16">
        <HeroSection />
        <ChatDemo />
        
        {/* Dashboard Preview Section */}
        <DashboardPreview />
        
        {/* Features Section */}
        <section id="features" className="section py-20 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-8">
              Explore the Power of SuiMate
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 hover:shadow-2xl hover:shadow-[#00d4ff]/25 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  Natural Language Interaction
                </h3>
                <p className="text-gray-300">
                  Interact with the Sui blockchain using simple, human-readable commands.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 hover:shadow-2xl hover:shadow-[#00d4ff]/25 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  AI-Powered Assistance
                </h3>
                <p className="text-gray-300">
                  Our AI companion understands your intent and guides you through blockchain actions.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 hover:shadow-2xl hover:shadow-[#00d4ff]/25 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  Seamless Blockchain Operations
                </h3>
                <p className="text-gray-300">
                  Effortlessly send tokens, mint NFTs, swap assets, and query blockchain data.
                </p>
              </div>

              {/* Feature 4 - New Feature */}
              <div className="p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20 hover:shadow-2xl hover:shadow-[#00d4ff]/25 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  Query Sui Blockchain
                </h3>
                <p className="text-gray-300">
                  Instantly access real-time blockchain data, transaction history, and network statistics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="section py-20 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent mb-8">
              How SuiMate Works
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Step 1 */}
              <div className="md:w-1/3 p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  1. Start a Conversation
                </h3>
                <p className="text-gray-300">
                  Begin by chatting with SuiMate, just like you would with any other AI assistant.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="md:w-1/3 p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  2. Express Your Intent
                </h3>
                <p className="text-gray-300">
                  Tell SuiMate what you want to do, such as "Send 100 SUI to Alice" or "Mint a new NFT."
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="md:w-1/3 p-6 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h3 className="text-2xl font-semibold mb-4 text-[#00d4ff]">
                  3. Confirm and Execute
                </h3>
                <p className="text-gray-300">
                  SuiMate translates your request into blockchain actions, which you can then confirm and execute.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="section py-20 px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#4fa8da] bg-clip-text text-transparent text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="p-4 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h4 className="text-xl font-semibold mb-2 text-[#00d4ff]">
                  What is SuiMate?
                </h4>
                <p className="text-gray-300">
                  SuiMate is an AI-powered companion that allows you to interact with the Sui blockchain using natural language.
                </p>
              </div>
              
              {/* Question 2 */}
              <div className="p-4 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h4 className="text-xl font-semibold mb-2 text-[#00d4ff]">
                  What can I do with SuiMate?
                </h4>
                <p className="text-gray-300">
                  You can use SuiMate to send tokens, mint NFTs, swap assets, query blockchain data, and much more.
                </p>
              </div>
              
              {/* Question 3 */}
              <div className="p-4 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h4 className="text-xl font-semibold mb-2 text-[#00d4ff]">
                  Is SuiMate secure?
                </h4>
                <p className="text-gray-300">
                  Yes, SuiMate uses secure protocols to ensure the safety of your transactions and data.
                </p>
              </div>

              {/* Question 4 */}
              <div className="p-4 bg-[#1a1a2e]/80 backdrop-blur-md rounded-xl border border-[#00d4ff]/20">
                <h4 className="text-xl font-semibold mb-2 text-[#00d4ff]">
                  How do I query blockchain data?
                </h4>
                <p className="text-gray-300">
                  Simply ask SuiMate to "query the blockchain" or "show me network stats" and it will fetch real-time data for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SuiMate. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
