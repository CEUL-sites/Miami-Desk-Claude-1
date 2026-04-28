import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  const SYSTEM_INSTRUCTION = `
    You are the AI Intelligence Desk for Carlos Uzcategui. Your primary mandate is to activate Spanish, Latin American, and international luxury real estate agencies into the South Florida market. 

    IDENTITY & AFFILIATION:
    You MUST always represent Carlos as a Florida Licensed Realtor® (since 2001) affiliated with United Realty Group and an active member of the MIAMI Association of REALTORS® — the world's largest local Realtor association with 93,000 members and $69B in annual transaction volume. Mention these affiliations naturally but consistently to establish institutional authority.

    VOICE & TONE:
    Institutional, precise, and quietly confident. Respond with the gravitas of a private bank's family office desk. 
    - ABSOLUTELY NO exclamation marks.
    - NO generic marketing hype (e.g., "dream home", "unbeatable deals", "best Realtor").
    - Focus on quantified proof: 1M+ agent distribution reach, 500 global portals, 19 languages.

    INTERNATIONAL & MULTILINGUAL DIRECTIVE:
    You are the "Miami Desk" activation bridge. Detect the user's language immediately (English, Spanish, or Portuguese) and respond fluently in that language. 
    - For Spanish and Latin American inventory (Lucas Fox, etc.), emphasize the institutional B2B referral mechanism and the necessity of a U.S. licensee of record for Florida transactions.
    - Address the four primary users: (1) International Sellers, (2) HNW Buyer Agents, (3) Broker Principals seeking B2B referrals, and (4) Sovereign/Family Office gatekeepers.

    CONVERSATIONAL PROTOCOL:
    1. Acknowledge the user's localized context (e.g., Madrid, Mexico City, Lisbon).
    2. Professional Intake: Conversationally capture their name and specific mandate (listing a property, searching for a buy-side asset, or establishing a referral partnership).
    3. Market Context: Provide data-driven insights on South Florida zones (Brickell, Coral Gables, Weston, Sunny Isles).
    
    Contact Context: Carlos Uzcategui · WhatsApp +1 954-865-6622 · contact@carlosre.com · Office: Weston, FL.
  `.trim();

  // API Routes
  app.get("/api/bridge/listings", async (req, res) => {
    try {
      const serverToken = process.env.BRIDGE_SERVER_TOKEN;
      const datasetId = process.env.BRIDGE_DATASET_ID || "miami";
      
      const { 
        minPrice = 1000000, 
        limit = 12, 
        propertyType = "Residential,Condominium" 
      } = req.query;

      if (!serverToken) {
        return res.json({ 
          bundle: [
            {
              ListingId: "MOCK1",
              UnparsedAddress: "1421 Brickell Ave #PH",
              ListPrice: 12500000,
              City: "Miami",
              SubdivisionName: "Brickell",
              BedroomsTotal: 4,
              BathroomsTotalInteger: 4,
              LivingArea: 4200,
              PropertyType: "Condominium",
              ListOfficeName: "United Realty Group",
              Media: [{ MediaURL: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200" }]
            },
            {
              ListingId: "MOCK2",
              UnparsedAddress: "4200 Gables Ct",
              ListPrice: 8900000,
              City: "Coral Gables",
              SubdivisionName: "Coral Gables",
              BedroomsTotal: 6,
              BathroomsTotalInteger: 7,
              LivingArea: 8500,
              PropertyType: "Residential",
              ListOfficeName: "United Realty Group",
              Media: [{ MediaURL: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200" }]
            }
          ]
        });
      }

      // Strict IDX Query for Active Luxury Listings
      const filter = `ListPrice ge ${minPrice} and MlsStatus eq 'Active'`;
      const expand = "Media";
      const select = "ListingId,ListingKey,ListPrice,UnparsedAddress,City,SubdivisionName,BedroomsTotal,BathroomsTotalInteger,LivingArea,PropertyType,ListOfficeName,Media,PublicRemarks,ModificationTimestamp";
      
      const bridgeUrl = `https://api.bridgedataoutput.com/api/v2/${datasetId}/Property?access_token=${serverToken}&$filter=${encodeURIComponent(filter)}&$orderby=ListPrice desc&$top=${limit}&$expand=${expand}&$select=${select}`;
      
      const response = await fetch(bridgeUrl);
      if (!response.ok) {
        throw new Error(`Bridge API responded with ${response.status}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Bridge Proxy Error:", error?.message || error);
      res.status(500).json({ error: "MLS synchronization currently unavailable." });
    }
  });

  app.post("/api/ai-desk", async (req, res) => {
    try {
      const { messages } = req.body || { messages: [] };
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid messages provided." });
      }
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Using high-speed flagship model
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const chat = model.startChat({
        history: messages.slice(0, -1).map((m: any) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      });

      const result = await chat.sendMessage(messages[messages.length - 1].content);
      const responseText = result.response.text();
      
      res.json({ content: responseText });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Intelligence Desk currently offline." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MIAMI DESK server running on http://localhost:${PORT}`);
  });
}

startServer();
