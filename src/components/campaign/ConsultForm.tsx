"use client";
import styles from "./ConsultForm.module.css";
import stylesAccessibility from "../ui/Accessibility.module.css";
import stylesButton from "../ui/Button.module.css";
import { ConsultationError, fetchConsultation } from "../../services/campaign/consultationService";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { maskCPF, validCPF } from "@/utils/campaign/consult";
import { useConsultation } from "@/context/campaign/ConsultationProvider";
import { PrivacyNote } from "@/components/campaign/PrivacyNote";
const messages: Record<string, string> = {
  invalid_cpf: "CPF inválido. Confira os 11 dígitos.",
  not_confirmed: "A participação não foi confirmada pelo serviço. Confira os dados e tente novamente.",
  timeout: "A consulta demorou mais que o esperado. Tente novamente.",
  connection_error: "Falha de conexão. Tente novamente.",
  invalid_response: "O serviço retornou uma resposta inválida. Tente novamente.",
  upstream_error: "O serviço está indisponível. Tente novamente.",
  not_configured: "A integração ainda não está configurada.",
};
/** Valida a entrada, consulta o serviço e abre o painel com o resultado em memória. */
export function ConsultForm() {
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setData } = useConsultation();
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!validCPF(cpf)) {
      setError(messages.invalid_cpf);
      return;
    }
    setLoading(true);
    try {
      setData(await fetchConsultation(cpf));
      router.push("/cliente/10-anos");
    }
    catch (failure) {
      setError(
        failure instanceof ConsultationError
          ? messages[failure.code] ?? "Não foi possível concluir a consulta. Tente novamente."
          : messages.connection_error,
      );
    }
    finally {
      setLoading(false);
    }
  }
  return (<form className={styles.consultFormRoot} data-ui="consult-card" id="consulta" onSubmit={submit} noValidate>
    <div>
      <h2>Consulte sua participação</h2>
      <p>Informe seu CPF para acompanhar seus números da sorte.</p>
    </div>
    <div className={styles.consultFormConsultControls} data-ui="consult-controls">
      <label data-ui="accessibility-sr-only" htmlFor="cpf" className={stylesAccessibility.accessibilitySrOnly}>
        CPF
      </label>
      <input data-ui="consult-form-input"
        id="cpf"
        name="cpf"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="000.000.000-00"
        maxLength={14}
        value={cpf}
        onChange={(e) => setCpf(maskCPF(e.target.value))}
        aria-invalid={!!error}
        aria-describedby={error ? "consult-error" : undefined}
      />
      <button
        className={stylesButton.button} data-ui="button"
        type="submit"
        disabled={loading}
        aria-label={loading ? "Consultando..." : "Consultar"}
      >
        <Search size={18} />
        <span data-ui="consult-form-consult-submit-label" className={styles.consultFormConsultSubmitLabel}>
          {loading ? "Consultando..." : "Consultar"}
        </span>
      </button>
      <PrivacyNote />
    </div>
    {error && (<p id="consult-error" role="alert" className={styles.consultFormFormError} data-ui="form-error">
      {error}{" "}
      <button type="submit" className={stylesButton.buttonTextLink} data-ui="text-link">
        Tentar novamente
      </button>
    </p>)}
  </form>);
}
