"use client";
import { createContext, useContext, useState } from "react";
import type { Consultation } from "@/lib/consult";
const Context = createContext<{
  data: Consultation | null;
  setData: (v: Consultation | null) => void;
}>({ data: null, setData: () => {} });
export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<Consultation | null>(null);
  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
}
export const useConsultation = () => useContext(Context);
