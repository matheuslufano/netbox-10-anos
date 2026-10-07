export type Consultation = {
  ok: true;
  cpf: string;
  nome: string;
  total: number;
  numeros: string[];
  por_origem: Record<string, { acoes: number; numeros: number }>;
  campanha: { inicio: string; fim: string };
  consultedAt: string;
  inconsistent: boolean;
};
export function digits(value: string) {
  return value.replace(/\D/g, "");
}
export function validCPF(input: string) {
  const c = digits(input);
  if (!/^\d{11}$/.test(c) || /^(\d)\1{10}$/.test(c)) return false;
  for (let n = 9; n <= 10; n++) {
    const sum = c
      .slice(0, n)
      .split("")
      .reduce((s, x, i) => s + Number(x) * (n + 1 - i), 0);
    if (((sum * 10) % 11) % 10 !== Number(c[n])) return false;
  }
  return true;
}
export function maskCPF(value: string) {
  const d = digits(value).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}
const iso = /^\d{4}-\d{2}-\d{2}$/;
export function parseResponse(
  v: unknown,
): Omit<Consultation, "consultedAt" | "inconsistent"> | null {
  if (!v || typeof v !== "object") return null;
  const x = v as Record<string, unknown>;
  if (
    x.ok !== true ||
    typeof x.nome !== "string" ||
    x.nome.length === 0 ||
    typeof x.cpf !== "string" ||
    !/^\d{3}\.\*{3}\.\*{3}-\d{2}$/.test(x.cpf) ||
    !Number.isSafeInteger(x.total) ||
    Number(x.total) < 0 ||
    !Array.isArray(x.numeros) ||
    !x.numeros.every((n) => typeof n === "string" && /^\d+$/.test(n)) ||
    !x.por_origem ||
    typeof x.por_origem !== "object" ||
    Array.isArray(x.por_origem) ||
    !x.campanha ||
    typeof x.campanha !== "object"
  )
    return null;
  const p = x.campanha as Record<string, unknown>;
  if (
    typeof p.inicio !== "string" ||
    typeof p.fim !== "string" ||
    !iso.test(p.inicio) ||
    !iso.test(p.fim)
  )
    return null;
  const origins = x.por_origem as Record<string, unknown>;
  if (
    !Object.values(origins).every(
      (v) =>
        !!v &&
        typeof v === "object" &&
        Number.isSafeInteger((v as Record<string, unknown>).acoes) &&
        Number((v as Record<string, unknown>).acoes) >= 0 &&
        Number.isSafeInteger((v as Record<string, unknown>).numeros) &&
        Number((v as Record<string, unknown>).numeros) >= 0,
    )
  )
    return null;
  return {
    ok: true,
    cpf: x.cpf,
    nome: x.nome,
    total: x.total,
    numeros: x.numeros,
    por_origem: origins,
    campanha: { inicio: p.inicio, fim: p.fim },
  } as Omit<Consultation, "consultedAt" | "inconsistent">;
}
