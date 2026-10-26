import test from "node:test";
import assert from "node:assert/strict";
import {
  ConsultationError,
  fetchConsultation,
} from "../src/services/campaign/consultationService.ts";

const result = {
  ok: true,
  cpf: "529.***.***-25",
  nome: "PARTICIPANTE DE TESTE",
  total: 1,
  numeros: ["000007"],
  por_origem: {},
  campanha: { inicio: "2026-10-01", fim: "2027-01-30" },
  consultedAt: "2026-10-19T12:00:00.000Z",
  inconsistent: false,
};

test("consultation service preserves the internal request and valid response", async (context) => {
  const request = context.mock.method(globalThis, "fetch", async () => Response.json(result));
  assert.deepEqual(await fetchConsultation("52998224725", "test-token"), result);
  const [url, options] = request.mock.calls[0].arguments;
  assert.equal(url, "/api/campanha/consulta");
  assert.equal(options.method, "POST");
  assert.equal(options.cache, "no-store");
  assert.deepEqual(JSON.parse(options.body), { cpf: "52998224725", captchaToken: "test-token" });
});

test("consultation service preserves API error codes", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    Response.json({ ok: false, code: "timeout" }, { status: 504 }),
  );
  await assert.rejects(fetchConsultation("52998224725", "test-token"), (failure) =>
    failure instanceof ConsultationError && failure.code === "timeout",
  );
});

test("consultation service rejects malformed successful responses", async (context) => {
  context.mock.method(globalThis, "fetch", async () =>
    Response.json({ ...result, numeros: [7] }),
  );
  await assert.rejects(fetchConsultation("52998224725", "test-token"), (failure) =>
    failure instanceof ConsultationError && failure.code === "invalid_response",
  );
});
