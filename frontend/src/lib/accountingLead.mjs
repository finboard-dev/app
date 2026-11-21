import { EmailValidationCode, validateWorkEmail } from "./workEmail.mjs";
import { mergeCopy } from "../data/accounting/mergeCopy.js";
import { ACCOUNTING_PATH, LEAD_FORM } from "../data/accountingServices.js";
import { SEGMENTS_BY_SLUG } from "../data/accounting/segments/index.js";

/**
 * Accounting-services lead form: pure validation and formatting, so the API
 * route only does I/O (email check, sending the notification email). "general" is the main
 * /accounting-services page; other values are segment slugs.
 */

export const GENERAL_SEGMENT = "general";
const SITE = "https://finboard.ai";
const LIMITS = Object.freeze({ segment: 40, name: 120, email: 200, company: 160, answer: 120, message: 2000 });

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

/** The form copy (title, company label, qualifying question) for a page, or null. */
export function leadFormFor(segment) {
  if (segment === GENERAL_SEGMENT) return LEAD_FORM;
  const page = SEGMENTS_BY_SLUG[segment];
  return page ? mergeCopy({ LEAD_FORM }, page.copy).LEAD_FORM : null;
}

/** Validate a submission. Returns { ok: true, lead, isSpam } or { ok: false, error }. */
export function parseAccountingLead(body) {
  const segment = clean(body?.segment, LIMITS.segment) || GENERAL_SEGMENT;
  const form = leadFormFor(segment);
  if (!form) return { ok: false, error: "Unknown page." };

  const name = clean(body?.name, LIMITS.name);
  if (!name) return { ok: false, error: "Please enter your name." };

  // Personal addresses are accepted: creators and small brands often use them.
  const email = clean(body?.email, LIMITS.email);
  const emailCheck = validateWorkEmail(email);
  if (emailCheck.code === EmailValidationCode.INVALID_FORMAT) return { ok: false, error: emailCheck.message };

  const company = clean(body?.company, LIMITS.company);
  if (!company) return { ok: false, error: `Please enter your ${form.companyLabel.toLowerCase()}.` };

  const answer = clean(body?.qualifier, LIMITS.answer);
  if (!form.qualifier.options.includes(answer)) return { ok: false, error: `Please answer: ${form.qualifier.label}` };

  return {
    ok: true,
    // Hidden "website" field: people never see it, bots fill it in.
    isSpam: Boolean(clean(body?.website, 200)),
    lead: { segment, name, email, company, qualifier: { label: form.qualifier.label, answer }, message: clean(body?.message, LIMITS.message) },
  };
}

export const leadPageUrl = (segment) => `${SITE}${ACCOUNTING_PATH}${segment === GENERAL_SEGMENT ? "" : `/${segment}`}`;
const pageLabel = (segment) => (segment === GENERAL_SEGMENT ? "Startups" : SEGMENTS_BY_SLUG[segment].nav);

// "Monthly revenue: $50K to $250K", but "What do you want to outsource? Monthly close".
const answerLine = (label, answer) => (label.endsWith("?") ? `${label} ${answer}` : `${label}: ${answer}`);

/** The notification email for a validated lead: { subject, text }. Plain text only. */
export function formatLeadEmail(lead) {
  const label = pageLabel(lead.segment);
  const lines = [
    `New lead from the ${label} accounting page.`,
    "",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `${leadFormFor(lead.segment).companyLabel}: ${lead.company}`,
    answerLine(lead.qualifier.label, lead.qualifier.answer),
    ...(lead.message ? ["", "Message:", lead.message] : []),
    "",
    `Page: ${leadPageUrl(lead.segment)}`,
    `Reply to this email to answer ${lead.name} directly.`,
  ];
  return { subject: `New accounting lead: ${lead.company} (${label})`, text: lines.join("\n") };
}
