// Server-only ZeroBounce check (ZEROBOUNCE_API_KEY). "valid" and "catch-all"
// pass; every other status blocks. If ZeroBounce cannot answer (no key,
// timeout, out of credits) we return verified: false and let the lead through
// on the format/work-domain check alone.

const PASS_STATUSES = new Set(["valid", "catch-all"]);

export async function checkDeliverable(email) {
  const apiKey = process.env.ZEROBOUNCE_API_KEY;
  if (!apiKey) {
    console.warn("zerobounce: ZEROBOUNCE_API_KEY not set; skipping check");
    return { ok: true, verified: false };
  }

  const url = new URL("https://api.zerobounce.net/v2/validate");
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("email", email);
  url.searchParams.set("ip_address", "");

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000), cache: "no-store" });
    const data = await res.json();
    if (!res.ok || data.error || !data.status) {
      console.error("zerobounce: unusable response:", data.error || res.status);
      return { ok: true, verified: false };
    }
    if (PASS_STATUSES.has(data.status)) return { ok: true, verified: true };
    return { ok: false, verified: true, message: "We couldn't verify this email. Please check it or use another work email." };
  } catch (err) {
    console.error("zerobounce: request failed:", err?.message);
    return { ok: true, verified: false };
  }
}
