import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.9.9";

serve(async (req) => {

  // --------------------------
  // CORS HANDLER
  // --------------------------

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: corsHeaders(),
      }
    );
  }

  try {

    // --------------------------
    // PARSE BODY SAFELY
    // --------------------------

    let body: any;

    try {
      body = await req.json();
    } catch {
      console.log("⚠️ Invalid JSON body");
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    console.log("📨 Email request received:", body);

    const {
      type,
      email,
      name,
      message,
      subject,
      source,
      inquiry_type,
    } = body ?? {};

    // --------------------------
    // VALIDATION
    // --------------------------

    if (!type) {
      return new Response(
        JSON.stringify({ error: "Missing type" }),
        {
          status: 400,
          headers: corsHeaders(),
        }
      );
    }

    // --------------------------
    // LABEL GENERATION
    // --------------------------

    let label = "Yeni Form";

    if (type === "subscriber") {

      if (source === "footer")
        label = "📬 Yeni Bülten Abonesi (Footer)";

      else if (source === "podcast")
        label = "🎙 Podcast Bülten Abonesi";

      else
        label = "📬 Yeni Bülten Abonesi";
    }

    else if (type === "contact")
      label = "📩 Yeni İletişim Mesajı";

    else if (type === "collab")
      label = "🤝 Yeni İş Birliği Talebi";


    // --------------------------
    // SUBJECT
    // --------------------------

    const mailSubject =
      `${label} — Genesi Nova Choir`;



    // --------------------------
    // BODY TEMPLATE
    // --------------------------

    let mailText = `
Yeni form gönderildi:

Tip: ${label}
İsim: ${name || "-"}
Email: ${email || "-"}
`;


    if (type === "subscriber") {

      mailText += `
Kaynak: ${source || "-"}

Bu kullanıcı bültene abone oldu.
`;
    }


    if (type === "contact") {

      mailText += `
Konu: ${subject || "-"}

Mesaj:
${message || "-"}
`;
    }


    if (type === "collab") {

      mailText += `
Talep Türü: ${inquiry_type || "-"}

Mesaj:
${message || "-"}
`;
    }


    mailText += `

---
Genesi Nova Choir Website
${new Date().toLocaleString("tr-TR")}
`;



    console.log(mailText);



    // --------------------------
    // SMTP CONFIG (SECURE)
    // --------------------------

    const SMTP_HOST = Deno.env.get("SMTP_HOST");
    const SMTP_PORT = Number(Deno.env.get("SMTP_PORT"));
    const SMTP_USER = Deno.env.get("SMTP_USER");
    const SMTP_PASS = Deno.env.get("SMTP_PASS");

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {

      console.error("❌ Missing SMTP secrets");

      return new Response(
        JSON.stringify({ error: "SMTP not configured" }),
        {
          status: 500,
          headers: corsHeaders(),
        }
      );
    }



    const transporter = nodemailer.createTransport({

      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: true,

      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },

    });



    // --------------------------
    // SEND EMAIL
    // --------------------------

    await transporter.sendMail({

      from: `"Genesi Nova Choir" <${SMTP_USER}>`,

      to: SMTP_USER,

      subject: mailSubject,

      text: mailText,

    });



    console.log("✅ Email sent successfully");



    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: corsHeaders(),
      }
    );


  } catch (error: any) {

    console.error("❌ Email error:", error);

    return new Response(
      JSON.stringify({
        error: "Email send failed",
      }),
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }

});



function corsHeaders() {

  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, apikey, content-type",
    "Access-Control-Allow-Methods":
      "POST, OPTIONS",
  };

}