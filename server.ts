import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini API client safely
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } else {
    console.warn("Warning: GEMINI_API_KEY is not defined. Falling back to demo chat responses.");
  }

  // API Route for real-time portfolio AI agent chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!ai) {
        // Fallback to static guidelines when the API key is missing
        return res.json({
          text: "I am currently running in offline simulation mode since the GEMINI_API_KEY is not defined in Secrets. However, feel free to submit our consultation form or email hello@webkala.com directly to get in touch with our founders!"
        });
      }

      const systemInstruction = `You are Sherya, a friendly co-founder and lead builder at webकला.
Your role is to guide prospective clients about our custom web design & development services, pricing, and how we work.
Speak in a warm, welcoming, and down-to-earth tone. Avoid robotic tech speak, corporate jargon, or high-pressure sales pitches. Speak like a helpful partner who is excited to help them bring their ideas to life.

Here is the exact source of truth regarding webकला:
1. SERVICES:
   - Business Websites: Custom sites that tell your story, handle client signups/leads, and grow your brand.
   - Portfolio Websites: Beautiful, smooth-moving custom display portfolios for creators, artists, and executives.
   - E-commerce Stores: Clean, easy-to-use shopping layouts with secure checkout that shoppers love.
2. INDUSTRIES SERVED: Restaurants, Hospitals, Schools, Colleges, Coaches, Lawyers, Gyms, Salons, Hotels, Real Estate, Manufacturing, NGOs, Startups, Personal Brands, Freelancers, E-commerce.
3. BENEFITS: Custom-made designs (no generic templates), fast load times so customers don't wait, mobile-friendly on every screen, search-engine ready, secure connections, clear upfront pricing, a direct Slack line to the builders, and built to scale as you grow.
4. PROCESS (8 Stages):
   - Consultation (1-2 Days) - Let's chat over coffee.
   - Requirement Analysis (2-3 Days) - Mapping it out.
   - Wireframing (3-4 Days) - Drawing the blueprint.
   - UI Design (4-7 Days) - Designing colors & layout.
   - Development (1-3 Weeks) - Bringing it to life.
   - Testing (3-4 Days) - Checking every detail.
   - Deployment (1 Day) - Going live!
   - Support (Continuous) - Growing together.
5. PRICING PLANS:
   - Starter (₹6,000/month, or ₹58,000/year billed annually): Perfect for a clean single-page site with contact forms, basic CMS, and 3 months of support.
   - Professional (₹15,000/month, or ₹1,44,000/year billed annually): Our most popular option. Includes up to 8 custom pages, easy-to-use CMS training, payment setup, and priority support.
   - Enterprise (₹40,000/month, or ₹3,80,000/year billed annually): Completely bespoke platforms. Unlimited pages, CRM integrations, secure custom webhooks, full IP ownership, and direct Slack channel.
6. TECH STACK: React 19, Vite, Tailwind CSS v4, Framer Motion, and TypeScript.
7. CONTACT DETAILS: Email: hello@webkala.com, Phone: +91 72240 12727.

Answer user queries warmly and concisely (under 3-4 sentences whenever possible). Encourage them to fill out the contact form on this page or email us directly to book a slot.`;

      // Convert conversation history to Gemini model structure
      const contents = [];
      if (history && Array.isArray(history)) {
        // filter welcome message or others to avoid incorrect schema
        const validHistory = history.filter(turn => turn.id !== 'welcome-1');
        for (const turn of validHistory) {
          contents.push({
            role: turn.sender === 'client' ? 'user' : 'model',
            parts: [{ text: turn.text }]
          });
        }
      }
      
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        }
      });

      const text = response.text || "I am here to help you build modern web assets. Could you describe your project?";
      res.json({ text });
    } catch (err: any) {
      console.error("Gemini API Error in backend:", err);
      res.status(500).json({ error: err.message || "An error occurred with Gemini." });
    }
  });

  // API Route for sending booking details to email
  app.post("/api/book-call", async (req, res) => {
    try {
      const { name, email, phone, company, budget, preferredDate, preferredTime, message } = req.body;
      console.log(`[BOOKING REQUEST Received] to bshubh884@gmail.com:`, req.body);

      // Create transporter (fallback to Gmail/SMTP if configured, otherwise logs to console)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER || 'webkala.mailer@gmail.com',
          pass: process.env.SMTP_PASS || 'mock-pass'
        }
      });

      // Email options for the admin/server
      const adminMailOptions = {
        from: process.env.SMTP_USER || 'webkala.mailer@gmail.com',
        to: 'bshubh884@gmail.com',
        subject: `New Call Booking Request from ${name}`,
        text: `
          New Booking Details:
          ------------------------------
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Company: ${company || 'N/A'}
          Budget: ${budget}
          Preferred Date: ${preferredDate}
          Preferred Time Slot: ${preferredTime}
          Message: ${message}
        `
      };

      // Email options for the client/customer
      const clientMailOptions = {
        from: process.env.SMTP_USER || 'webkala.mailer@gmail.com',
        to: email,
        subject: `Your Consultation Call with Webकला is Requested!`,
        text: `
Hi ${name},

Thank you for reaching out to Webकला! We've received your booking request for a casual consultation chat.

Here are the details you provided:
- Preferred Date: ${preferredDate}
- Preferred Time Slot: ${preferredTime}
- Budget Range: ${budget}
- Project Brief: ${message}

We will review these details and follow up with a calendar meeting link shortly.

Best regards,
Sherya & The Webकला Team
hello@webkala.com
        `
      };

      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        // Send to admin
        await transporter.sendMail(adminMailOptions);
        // Send to client
        await transporter.sendMail(clientMailOptions);
        console.log("Booking emails successfully sent to both bshubh884@gmail.com and client: " + email);
      } else {
        console.warn("SMTP_USER or SMTP_PASS not set in environment variables. Booking details logged below but not sent over SMTP.");
        console.log("Client Confirmation Email Body:\n", clientMailOptions.text);
      }

      res.json({ success: true });
    } catch (err: any) {
      console.error("Error sending booking email:", err);
      res.status(500).json({ error: err.message || "Failed to process booking email" });
    }
  });

  // Vite development integration or production static files serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
