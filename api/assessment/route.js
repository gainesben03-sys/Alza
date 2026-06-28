import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const NAVY = "#0F2747";
const BLUE = "#1F6FB2";
const BODY = "#3E4855";

function ownerHtml({ email, score, band, flagged, intent, reason }) {
  const areas = (flagged || []).map((f) => f.insight).join(", ") || "none";
  return `
  <div style="font-family:Inter,Arial,sans-serif;color:${BODY};line-height:1.6">
    <p style="font-size:18px;color:${NAVY};margin:0 0 4px"><strong>New assessment completed</strong></p>
    <p style="margin:0 0 16px">${email}</p>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 16px 4px 0;color:#9aa6b4">Score</td><td style="color:${NAVY};font-weight:600">${score} / 100</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#9aa6b4">Band</td><td style="color:${NAVY};font-weight:600">${band.name}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#9aa6b4">Flagged</td><td>${areas}</td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#9aa6b4">What brought them</td><td>${intent || "—"}</td></tr>
    </table>
    ${reason ? `<p style="margin:16px 0 0;color:#9aa6b4">In their words</p><p style="margin:4px 0 0;color:${NAVY}">&ldquo;${reason}&rdquo;</p>` : ""}
  </div>`;
}

function reportHtml({ score, band, flagged }) {
  const items = (flagged || [])
    .map(
      (f) =>
        `<tr><td style="padding:10px 0;border-top:1px solid #E4E8EE">
           <strong style="color:${NAVY}">${f.insight}</strong> &mdash; ${f.tag}
           <div style="color:${BODY};font-size:14px;margin-top:4px">${f.line}</div>
         </td></tr>`
    )
    .join("");
  return `
  <div style="font-family:Inter,Arial,sans-serif;color:${BODY};line-height:1.6;max-width:560px">
    <p style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${BLUE};margin:0 0 8px">Your result</p>
    <p style="font-size:48px;color:${NAVY};margin:0;font-weight:600">${score}</p>
    <p style="font-size:22px;color:${NAVY};margin:2px 0 18px">${band.name}</p>
    <p>${band.summary}</p>
    ${items ? `<h3 style="color:${NAVY};margin:24px 0 4px">Where the strain shows</h3><table style="width:100%;border-collapse:collapse">${items}</table>` : ""}
    <h3 style="color:${NAVY};margin:28px 0 6px">Recommended next step</h3>
    <p>${band.step}</p>
    <p style="margin-top:24px">
      <a href="mailto:hello@alza.group?subject=Elevation%20Conversation"
         style="background:${NAVY};color:#fff;text-decoration:none;padding:12px 22px;border-radius:3px;display:inline-block">
        Book an Elevation Conversation
      </a>
    </p>
    <p style="color:#9aa6b4;font-size:13px;margin-top:32px">Alza — Strategic People &amp; Organizational Advisory<br/>Elevate People. Strengthen Organizations.</p>
  </div>`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const { email, score, band, flagged, intent, reason } = body || {};
  if (!email || typeof score !== "number" || !band?.name) {
    return Response.json({ ok: false, error: "missing fields" }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // ---- store the lead (best effort) ----
  try {
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const sb = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      const { error } = await sb.from("leads").insert({
        email,
        score,
        band: band.name,
        flagged: (flagged || []).map((f) => f.insight),
        raw: body,
      });
      if (error) console.error("supabase insert:", error.message);
      else stored = true;
    }
  } catch (e) {
    console.error("supabase exception:", e);
  }

  // ---- send emails (best effort) ----
  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || "Alza <onboarding@resend.dev>";
      if (process.env.OWNER_EMAIL) {
        await resend.emails.send({
          from,
          to: process.env.OWNER_EMAIL,
          subject: `New assessment — ${email} — ${score} (${band.name})`,
          html: ownerHtml({ email, score, band, flagged, intent, reason }),
        });
      }
      await resend.emails.send({
        from,
        to: email,
        replyTo: process.env.OWNER_EMAIL,
        subject: "Your Organizational Pulse Assessment\u2122 results",
        html: reportHtml({ score, band, flagged }),
      });
      emailed = true;
    }
  } catch (e) {
    console.error("resend exception:", e);
  }

  return Response.json({ ok: true, stored, emailed });
}
