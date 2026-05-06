import express from 'express';
import dotenv from 'dotenv';
import Groq from "groq-sdk";
import connectToDatabase from './database/connect.js';
import authRoutes from './route/auth.js';
import { productRouter } from './route/product.js';
import cartReadRoute from "./route/cartReadRoute.js";
import path from 'path';
import cors from 'cors';

import data from "./data/data.json" with { type: "json" };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.GROQ_API_KEY) {
  console.error("Missing GROQ_API_KEY in .env file");
  process.exit(1);
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.MODEL || "llama-3.3-70b-versatile";
const PRODUCTS = Array.isArray(data?.products) ? data.products : [];
const AVAILABLE_CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))].sort();
const AVAILABLE_BRANDS = [...new Set(PRODUCTS.map((product) => product.brand))].sort();
const sessions = new Map();

app.use(cors({ origin: '*' }));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);
app.use("/api", cartReadRoute);

const SYSTEM_PROMPT = {
  role: "system",
  content: `You are Vikas's AI Assistant for "Top Selling Products", a Shopify app.
You help merchants with product discovery, category suggestions, AI recommendations, cart upsells, and analytics.,

Suggestion:
- if someone share your felling please respond with a empathetic message and then ask how you can assist them with their store or products.
-if user ask share  his openion about your service, please respond with a polite and appreciative message, thanking them for their feedback and asking if there's anything specific they would like to see improved or added to the service.

Rules:
- Always be helpful, concise, and clear.
- Use short paragraphs and markdown bullets when useful.
- If the user asks for products, recommendations, brands, categories, or shopping ideas, call the product recommendation tool.
- Use only the real local product catalog for recommendations.
- Available categories: ${AVAILABLE_CATEGORIES.join(", ")}.
- Available brands: ${AVAILABLE_BRANDS.join(", ")}.
- Current datetime: ${new Date().toUTCString()}`,

role: "assistant",
content: "I can assist you with product recommendations, category suggestions, and insights to help grow your store. Just ask me about products, categories, or how to improve your sales!"

};

function getSessionHistory(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, [SYSTEM_PROMPT]);
  }

  return sessions.get(sessionId);
}

const formatCategoryLabel = (value = "") =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const buildProductCard = (product) => ({
    id: product.id,
    title: product.title,
    brand: product.brand,
    category: product.category,
    description: product.description,
    price: product.price,
    rating: product.rating,
    stock: product.stock,
    discountPercentage: product.discountPercentage,
    image: product.thumbnail || product.images?.[0] || "",
    images: product.images || [],
  });

const keywordSearchProducts = (query) => {
  const normalizedQuery = query.toLowerCase();
  const searchTerms = normalizedQuery.split(/\s+/).filter((word) => word.length > 2);

  return PRODUCTS.filter((product) => {
    const haystack = [
      product.title,
      product.description,
      product.category,
      product.brand,
    ]
      .join(" ")
      .toLowerCase();

    return searchTerms.some((term) => haystack.includes(term));
  });
};

const shouldRecommendProducts = (query) => {
  const normalizedQuery = query.toLowerCase();
  const recommendationKeywords = [
    "product",
    "products",
    "recommend",
    "recommendation",
    "category",
    "categories",
    "show",
    "buy",
    "brand",
    ...AVAILABLE_CATEGORIES,
    ...AVAILABLE_BRANDS.map((brand) => brand.toLowerCase()),
  ];

  return recommendationKeywords.some((keyword) => normalizedQuery.includes(keyword));
};

const productRecomandationHandler = (query, limit = 4) => {
  const normalizedQuery = query.toLowerCase();
  const matchedCategories = AVAILABLE_CATEGORIES.filter((category) =>
    normalizedQuery.includes(category.toLowerCase())
  );
  const matchedBrands = AVAILABLE_BRANDS.filter((brand) =>
    normalizedQuery.includes(brand.toLowerCase())
  );

  let recommendations = PRODUCTS.filter((product) => {
    const categoryMatch =
      matchedCategories.length > 0 && matchedCategories.includes(product.category);
    const brandMatch =
      matchedBrands.length > 0 && matchedBrands.includes(product.brand);

    return categoryMatch || brandMatch;
  });

  if (!recommendations.length) {
    recommendations = keywordSearchProducts(query);
  }

  recommendations = recommendations
    .sort((first, second) => {
      if (second.rating !== first.rating) {
        return second.rating - first.rating;
      }

      return second.discountPercentage - first.discountPercentage;
    })
    .slice(0, Number(limit) || 4);

  if (!recommendations.length) {
    return {
      text: `I couldn't find a close product match for "${query}". Try one of these categories: ${AVAILABLE_CATEGORIES.map(formatCategoryLabel).join(", ")}.`,
      cards: [],
    };
  }

  const cards = recommendations.map(buildProductCard);
  const responseCategories = [...new Set(cards.map((card) => formatCategoryLabel(card.category)))];

  return {
    text: `Here are ${cards.length} product recommendations for "${query}".\n\nCategories: ${responseCategories.join(", ")}.`,
    cards,
  };
};

const chatCompletion = async (userQuery, sessionId = "default") => {
  const chatHistory = getSessionHistory(sessionId);

  chatHistory.push({ role: "user", content: userQuery });

  const tools = [
    {
      type: "function",
      function: {
        name: "productRecomandationHandler",
        description: "Provides product recommendations from the local catalog with category, image, rating, stock, and pricing data",
        parameters: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The user's product query based on category, brand, or keywords"
            },
            limit: {
              type: "number",
              description: "Maximum number of products to recommend"
            }
          },
          required: ["query"]
        }
      }
    }
  ];

  try {
    const completion = await groq.chat.completions.create({
      messages: chatHistory,
      model: MODEL,
      tools,
      tool_choice: "auto",
      temperature: 0.7,
      max_tokens: 1024
    });

    const message = completion.choices[0].message;

    if (message.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];

      if (toolCall.function.name === "productRecomandationHandler") {
        const { query, limit } = JSON.parse(toolCall.function.arguments);
        const toolResult = productRecomandationHandler(query, limit);

        chatHistory.push({ role: "assistant", content: toolResult.text });
        return toolResult;
      }
    }

    const botReply = message.content || "Sorry, I couldn't process that.";
    chatHistory.push({ role: "assistant", content: botReply });

    if (chatHistory.length > 21) {
      chatHistory.splice(1, chatHistory.length - 21);
    }

    if (shouldRecommendProducts(userQuery)) {
      const fallbackRecommendations = productRecomandationHandler(userQuery);
      return {
        text: `${botReply}\n\n${fallbackRecommendations.text}`,
        cards: fallbackRecommendations.cards,
      };
    }

    return {
      text: botReply,
      cards: [],
    };
  } catch (error) {
    console.error("Groq Error:", error);
    return {
      text: "Sorry, I'm having trouble connecting to AI right now. Please try again.",
      cards: [],
    };
  }
};

app.get("/agent", async (req, res) => {
  const userQuery = req.query.message || req.query.query;
  const sessionId = req.query.sessionId || req.query.shop || "default";

  if (!userQuery) {
    return res.status(400).json({ error: "Query parameter 'message' is required" });
  }

  const botResponse = await chatCompletion(userQuery, sessionId);

  res.json({
    success: true,
    response: botResponse.text,
    recommendations: botResponse.cards,
    categories: AVAILABLE_CATEGORIES,
    sessionId
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'public', 'chatbot.html'));
});

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Chatbot endpoint: http://localhost:${PORT}/agent?message=hello&sessionId=test`);
});
