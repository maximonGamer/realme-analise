"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lead = {
  nome: string;
  cpf: string;
  porcentagem: number;
  dataAgendamento: string;
  modeloEscolhido: string;
};

type Ctx = {
  lead: Lead;
  setLead: (l: Partial<Lead>) => void;
};

const LeadContext = createContext<Ctx | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [lead, setLeadState] = useState<Lead>({
    nome: "",
    cpf: "",
    porcentagem: 0,
    dataAgendamento: "",
    modeloEscolhido: "",
  });

  const setLead = (partial: Partial<Lead>) =>
    setLeadState((prev) => ({ ...prev, ...partial }));

  return (
    <LeadContext.Provider value={{ lead, setLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLead = () => {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead precisa estar dentro do LeadProvider");
  return ctx;
};