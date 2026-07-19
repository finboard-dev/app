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
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
  "yandex.ru",
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

  return {
    isValid: true,
    code: EmailValidationCode.VALID,
    message: null,
  };
}
