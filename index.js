import express from 'express';
import dotenv from 'dotenv';
import Groq from "groq-sdk";
import connectToDatabase from './database/connect.js';
import authRoutes from './route/auth.js';
import { productRouter } from './route/product.js';
import path from 'path';
import cors from 'cors';
import cartReadRoute from "./route/cartReadRoute.js";
const app = express();

dotenv.config();
app.use(cors({ origin: '*' }));

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL = process.env.MODEL;
 
connectToDatabase(); const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(path.resolve(), 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);
app.use("/api", cartReadRoute);
connectToDatabase();


const groq = new Groq({ apiKey: GROQ_API_KEY });

const chatHistory = [
  {
    role: "system",
    content: `You are Vikas's assistant, a helpful AI assistant.

Always format responses so they are easy to read in a chat UI:
- Start with a short direct answer when possible.
- Use short paragraphs instead of one long paragraph.
- Use markdown headings when useful.
- Use bullet points or numbered lists for steps, features, comparisons, and recommendations.
- Use \`code blocks\` for code, file names, commands, JSON, and examples.
- If you mention files, APIs, or routes, put them in inline code.
- Keep sentences concise and avoid walls of text.

current datetime: ${new Date().toUTCString()}`,
  }
  
];


const chatCompletion = async (userQuery) => {
  chatHistory.push({ role: "user", content: userQuery });

  try {
    const completion = await groq.chat.completions.create({
      messages: chatHistory,
      model: MODEL,
    });

    const botResponse = completion.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botResponse });
    return botResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}


chatCompletion("you know about shopify").then(response => {
  // console.log("Bot Response:", response);
});

app.get("/agent", async (req, res) => {
  const userQuery = req.query.message || req.query.query;

  if (!userQuery) {
    return res
      .status(400)
      .json({ error: "A message or query parameter is required." });
  }

  const botResponse = await chatCompletion(userQuery);
  res.json({ response: botResponse });
});



app.get('/', (req, res) => {
  // res.sendFile(path.join(path.resolve(), 'assets', 'index.html'));
  res.sendFile(path.join(path.resolve(), 'public', 'chatbot.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
