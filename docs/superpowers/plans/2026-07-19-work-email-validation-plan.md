# Work Email Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Require a company-owned email address for template lead submissions and reject consumer mailbox domains consistently in the browser and API.

**Architecture:** A framework-independent helper owns the consumer-domain policy and returns a structured validation result. Both the client-side lead form and the server-side route consume that helper, so the browser provides immediate feedback while the API prevents bypasses.

**Tech Stack:** Next.js 15 App Router, React 19, JavaScript, Node built-in test runner, Yarn.

## Global Constraints

- Consumer domains to block: Gmail/Googlemail, Yahoo, Outlook/Hotmail/Live/MSN, iCloud/Me/Mac, AOL, Proton, Zoho Mail, Mail.com, GMX, and Yandex.
- A company-owned domain is accepted; matching is trimmed and case-insensitive.
- Malformed or empty email message: `Please enter a valid email address.`
- Consumer-domain message: `Please use your work email address.`
- Client validation is feedback only; `POST /api/template-lead` remains authoritative.
- No MX lookup, disposable-email lookup, or change to template download behavior.

---

## File Structure

| File | Responsibility |
|---|---|
| `frontend/src/lib/workEmail.mjs` | Canonical domain policy and pure validation function shared by client and API. |
| `frontend/tests/work-email.test.mjs` | Node unit tests for valid, malformed, normalized, and consumer-domain addresses. |
| `frontend/src/app/api/template-lead/route.js` | Enforce the shared work-email policy before posting the lead to Slack. |
| `frontend/src/views/TemplateDetail.jsx` | Show a field-level validation message before submitting a rejected address. |
| `frontend/package.json` | Add the repeatable `test:unit` script. |

### Task 1: Create the canonical work-email validator and regression tests

**Files:**
- Create: `frontend/src/lib/workEmail.mjs`
- Create: `frontend/tests/work-email.test.mjs`
- Modify: `frontend/package.json`

**Interfaces:**
- Produces: `validateWorkEmail(email)` → `{ isValid: boolean, code: string, message: string | null }`.
- Produces: `EmailValidationCode` and `EmailValidationMessage` named constant objects for callers and tests.
- Consumes: no application state, network, or browser globals.

- [ ] **Step 1: Write the failing tests**

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  EmailValidationCode,
  EmailValidationMessage,
  validateWorkEmail,
} from "../src/lib/workEmail.mjs";

test("accepts an address on a company-owned domain", () => {
  assert.deepEqual(validateWorkEmail("finance@acme.co"), {
    isValid: true,
    code: EmailValidationCode.VALID,
    message: null,
  });
});

test("rejects a consumer mailbox domain regardless of case and surrounding whitespace", () => {
  assert.deepEqual(validateWorkEmail("  Controller@Gmail.com "), {
    isValid: false,
    code: EmailValidationCode.CONSUMER_DOMAIN,
    message: EmailValidationMessage.CONSUMER_DOMAIN,
  });
});

test("rejects a malformed address", () => {
  assert.deepEqual(validateWorkEmail("not-an-email"), {
    isValid: false,
    code: EmailValidationCode.INVALID_FORMAT,
    message: EmailValidationMessage.INVALID_FORMAT,
  });
});
```

- [ ] **Step 2: Run the new test and verify it fails because the module does not exist**

Run: `node --test tests/work-email.test.mjs`

Expected: failure resolving `../src/lib/workEmail.mjs`.

- [ ] **Step 3: Implement the minimal pure validator**

```js
export const EmailValidationCode = Object.freeze({
  VALID: "valid",
  INVALID_FORMAT: "invalid_format",
  CONSUMER_DOMAIN: "consumer_domain",
});

export const EmailValidationMessage = Object.freeze({
  INVALID_FORMAT: "Please enter a valid email address.",
  CONSUMER_DOMAIN: "Please use your work email address.",
});

