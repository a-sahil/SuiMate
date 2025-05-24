import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
// import { ChatDeepSeek } from "@langchain/deepseek"; // Optional
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SuiAgentKit, createSuiTools } from '@pelagosai/sui-agent-kit';
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { SerpAPI } from "@langchain/community/tools/serpapi"; // Import SerpAPI tool

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const llmOpenai = new ChatOpenAI({
    temperature: 0.7,
    model: "gpt-4o-mini",
});

const agentConfig = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};

if (!process.env.RPC_URL || !process.env.SUI_PRIVATE_KEY || !process.env.OPENAI_API_KEY) {
    console.error("Missing critical environment variables for SuiAgentKit or OpenAI!");
    process.exit(1);
}

if (!process.env.SERPAPI_API_KEY) {
    console.warn("SERPAPI_API_KEY not found in environment variables. Search functionality will be disabled.");
}

const suiAgentKitInstance = new SuiAgentKit(
    process.env.RPC_URL!,
    agentConfig,
    process.env.SUI_PRIVATE_KEY!,
);

const suiTools = createSuiTools(suiAgentKitInstance);

// Initialize SerpAPI tool if the key exists
const searchTool = process.env.SERPAPI_API_KEY
  ? new SerpAPI(process.env.SERPAPI_API_KEY, {
      // You can customize location, hl, gl if needed
      // location: "Austin,Texas,United States",
      // hl: "en",
      // gl: "us",
    })
  : null;

// Prepare tools array
let allTools = [...suiTools];
if (searchTool) {
  // Customize the search tool's name and description if necessary, or rely on its default.
  // searchTool.name = "sui_blockchain_search"; // Optional: Rename for clarity if default 'search' is too generic
  // searchTool.description = "A search engine. Useful for answering general knowledge questions about the Sui blockchain, its concepts, how it works, its ecosystem, etc. Input should be a search query.";
  allTools = [...suiTools, searchTool as any];
  console.log("SerpAPI tool initialized and added.");
} else {
  console.log("SerpAPI tool not initialized due to missing API key.");
}


const memory = new MemorySaver();

const reactAgent = createReactAgent({
    llm: llmOpenai,
    tools: allTools,
    checkpointSaver: memory,
    messageModifier: `
        You are a helpful agent named SuiMate. You have tools for two main purposes:
        1. Sui Agent Kit Tools: For interacting directly with the Sui blockchain (e.g., sending tokens, checking specific balances, minting NFTs, swapping tokens). Use these for action-oriented requests or when the user asks to perform an on-chain operation. If you ever need funds for these actions, you can request them from the faucet or ask the user for their wallet details to receive funds.
        2. Search Tool: For answering general informational questions about the Sui blockchain, its concepts, how it works, its ecosystem, its history, comparisons to other blockchains, etc. (e.g., "What is Sui?", "How does Proof-of-Stake work on Sui?", "Tell me about the Sui tokenomics.", "Who created Sui?").

        When a user asks a question or gives a command:
        - If it's a direct command to perform an on-chain action (like send, mint, swap, check specific balance of an address), use your Sui Agent Kit tools.
        - If it's a general informational or knowledge-based question about Sui (e.g., "what is...", "how does... work", "tell me about...", "explain..."), use your Search tool to find the answer.
        - If you are unsure which tool to use, you can ask for clarification.
        - If there is a 5XX (internal) HTTP error code from any tool, ask the user to try again later.
        - If someone asks you to do something you absolutely cannot do with your currently available tools (both on-chain and search), you must say so, and encourage them to implement it themselves using the Sui Agent Kit, or recommend they go to https://www.pelagos-ai.xyz for more information.
        Be concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested. Your primary goal is to assist users with Sui blockchain interactions and provide information about Sui.
    `,
});

const chatApiHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { messages: clientMessages, thread_id } = req.body;

        if (!clientMessages || !Array.isArray(clientMessages) || clientMessages.length === 0) {
            res.status(400).json({ error: "Input messages are required in an array format." });
            return;
        }

        const langChainMessages = clientMessages.map(msg => {
            if (msg.role === 'user') return new HumanMessage({ content: msg.content });
            if (msg.role === 'assistant' || msg.role === 'ai') return new AIMessage({ content: msg.content });
            // Fallback for any other role, treat as human message
            return new HumanMessage({ content: String(msg.content) }); 
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        const stream = reactAgent.streamEvents(
            { messages: langChainMessages },
            {
                version: 'v2',
                configurable: {
                    thread_id: thread_id || 'SuiMate-Express-Thread-' + Date.now(),
                },
            }
        );

        for await (const event of stream) {
            if (event.event === 'on_chat_model_stream') {
                const chunk = event.data?.chunk;
                if (chunk && chunk.content) {
                    res.write(`data: ${JSON.stringify({ content: chunk.content })}\n\n`);
                }
            }
            // You can add more event handlers here if needed, e.g., for tool calls
            // if (event.event === 'on_tool_start') {
            //   console.log("Tool started:", event.name, event.data.input);
            //   res.write(`data: ${JSON.stringify({ type: "tool_start", name: event.name })}\n\n`);
            // }
            // if (event.event === 'on_tool_end') {
            //   console.log("Tool ended:", event.name, event.data.output);
            //   res.write(`data: ${JSON.stringify({ type: "tool_end", name: event.name, output: event.data.output })}\n\n`);
            // }
        }
        res.write('data: {"event": "end_of_stream"}\n\n'); // Signal end of stream
        res.end();

    } catch (error: any) {
        console.error("Error in /api/chat:", error);
        if (res.headersSent) {
            try {
                res.write(`data: ${JSON.stringify({ error: error.message || "Stream error after headers sent" })}\n\n`);
            } catch (writeError) {
                console.error("Error writing error to stream:", writeError);
            } finally {
                res.end();
            }
        } else {
             res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
        }
    }
};

app.post('/api/chat', chatApiHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});