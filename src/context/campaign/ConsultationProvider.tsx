"use client";
import { createContext, useContext, useState } from "react";
import type { Consultation } from "@/utils/campaign/consult";
const Context = createContext<{
  data: Consultation | null;
  setData: (v: Consultation | null) => void;
}>({ data: null, setData: () => { } });
/** Mantém o resultado da consulta apenas em memória, compartilhado entre as rotas. */
export function ConsultationProvider({ children, }: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Consultation | null>(null);
  return (<Context.Provider value={{ data, setData }}>{children}</Context.Provider>);
}
/** Acessa o resultado temporário e a função de atualização do contexto da aba. */
export const useConsultation = () => useContext(Context);
