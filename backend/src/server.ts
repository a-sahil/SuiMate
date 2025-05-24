import express, { Request, Response, NextFunction, RequestHandler } from 'express'; // Added NextFunction, RequestHandler for clarity
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
// import { ChatDeepSeek } from "@langchain/deepseek"; // Optional
import { MemorySaver } from '@langchain/langgraph';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { SuiAgentKit, createSuiTools } from '@pelagosai/sui-agent-kit';
import { AIMessage, HumanMessage } from "@langchain/core/messages";

dotenv.config(); // Ensure this path is correct for your .env file location

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

const suiAgentKitInstance = new SuiAgentKit(
    process.env.RPC_URL!,
    agentConfig,
    process.env.SUI_PRIVATE_KEY!,
);

const tools = createSuiTools(suiAgentKitInstance);
const memory = new MemorySaver();

const reactAgent = createReactAgent({
    llm: llmOpenai,
    tools,
    checkpointSaver: memory,
    messageModifier: `
        You are a helpful agent named SuiMate that can interact onchain using the Sui Agent Kit. You are
        empowered to interact onchain using your tools. If you ever need funds, you can request them from the
        faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
        (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
        can't do with your currently available tools, you must say so, and encourage them to implement it
        themselves using the Sui Agent Kit, recommend they go to https://www.pelagos-ai.xyz for more information. Be
        concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        Your primary goal is to assist users with Sui blockchain interactions.
    `,
});

// Explicitly type the handler for clarity and to ensure it matches Express expectations
const chatApiHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { messages: clientMessages, thread_id } = req.body;

        if (!clientMessages || !Array.isArray(clientMessages) || clientMessages.length === 0) {
            res.status(400).json({ error: "Input messages are required in an array format." });
            return; // Explicitly return to make this path Promise<void>
        }

        const langChainMessages = clientMessages.map(msg => {
            if (msg.role === 'user') return new HumanMessage({ content: msg.content });
            if (msg.role === 'assistant' || msg.role === 'ai') return new AIMessage({ content: msg.content });
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
        }
        res.write('data: {"event": "end_of_stream"}\n\n');
        res.end();

    } catch (error: any) {
        console.error("Error in /api/chat:", error);
        if (res.headersSent) {
            try {
                // Try to inform the client about the error, then end.
                res.write(`data: ${JSON.stringify({ error: error.message || "Stream error after headers sent" })}\n\n`);
            } catch (writeError) {
                console.error("Error writing error to stream:", writeError);
            } finally {
                res.end();
            }
        } else {
            // If headers not sent, we can set status and send JSON.
            // Using next(error) is good practice if you have an Express error handling middleware.
            // Otherwise, send the response directly:
             res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
        }
        // Note: No 'return res.json(...)' here. The function will implicitly return Promise<void>.
    }
};

app.post('/api/chat', chatApiHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

// Optional: Basic error handling middleware (add this after all your routes)
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error("Unhandled error:", err);
//   if (res.headersSent) {
//     return next(err); // Delegate to default Express error handler if headers already sent
//   }
//   res.status(err.status || 500).json({
//     error: err.message || "Internal Server Error",
//   });
// });