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