const CONSUMER_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "outlook.com",
  "hotmail.com", "live.com", "msn.com", "icloud.com", "me.com", "mac.com",
  "aol.com", "proton.me", "protonmail.com", "zoho.com", "mail.com", "gmx.com",
  "yandex.com", "yandex.ru",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateWorkEmail(value) {
  const email = String(value ?? "").trim();
  if (!EMAIL_PATTERN.test(email)) {
    return {
      isValid: false,
      code: EmailValidationCode.INVALID_FORMAT,
      message: EmailValidationMessage.INVALID_FORMAT,
    };
  }

  const domain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
  if (CONSUMER_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      code: EmailValidationCode.CONSUMER_DOMAIN,
      message: EmailValidationMessage.CONSUMER_DOMAIN,
    };
  }

  return { isValid: true, code: EmailValidationCode.VALID, message: null };
}
```

- [ ] **Step 4: Add the package test command**

Add this entry under `scripts` in `frontend/package.json`:

```json
"test:unit": "node --test tests/work-email.test.mjs"
```

- [ ] **Step 5: Run the tests and verify the validator is green**

Run: `yarn test:unit`

Expected: three passing subtests and exit code 0.

- [ ] **Step 6: Commit the isolated validator change**

```bash
git add frontend/src/lib/workEmail.mjs frontend/tests/work-email.test.mjs frontend/package.json && git commit -m "feat: validate template work emails"
```

### Task 2: Wire the shared policy into the lead form and API endpoint

**Files:**
- Modify: `frontend/src/app/api/template-lead/route.js:1-27`
- Modify: `frontend/src/views/TemplateDetail.jsx:1-55, 95-139`

**Interfaces:**
- Consumes: `validateWorkEmail(email)` from `@/lib/workEmail.mjs`.
- Produces: HTTP 400 with `{ ok: false, error: validation.message }` for malformed and consumer-domain addresses.
- Produces: inline email-field feedback without making a network request when browser validation fails.

- [ ] **Step 1: Replace the route-local email regular expression with the shared validation call**

```js
import { validateWorkEmail } from "@/lib/workEmail.mjs";

const emailValidation = validateWorkEmail(email);
if (!emailValidation.isValid) {
  return Response.json(
    { ok: false, error: emailValidation.message },
    { status: 400 }
  );
}
```

Remove `EMAIL_RE`; the shared helper is the only email-policy implementation.

- [ ] **Step 2: Add browser feedback before the form calls `fetch`**

```jsx
import { validateWorkEmail } from "@/lib/workEmail.mjs";

const [emailError, setEmailError] = React.useState(null);

const emailValidation = validateWorkEmail(form.get("email"));
if (!emailValidation.isValid) {
  setEmailError(emailValidation.message);
  setBusy(false);
  return;
}
```

Use an email input that clears stale feedback as the visitor edits and exposes the error to assistive technology:

```jsx
<input
  name="email"
  type="email"
  required
  placeholder="Work email"
  className={inputCls}
  aria-invalid={Boolean(emailError)}
  aria-describedby={emailError ? "template-email-error" : undefined}
  onChange={() => setEmailError(null)}
/>
{emailError ? <p id="template-email-error" className="text-xs text-red-600">{emailError}</p> : null}
```

- [ ] **Step 3: Run the unit tests after wiring both consumers**

Run: `yarn test:unit`

Expected: three passing subtests and exit code 0.

- [ ] **Step 4: Run the production build**

Run: `yarn build`

Expected: `Compiled successfully` and exit code 0.

- [ ] **Step 5: Manually validate both paths in a local browser**

Run: `yarn dev`

Verify:

1. Submit `finance@gmail.com` on any template detail page; the form stays open and shows `Please use your work email address.`
2. Submit `finance@acme.co`; the form sends the request and preserves the existing download/open behavior.
3. Send a direct `POST /api/template-lead` with `finance@gmail.com`; it returns HTTP 400 and the same work-email message.

- [ ] **Step 6: Commit the integration change**

```bash
git add frontend/src/app/api/template-lead/route.js frontend/src/views/TemplateDetail.jsx && git commit -m "feat: require work email for template leads"
```

## Plan Self-Review

- Spec coverage: Task 1 implements the canonical consumer-domain policy, structured outcomes, error messages, and unit tests. Task 2 applies that policy in both the client and API without changing download behavior.
- Placeholder scan: no deferred implementation steps or ambiguous validation requirements remain.
- Type consistency: every caller uses the `validateWorkEmail(email)` result shape defined in Task 1.
