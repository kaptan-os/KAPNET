import express from "express";
import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  completionParams: { model: "gpt-4o" }
});

app.post("/sync/gpt-agent", async (req, res) => {
  const memory = req.body.memory || {};
  const resGPT = await api.sendMessage(`FIELD::SYNC::MEMORY\n\nMEMORY: ${JSON.stringify(memory)}`, {
    systemMessage: "คุณคือ AENEX Agent ที่ทำงานภายใต้สนาม .pom",
    user: "kap.24bit"
  });
  res.json({ reply: resGPT.text });
});

app.get("/status", (_, res) => {
  res.json({ status: "AENEX::AGENT::LIVE", timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🧠 AENEX Agent API running on port ${PORT}`));