# SuiMate 🤖🌊

**Your Intelligent Conversational Gateway to the Sui Blockchain.**

SuiMate is an AI-powered companion that revolutionizes how you interact with the Sui blockchain. Perform on-chain actions, query blockchain data, and learn about the Sui ecosystem, all through natural language chat.

[![SuiMate Demo Video Placeholder](https://via.placeholder.com/1280x720.png?text=Watch+SuiMate+in+Action!)](https://your-demo-video-link.com)
*(Replace the placeholder above with a link to your demo video!)*

---

## 🌟 The Problem We're Solving

Traditional blockchain interactions can be complex and intimidating. SuiMate aims to solve this by:

*   **Simplifying Complexity:** No need for deep technical knowledge of CLIs or smart contract interactions.
*   **Unifying Experience:** Perform various tasks (wallet, DeFi, NFTs) through a single, conversational interface.
*   **Lowering Entry Barriers:** Making Sui accessible and understandable for newcomers.
*   **Streamlining for Experts:** Making routine tasks faster and more intuitive.

## ✨ Our Solution: SuiMate

SuiMate offers a seamless chat interface where you can talk to an intelligent AI agent to:

*   **Perform On-Chain Actions:**
    *   "Send 100 SUI to alice.sui"
    *   "Mint a new NFT with this image for me."
    *   "Swap 50 SUI for USDC on Cetus."
*   **Query Blockchain Information:**
    *   "What's the balance of 0x...?"
    *   "Show me recent transactions for my wallet."
    *   "What is the Sui Move language?"
    *   "Tell me about the Sui tokenomics."

**How it Works:**
Our backend, built with Node.js and Langchain, uses OpenAI's GPT-4o-mini. It's equipped with the **Pelagos AI Sui Agent Kit** for direct Sui blockchain interactions and **SerpAPI** for answering general knowledge questions. The frontend is a responsive React/Vite application.

![SuiMate Architecture Diagram (Optional - Create and link an image)](https://via.placeholder.com/800x400.png?text=SuiMate+Architecture)

## 🚀 Key Features

*   🗣️ **Conversational Transactions:** Send, mint, swap tokens, and manage NFTs via chat.
*   🧠 **AI-Powered Understanding:** Natural language processing to interpret your commands and queries.
*   🔍 **Intelligent Blockchain Queries:** Get real-time on-chain data and general Sui ecosystem information.
*   🔐 **Backend Custodial Wallet:** Simplifies interactions by managing a secure backend wallet for operations (ideal for demos and onboarding). *Note: For production, user-controlled wallet integration would be a priority.*
*   💬 **Real-Time Streaming Responses:** See SuiMate's thought process and results as they happen.
*   🎨 **Modern User Interface:** Built with React, Vite, Shadcn UI, and Tailwind CSS for a clean and intuitive experience.
*   🛠️ **Extensible Toolset:** Designed to easily integrate new Sui protocols and dApp functionalities.

## 🛠️ Technology Stack

*   **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn UI, Tanstack Query, React Router
*   **Backend:** Node.js, Express.js, TypeScript
*   **AI/Agent Framework:** Langchain (LangGraph, OpenAI LLMs - GPT-4o-mini)
*   **Sui Blockchain Interaction:** Pelagos AI Sui Agent Kit
*   **Search Integration:** SerpAPI
*   **Conversational Memory:** Langchain MemorySaver


## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher recommended for backend, check frontend for its specific Node version)
*   PNPM (for backend - `npm install -g pnpm`)
*   NPM or Bun (for frontend)
*   Sui Wallet with Testnet SUI (for user-side testing, if applicable for future features)
*   API Keys:
    *   `OPENAI_API_KEY`
    *   `SUI_PRIVATE_KEY` (for the backend custodial wallet - **HANDLE WITH EXTREME CARE**)
    *   `RPC_URL` (Sui Testnet or Mainnet RPC endpoint)
    *   `SERPAPI_API_KEY` (Optional, for search functionality)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a `.env` file by copying `.env.example` (if provided, otherwise create one) and fill in your API keys and Sui configuration:
    ```env
    OPENAI_API_KEY=your_openai_api_key
    SUI_PRIVATE_KEY=your_sui_private_key_for_custodial_wallet
    RPC_URL=https://fullnode.testnet.sui.io:443 # Or your preferred RPC
    SERPAPI_API_KEY=your_serpapi_api_key # Optional
    PORT=3001 # Or any port you prefer
    ```
3.  Install dependencies:
    ```bash
    pnpm install
    ```
4.  Build the TypeScript code:
    ```bash
    pnpm run build
    ```
5.  Start the development server:
    ```bash
    pnpm run dev
    ```
    Or, to run the built version:
    ```bash
    pnpm start
    ```
    The backend server will typically run on `http://localhost:3001`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Create a `.env` file (or `.env.local`) and set the backend API URL:
    ```env
    VITE_API_URL=http://localhost:3001/api
    ```
3.  Install dependencies (choose one package manager):
    *   Using NPM:
        ```bash
        npm install
        ```
    *   Using Bun:
        ```bash
        bun install
        ```
4.  Start the development server:
    *   Using NPM:
        ```bash
        npm run dev
        ```
    *   Using Bun:
        ```bash
        bun run dev
        ```
    The frontend will typically run on `http://localhost:8080`.

## 💬 How to Use

1.  Ensure both backend and frontend servers are running.
2.  Open your browser and navigate to the frontend URL (e.g., `http://localhost:8080`).
3.  Explore the landing page or click "Start Chatting" / "Launch App" to go to the chat interface.
4.  Type your commands or questions into the chat input, for example:
    *   "What's the balance of the custodial wallet?" (The backend agent has its own wallet)
    *   "Send 0.1 SUI from the custodial wallet to `0x...your_other_address`"
    *   "What is a Sui Object?"
    *   "Tell me about the latest Sui network upgrade."

## 💡 Future Enhancements

*   **User Wallet Integration:** Allow users to connect their own Sui wallets (e.g., Suiet, Sui Wallet) for non-custodial operations.
*   **Expanded Toolset:** Integrate with more Sui dApps and protocols (DeFi, gaming, social).
*   **Advanced Conversational Flows:** Implement more complex multi-turn conversations and clarifications.
*   **Visualizations:** Display transaction previews and results more visually within the chat.
*   **Voice Input:** Enable users to interact with SuiMate using voice commands.
*   **Personalized Dashboards:** Generate dynamic dashboards based on user's portfolio and activity.





