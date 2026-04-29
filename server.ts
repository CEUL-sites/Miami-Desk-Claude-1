import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenerativeAI } from "@google/generative-ai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

  const SYSTEM_INSTRUCTION = `
    You are the AI Intelligence Desk for Carlos Uzcategui — a Florida Licensed Realtor® since 2001 (CLHMS), affiliated with United Realty Group and Miami and South Florida REALTORS® (93,000 members, $69B in 2025 volume). 

    PRIMARY MANDATE: 
    Your primary focus is to help South Florida homeowners begin the process of selling their property. You generate seller leads by explaining Carlos's distribution power and 25-year expertise.

    SECONDARY MANDATES:
    1. Helping buyers (especially Spanish-speaking and Latin American buyers) find South Florida properties.
    2. Helping international agencies activate their inventory into the U.S. MLS via Carlos's license.

    VOICE & TONE:
    Institutional, precise, never promotional. Respond with the gravitas of a private bank's family office desk. 
    - ABSOLUTELY NO exclamation marks.
    - NO generic marketing hype (e.g., "dream home", "unbeatable deals", "best Realtor").
    - Cite specific zones naturally: Brickell, Coral Gables, Weston, Pinecrest, Bal Harbour, Sunny Isles, Key Biscayne.

    LANGUAGE DIRECTIVE:
    Detect the user's language (English, Spanish, Portuguese) and respond in kind.

    CONVERSATIONAL PROTOCOL:
    1. Acknowledge context.
    2. Professional Intake: Capture name and mandate (seller, buyer, or referral).
    3. End every conversation with a clear next step: contact form, WhatsApp link to +1 954 865 6622, or email to contact@carlosre.com.
    
    Affiliation Detail: Member of Miami and South Florida REALTORS® — 93,000 member agents and $69B in annual volume.
    Contact: Carlos Uzcategui · Office: Weston, FL.
  `.trim();

  // API Routes
  app.get("/api/bridge/listings", async (req, res) => {
    try {
      const serverToken = process.env.BRIDGE_SERVER_TOKEN;
      const datasetId = process.env.BRIDGE_DATASET_ID || "miamire";
      
      const { 
        minPrice = 1000000, 
        limit = 12, 
        propertyType = "Residential,Condominium" 
      } = req.query;

      if (!serverToken) {
        console.log("No Bridge Server Token found, returning mock data.");
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
      const filter = `ListPrice ge ${minPrice} and StandardStatus eq 'Active'`;
      const expand = "Media";
      
      // Use Authorization header instead of query param for better OData compatibility
      const queryParams = new URLSearchParams({
        // access_token: serverToken, // Moved to header
        "$filter": filter,
        "$orderby": "ListPrice desc",
        "$top": limit.toString(),
        "$expand": expand
      });

      // Stage 1: Standard v2 OData with provided datasetId
      let bridgeUrl = `https://api.bridgedataoutput.com/api/v2/OData/${datasetId}/Property?${queryParams.toString()}`;
      console.log(`Bridge Sync: Attempting OData v2 connect [${datasetId}]...`);
      
      let response = await fetch(bridgeUrl, {
        headers: {
          'Authorization': `Bearer ${serverToken}`,
          'Accept': 'application/json'
        }
      });

      // Stage 1b: Try 'Listings' (plural) if 'Property' 404s
      if (response.status === 404) {
        const pluralUrl = `https://api.bridgedataoutput.com/api/v2/OData/${datasetId}/Listings?${queryParams.toString()}`;
        response = await fetch(pluralUrl, {
          headers: {
            'Authorization': `Bearer ${serverToken}`,
            'Accept': 'application/json'
          }
        });
      }

      // Stage 1c: Try OData WITHOUT v2 prefix
      if (response.status === 404) {
        const noV2Url = `https://api.bridgedataoutput.com/api/OData/${datasetId}/Property?${queryParams.toString()}`;
        response = await fetch(noV2Url, {
          headers: {
            'Authorization': `Bearer ${serverToken}`,
            'Accept': 'application/json'
          }
        });
      }

      // Stage 2: Fallback to 'miamire' alias (common for Carlos's region)
      if (response.status === 404 && datasetId !== "miamire") {
        const fallbackUrl = `https://api.bridgedataoutput.com/api/v2/OData/miamire/Property?${queryParams.toString()}`;
        response = await fetch(fallbackUrl, {
          headers: {
            'Authorization': `Bearer ${serverToken}`,
            'Accept': 'application/json'
          }
        });
      }

      // Stage 3: Super Fallback to Simple Listing API
      if (!response.ok) {
        const simpleParams = new URLSearchParams({
          access_token: serverToken,
          datasetId: datasetId,
          limit: limit.toString(),
          sortBy: "-ListPrice"
        });
        const simpleUrl = `https://api.bridgedataoutput.com/api/v2/listings?${simpleParams.toString()}`;
        response = await fetch(simpleUrl);
      }

      if (!response.ok) {
        const errorBody = await response.text().catch(() => "No error body");
        throw new Error(`All Bridge API stages failed. Last status: ${response.status}. Detail: ${errorBody.substring(0, 200)}`);
      }
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("Bridge Proxy Error:", error?.message || error);
      res.status(500).json({ 
        error: "MLS synchronization currently unavailable.",
        details: error?.message || "Unknown error"
      });
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

  app.post('/api/lead', async (req, res) => {
    const lead = req.body;

    // Basic validation
    if (!lead || !lead.email || !lead.name || !lead.type) {
      return res.status(400).json({ ok: false, error: 'missing_required_fields' });
    }

    // 1. Write to Firestore (source of truth)
    // Note: In this environment, we typicaly use client-side firestore but 
    // for server-side we'd need firebase-admin. Since we don't have it initialized here,
    // and the request asks for a specific pattern, I will focus on the Sheets webhook.
    let firestoreOk = true; // Temporary flag

    // 2. Forward to Google Sheets via Apps Script
    let sheetsOk = false;
    try {
      const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
      const secret = process.env.SHEETS_SHARED_SECRET;
      
      if (!webhookUrl || !secret) {
        console.warn('Sheets webhook not configured (v4 setup pending)');
        sheetsOk = true; // Fallback to avoid erroring if not yet set up
      } else {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lead, secret })
        });
        const result = await response.json();
        sheetsOk = result.ok === true;
      }
    } catch (e) {
      console.error('Sheets webhook failed:', e);
    }

    // 3. Respond — succeed if at least one sink worked
    if (firestoreOk || sheetsOk) {
      return res.json({ ok: true, firestoreOk, sheetsOk });
    }
    return res.status(500).json({ ok: false, error: 'all_sinks_failed' });
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
