"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLead } from "@/context/LeadContext";
import { ArrowRight, User, CreditCard } from "lucide-react";
import VozPagina from "@/components/VozPagina";

export default function DadosPage() {
  const router = useRouter();
  const { lead, setLead } = useLead();
  const [nome, setNome] = useState(lead.nome);
  const [cpf, setCpf] = useState(lead.cpf);

  const formatCPF = (v: string) =>
    v.replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const valido = nome.trim().length > 2 && cpf.replace(/\D/g, "").length === 11;

  const handleNext = () => {
    if (!valido) return;
    setLead({ nome, cpf });
    router.push("/analise");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-black relative overflow-hidden">
      <VozPagina arquivo="/audio/voz-dados.mp3" />

      <div className="absolute w-[500px] h-[500px] bg-realme-yellow/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-full max-w-lg bg-realme-card/70 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-realme-glow"
      >
        <h2 className="text-2xl font-bold mb-2">Vamos começar</h2>
        <p className="text-gray-400 text-sm mb-8">
          Com gentileza, informe seus dados para prosseguirmos com a análise.
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase text-gray-400 mb-2 block">
              Nome completo
            </label>
            <div className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus-within:border-realme-yellow transition">
              <User size={18} className="text-realme-yellow" />
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João da Silva"
                className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase text-gray-400 mb-2 block">
              CPF
            </label>
            <div className="flex items-center gap-3 bg-black/60 border border-white/10 rounded-xl px-4 py-3 focus-within:border-realme-yellow transition">
              <CreditCard size={18} className="text-realme-yellow" />
              <input
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                placeholder="000.000.000-00"
                inputMode="numeric"
                className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              />
            </div>
          </div>
        </div>

        <button
          disabled={!valido}
          onClick={handleNext}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-realme-yellow text-black font-bold py-4 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-realme-glow-lg transition-all"
        >
          Continuar <ArrowRight size={18} />
        </button>
      </motion.div>
    </main>
  );
}