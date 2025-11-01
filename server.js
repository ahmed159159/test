import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // يخلي index.html يفتح تلقائيًا

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`
    },
    body: JSON.stringify({
      model: "fireworks/gpt-oss-20b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512
    })
  });
  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => console.log("✅ Server running"));
