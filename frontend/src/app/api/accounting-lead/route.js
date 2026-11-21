import { formatLeadEmail, parseAccountingLead } from "@/lib/accountingLead.mjs";
import { checkDeliverable } from "@/lib/zeroBounce.mjs";
import { CONTACT_EMAIL } from "@/data/accountingServices";

// Accounting-services lead form. Each lead is emailed through Resend
// (RESEND_API_KEY) to ACCOUNTING_LEADS_EMAIL_TO, with Reply-To set to the
// visitor so a reply goes straight to them. A lead that can't be delivered is
// an error: the visitor is told to email us instead of it being dropped.

export const dynamic = "force-dynamic";

const LEADS_TO = process.env.ACCOUNTING_LEADS_EMAIL_TO || "vaishnav@finboard.ai";
// onboarding@resend.dev only delivers to the Resend account owner's address;
// after verifying finboard.ai in Resend, set e.g. "FinBoard <leads@finboard.ai>".
const LEADS_FROM = process.env.ACCOUNTING_LEADS_EMAIL_FROM || "FinBoard Leads <onboarding@resend.dev>";
const NOT_DELIVERED = `Sorry, we couldn't send your details. Please email ${CONTACT_EMAIL} instead.`;

async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY not set");
  const { subject, text } = formatLeadEmail(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: LEADS_FROM, to: [LEADS_TO], reply_to: lead.email, subject, text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const parsed = parseAccountingLead(body);
  if (!parsed.ok) return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  if (parsed.isSpam) return Response.json({ ok: true });

  const deliverable = await checkDeliverable(parsed.lead.email);
  if (!deliverable.ok) {
    return Response.json({ ok: false, error: "We couldn't verify this email. Please check it or use another one." }, { status: 400 });
  }

  try {
    await sendLeadEmail(parsed.lead);
  } catch (err) {
    console.error("accounting-lead: email not sent:", err?.message);
    return Response.json({ ok: false, error: NOT_DELIVERED }, { status: 502 });
  }
  return Response.json({ ok: true });
}
