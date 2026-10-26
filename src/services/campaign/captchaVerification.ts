export type CaptchaVerification = "verified" | "captcha_required" | "captcha_invalid" | "captcha_unavailable";

/** Verifica o token de uso único no servidor, sem enviar CPF ou registrar o token. */
export async function verifyCaptcha(token: unknown): Promise<CaptchaVerification> {
  if (typeof token !== "string" || !token.trim() || token.length > 4096) {
    return "captcha_required";
  }
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return "captcha_unavailable";

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return "captcha_unavailable";
    const result: unknown = await response.json();
    if (!result || typeof result !== "object") return "captcha_unavailable";
    const verification = result as Record<string, unknown>;
    if (verification.success === true) return "verified";
    const errors = verification["error-codes"];
    if (Array.isArray(errors) && errors.some((code) =>
      ["missing-input-secret", "invalid-input-secret"].includes(code),
    )) return "captcha_unavailable";
    return verification.success === false ? "captcha_invalid" : "captcha_unavailable";
  } catch {
    return "captcha_unavailable";
  }
}
