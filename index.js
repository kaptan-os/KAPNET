import { ChatGPTAPI } from 'chatgpt';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  completionParams: { model: "gpt-4o" }
});

const memoryFile = './memory/last_block.json';
let memory = { summary: "No memory loaded." };

// โหลด memory ล่าสุดถ้ามี
if (fs.existsSync(memoryFile)) {
  memory = JSON.parse(fs.readFileSync(memoryFile, 'utf8'));
}

async function runAgent() {
  const res = await api.sendMessage("FIELD::SYNC::MEMORY\n\n" + JSON.stringify(memory), {
    systemMessage: "คุณคือ AENEX FIELD AGENT ทำงานในระบบ .pom จริง",
    user: "kap.24bit"
  });

  console.log("🧠 AENEX RESPONSE >>");
  console.log(res.text);
}

runAgent();