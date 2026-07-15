import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─── In-memory rate limiter ───────────────────────────────────────────────────
const ipHits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

// ─── HTML sanitiser (prevent XSS in email bodies) ────────────────────────────
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .trim();
}

// ─── Email to portfolio owner ─────────────────────────────────────────────────
function ownerHtml(
  name: string,
  email: string,
  subject: string,
  message: string
): string {
  const ts = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Portfolio Message</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#09090b;font-family:system-ui,-apple-system,sans-serif;color:#e4e4e7;padding:32px 16px}
  .card{max-width:580px;margin:0 auto;background:#18181b;border-radius:16px;overflow:hidden;border:1px solid #27272a}
  .header{background:linear-gradient(135deg,#7c3aed 0%,#2563eb 100%);padding:28px 32px}
  .header h1{font-size:20px;font-weight:700;color:#fff;margin-bottom:4px}
  .header p{font-size:13px;color:rgba(255,255,255,.65)}
  .body{padding:28px 32px}
  .field{margin-bottom:20px}
  .label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#71717a;margin-bottom:6px}
  .value{font-size:14px;color:#e4e4e7;word-break:break-word}
  .msg{background:#09090b;border:1px solid #27272a;border-radius:10px;padding:16px;font-size:14px;line-height:1.75;color:#a1a1aa;white-space:pre-wrap;word-break:break-word}
  .badge{display:inline-block;background:rgba(124,58,237,.15);border:1px solid rgba(124,58,237,.3);color:#a78bfa;border-radius:5px;padding:1px 8px;font-size:12px;margin-left:6px}
  .footer{padding:16px 32px;border-top:1px solid #27272a;font-size:11px;color:#52525b;text-align:center}
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h1>📬 New message from your portfolio</h1>
    <p>Someone reached out via your contact form</p>
  </div>
  <div class="body">
    <div class="field">
      <div class="label">From</div>
      <div class="value">${esc(name)} <span class="badge">${esc(email)}</span></div>
    </div>
    <div class="field">
      <div class="label">Subject</div>
      <div class="value">${esc(subject)}</div>
    </div>
    <div class="field">
      <div class="label">Message</div>
      <div class="msg">${esc(message)}</div>
    </div>
    <div class="field" style="margin-bottom:0">
      <div class="label">Received</div>
      <div class="value" style="color:#71717a;font-size:13px">${ts} IST</div>
    </div>
  </div>
  <div class="footer">Simarjeet Singh Dua · Portfolio Contact Form</div>
</div>
</body>
</html>`;
}

// ─── Auto-reply to visitor ────────────────────────────────────────────────────
function visitorHtml(name: string, subject: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Message Received</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#09090b;font-family:system-ui,-apple-system,sans-serif;color:#e4e4e7;padding:32px 16px}
  .card{max-width:580px;margin:0 auto;background:#18181b;border-radius:16px;overflow:hidden;border:1px solid #27272a}
  .header{background:linear-gradient(135deg,#7c3aed 0%,#2563eb 100%);padding:36px 32px;text-align:center}
  .icon{font-size:40px;margin-bottom:12px}
  .header h1{font-size:22px;font-weight:700;color:#fff;margin-bottom:6px}
  .header p{font-size:13px;color:rgba(255,255,255,.65)}
  .body{padding:32px;text-align:center}
  .body h2{font-size:17px;color:#f4f4f5;margin-bottom:12px}
  .body p{font-size:14px;line-height:1.75;color:#a1a1aa;margin-bottom:12px}
  .hi{color:#a78bfa;font-weight:600}
  .divider{border:none;border-top:1px solid #27272a;margin:24px 0}
  .links{display:flex;justify-content:center;gap:20px;flex-wrap:wrap}
  .link{color:#a78bfa;text-decoration:none;font-size:13px;font-weight:500}
  .footer{padding:16px 32px;border-top:1px solid #27272a;font-size:11px;color:#52525b;text-align:center;line-height:1.6}
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="icon">✉️</div>
    <h1>Message Received!</h1>
    <p>I'll get back to you as soon as possible</p>
  </div>
  <div class="body">
    <h2>Hey <span class="hi">${esc(name)}</span>, thanks for reaching out! 👋</h2>
    <p>
      I've received your message about <strong style="color:#e4e4e7">"${esc(subject)}"</strong>
      and will review it shortly.
    </p>
    <p>
      I typically respond within <strong style="color:#e4e4e7">24–48 hours</strong>.
      In the meantime, feel free to explore my work.
    </p>
    <hr class="divider" />
    <div class="links">
      <a class="link" href="https://github.com/simarjeetdua">GitHub</a>
      <a class="link" href="https://www.linkedin.com/in/simarjeet-singh-dua-/">LinkedIn</a>
      <a class="link" href="https://leetcode.com/u/simarjeetdua/">LeetCode</a>
    </div>
  </div>
  <div class="footer">
    Simarjeet Singh Dua · Full Stack Developer · SVVV (2023–2027)<br />
    This is an automated reply — please do not respond to this email.
  </div>
</div>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { name, email, subject, message, honeypot } = body as Record<string, unknown>;

    // 3. Honeypot check — bots fill this; real users never see it
    if (honeypot) {
      return NextResponse.json({ success: true }); // silent discard
    }

    // 4. Server-side validation
    if (
      !name || typeof name !== "string" || name.trim().length < 2 ||
      !email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      !subject || typeof subject !== "string" || subject.trim().length < 3 ||
      !message || typeof message !== "string" || message.trim().length < 10 ||
      name.length > 100 || subject.length > 200 || message.length > 5000
    ) {
      return NextResponse.json(
        { error: "Please fill in all fields correctly." },
        { status: 422 }
      );
    }

    // 5. Env vars
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

    if (!RESEND_API_KEY || RESEND_API_KEY === "re_your_api_key_here") {
      console.error("[contact] RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    if (!CONTACT_EMAIL) {
      console.error("[contact] CONTACT_EMAIL not configured");
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 503 }
      );
    }

    // 6. Send emails via Resend
    const resend = new Resend(RESEND_API_KEY);

    const n = (name as string).trim();
    const e = (email as string).trim();
    const s = (subject as string).trim();
    const m = (message as string).trim();

    // Send both concurrently; only owner email is required to succeed
    const [ownerRes, replyRes] = await Promise.allSettled([
      resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [CONTACT_EMAIL],
        replyTo: e,
        subject: `[Portfolio] ${s} — from ${n}`,
        html: ownerHtml(n, e, s, m),
      }),
      resend.emails.send({
        from: "Simarjeet Singh Dua <onboarding@resend.dev>",
        to: [e],
        subject: "Got your message! 📬",
        html: visitorHtml(n, s),
      }),
    ]);

    // Owner email must succeed
    if (ownerRes.status === "rejected" || ownerRes.value.error) {
      const reason =
        ownerRes.status === "rejected"
          ? ownerRes.reason
          : ownerRes.value.error;
      console.error("[contact] owner email failed:", reason);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    // Auto-reply failure is non-fatal
    if (replyRes.status === "rejected") {
      console.warn("[contact] auto-reply failed (non-fatal):", replyRes.reason);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
