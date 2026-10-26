import { parseResponse, type Consultation } from "../../utils/campaign/consult.ts";

/** Falha de consulta com o mesmo código público retornado pela API da campanha. */
export class ConsultationError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.code = code;
    this.name = "ConsultationError";
  }
}

/**
 * Consulta somente a API interna e valida o contrato antes de entregá-lo à interface.
 * Não persiste CPF ou resultado; falhas HTTP preservam o código da API.
 */
export async function fetchConsultation(cpf: string, captchaToken: string): Promise<Consultation> {
  const response = await fetch("/api/campanha/consulta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, captchaToken }),
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) throw new ConsultationError(result?.code ?? "unknown_error");

  const parsed = parseResponse(result);
  if (
    !parsed ||
    typeof result.consultedAt !== "string" ||
    typeof result.inconsistent !== "boolean"
  ) {
    throw new ConsultationError("invalid_response");
  }

  return {
    ...parsed,
    consultedAt: result.consultedAt,
    inconsistent: result.inconsistent,
  };
}
