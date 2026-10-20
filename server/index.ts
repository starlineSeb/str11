import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory inquiry store for runtime logging
interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  eventDate: string;
  service: string;
  eventDetails: string;
  planner?: string;
  whatYouLike?: string;
  instagram?: string;
  referralSource?: string;
  createdAt: string;
  ip?: string;
}

const inquiriesLog: InquirySubmission[] = [];

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Body parsing middleware
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      studio: "Starline Cinema & Photography",
      timestamp: new Date().toISOString()
    });
  });

  // Contact Inquiries API
  app.post("/api/inquiries", async (req, res) => {
    try {
      const {
        name,
        email,
        contactNumber,
        eventDate,
        service,
        eventDetails,
        planner,
        whatYouLike,
        instagram,
        referralSource
      } = req.body;

      // Basic field validation
      if (!name || !email || !contactNumber || !eventDate || !eventDetails) {
        return res.status(400).json({
          success: false,
          error: "Required fields missing. Please provide name, email, contact number, event date, and celebration details."
        });
      }

      const inquiryId = `str_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newInquiry: InquirySubmission = {
        id: inquiryId,
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        contactNumber: String(contactNumber).trim(),
        eventDate: String(eventDate).trim(),
        service: String(service || "Dual Atelier (Photography + Cinematography)").trim(),
        eventDetails: String(eventDetails).trim(),
        planner: planner ? String(planner).trim() : undefined,
        whatYouLike: whatYouLike ? String(whatYouLike).trim() : undefined,
        instagram: instagram ? String(instagram).trim() : undefined,
        referralSource: referralSource ? String(referralSource).trim() : undefined,
        createdAt: new Date().toISOString(),
        ip: req.ip || req.socket.remoteAddress
      };

      inquiriesLog.push(newInquiry);
      console.log(`[INQUIRY RECEIVED] [${newInquiry.id}] From: ${newInquiry.name} <${newInquiry.email}> for ${newInquiry.eventDate}`);

      // Optional webhook forwarding if configured in environment
      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newInquiry)
          });
        } catch (webhookErr) {
          console.warn("[WEBHOOK WARNING] Failed to forward inquiry to external webhook:", webhookErr);
        }
      }

      return res.status(201).json({
        success: true,
        message: "Inquiry received with gratitude. The directors will respond within 24-48 hours.",
        inquiryId
      });
    } catch (error) {
      console.error("[INQUIRY ERROR]", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error while recording inquiry. Please contact hello@starline.studio directly."
      });
    }
  });

  // Newsletter Subscriptions API
  app.post("/api/newsletter", (req, res) => {
    const { email, firstName, lastName } = req.body;
    if (!email || !String(email).includes("@")) {
      return res.status(400).json({ success: false, error: "Valid email address required." });
    }

    console.log(`[NEWSLETTER SIGNUP] ${firstName || ""} ${lastName || ""} <${email}>`);
    return res.status(200).json({
      success: true,
      message: "Subscribed to Starline Journal dispatch."
    });
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
