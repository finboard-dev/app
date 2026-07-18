import { getTemplateBySlug } from "@/lib/templates";

// Template download lead capture. Forwards the submission to a Slack webhook
// (TEMPLATE_LEADS_SLACK_WEBHOOK) and returns the template link so the client
// can start the download/open. If the webhook is not configured or fails, the
// download still proceeds: losing a lead beats breaking the gallery.

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const { slug, name, email, company, answers } = body ?? {};
  const template = slug ? getTemplateBySlug(slug) : null;
  if (!template || !template.link) {
    return Response.json({ ok: false, error: "unknown template" }, { status: 404 });
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return Response.json({ ok: false, error: "valid email required" }, { status: 400 });
  }

  const webhook = process.env.TEMPLATE_LEADS_SLACK_WEBHOOK;
  if (webhook) {
    const answerLines = Object.entries(answers ?? {})
      .filter(([, v]) => v)
      .map(([k, v]) => `• ${k}: ${String(v).slice(0, 300)}`)
      .join("\n");
    const text = [
      `📥 *Template lead* — ${template.title}`,
      `*${String(name || "—").slice(0, 120)}* <${String(email).slice(0, 200)}>${
        company ? ` · ${String(company).slice(0, 120)}` : ""
      }`,
      answerLines,
      `template: https://finboard.ai/templates/${slug}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
        signal: AbortSignal.timeout(5000),
      });
    } catch (err) {
      console.error("template-lead webhook failed:", err?.message);
    }
  } else {
    console.warn("template-lead: TEMPLATE_LEADS_SLACK_WEBHOOK not set; lead not forwarded");
  }

  return Response.json({ ok: true, url: template.link });
}
