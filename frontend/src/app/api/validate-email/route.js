import { validateWorkEmail } from "@/lib/workEmail.mjs";
import { checkDeliverable } from "@/lib/zeroBounce.mjs";

// Live email check for the template lead form: work-email policy first (free),
// then ZeroBounce. The form keeps Download disabled until this returns ok.

export const dynamic = "force-dynamic";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const email = String(body?.email ?? "").trim();
  const policy = validateWorkEmail(email);
  if (!policy.isValid) return Response.json({ ok: false, error: policy.message });

  const result = await checkDeliverable(email);
  return Response.json({ ok: result.ok, error: result.message ?? null });
}
