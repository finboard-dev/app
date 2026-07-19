# Work Email Validation Design

## Goal

Require a company-owned email address before a visitor can submit the free-template lead form. Consumer and common mailbox domains are not accepted.

## Scope

This change applies only to `POST /api/template-lead` and its form in `TemplateDetail`. It does not alter access to templates or add a lead gate to the future Skills directory.

## Design

`src/lib/workEmail.js` will own the email policy as pure functions and named constants:

- A canonical set of blocked consumer domains: Gmail/Googlemail, Yahoo, Outlook/Hotmail/Live/MSN, iCloud/Me/Mac, AOL, Proton, Zoho Mail, Mail.com, GMX, and Yandex.
- `validateWorkEmail(email)` returns a structured result with one of three outcomes: valid, malformed email, or consumer-domain email.
- Domain matching trims whitespace and is case-insensitive. Only exact mailbox domains are blocked; company-owned domains are accepted.

The template form will call the helper before sending the request and render the returned message underneath its email input. The API route will call the same helper and return HTTP 400 with the same message. The API remains the authoritative control, so direct requests cannot bypass the rule.

## Errors

- Malformed or empty email: `Please enter a valid email address.`
- Consumer domain: `Please use your work email address.`

## Tests

Node's built-in test runner will test the pure helper through a new `test:unit` package script. Coverage includes a custom company domain, case-insensitive blocked domains, whitespace normalization, and malformed addresses.

## Non-goals

- No DNS/MX verification, disposable-email lookup, or account provisioning.
- No changes to the Slack webhook transport, download behavior, existing template content, or deployment configuration.
