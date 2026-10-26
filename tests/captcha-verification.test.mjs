import test from "node:test";
import assert from "node:assert/strict";
import { verifyCaptcha } from "../src/services/campaign/captchaVerification.ts";

function setSecret(context, value) {
  const previous = process.env.RECAPTCHA_SECRET_KEY;
  process.env.RECAPTCHA_SECRET_KEY = value;
  context.after(() => {
    if (previous === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
    else process.env.RECAPTCHA_SECRET_KEY = previous;
  });
}

test("CAPTCHA rejects missing and oversized tokens before contacting Google", async (context) => {
  const fetch = context.mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected request");
  });
  for (const token of [undefined, null, 42, "", "   ", "a".repeat(4097)]) {
    assert.equal(await verifyCaptcha(token), "captcha_required");
  }
  assert.equal(fetch.mock.callCount(), 0);
});

test("CAPTCHA fails closed without a secret", async (context) => {
  setSecret(context, "");
  const fetch = context.mock.method(globalThis, "fetch", async () => Response.json({ success: true }));
  assert.equal(await verifyCaptcha("test-token"), "captcha_unavailable");
  assert.equal(fetch.mock.callCount(), 0);
});

test("CAPTCHA sends only secret and token in an uncached POST", async (context) => {
  setSecret(context, "test-secret");
  const fetch = context.mock.method(globalThis, "fetch", async () => Response.json({ success: true }));
  assert.equal(await verifyCaptcha("test-token"), "verified");
  const [url, options] = fetch.mock.calls[0].arguments;
  assert.equal(url, "https://www.google.com/recaptcha/api/siteverify");
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert.deepEqual(Object.fromEntries(options.body), { secret: "test-secret", response: "test-token" });
});

test("CAPTCHA rejects expired, duplicate and malformed responses", async (context) => {
  setSecret(context, "test-secret");
  for (const [result, expected] of [
    [{ success: false, "error-codes": ["timeout-or-duplicate"] }, "captcha_invalid"],
    [{ success: false, "error-codes": ["invalid-input-secret"] }, "captcha_unavailable"],
    [{ success: "true" }, "captcha_unavailable"],
    [null, "captcha_unavailable"],
  ]) {
    context.mock.method(globalThis, "fetch", async () => Response.json(result));
    assert.equal(await verifyCaptcha("test-token"), expected);
  }
});

test("CAPTCHA fails closed on HTTP errors, invalid JSON and network failures", async (context) => {
  setSecret(context, "test-secret");
  for (const response of [
    async () => new Response(null, { status: 503 }),
    async () => new Response("invalid json"),
    async () => { throw new Error("network unavailable"); },
  ]) {
    context.mock.method(globalThis, "fetch", response);
    assert.equal(await verifyCaptcha("test-token"), "captcha_unavailable");
  }
});
