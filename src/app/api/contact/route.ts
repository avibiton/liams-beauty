import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_CONFIG } from "@/lib/config";

interface ContactBody {
  name: string;
  phone: string;
  service: string;
  date: string;
  locale: string;
  honeypot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    // Spam protection
    if (body.honeypot) {
      return NextResponse.json({ ok: true });
    }

    // Basic validation
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subject = `פנייה חדשה מ-Liam's Beauty — ${body.name}`;
    const text = `
שם: ${body.name}
טלפון: ${body.phone}
שירות מבוקש: ${body.service || "לא צוין"}
תאריך מועדף: ${body.date || "לא צוין"}
שפה: ${body.locale}
    `.trim();

    // If Resend API key is configured, send email
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "noreply@liamsbeauty.co.il",
          to: [process.env.EMAIL_TO || BUSINESS_CONFIG.email],
          subject,
          text,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Email send failed" }, { status: 500 });
      }
    } else {
      // Fallback: log to console (for development)
      console.log("Contact form submission:", { subject, text });
      // In production without an email provider configured, still return success
      // The user should configure RESEND_API_KEY in .env.local
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
