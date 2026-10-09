"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLead } from "@/context/LeadContext";
import { CheckCircle2, Smartphone, ArrowRight, AlertCircle } from "lucide-react";
import VozPagina from "@/components/VozPagina";

const MODELOS = ["C71", "C73", "Note 70", "Note 80", "P4 Lite", "C100", "Note 60s"];

// 🎲 Chance de cair 98% (o resto cai 95%)
const chance98 = 60;

/**
 * 🕐 Gera um número determinístico baseado no dia atual.
 * Isso faz com que o resultado seja o MESMO durante 24h,
 * e mude automaticamente no dia seguinte.
 */
function sortearDoDia(): number {
  // Pega a data de hoje no formato YYYYMMDD (ex: 20261009)
  const hoje = new Date();
  const semente =
    hoje.getFullYear() * 10000 +
    (hoje.getMonth() + 1) * 100 +
    hoje.getDate();

  // Gera um "número pseudoaleatório" usando a semente do dia
  // (fórmula simples de hash pra dar aparência de aleatório)
  const hash = (semente * 9301 + 49297) % 233280;
  const aleatorio = hash / 233280; // valor entre 0 e 1

  // Decide entre 95 e 98 com base na chance
  return aleatorio * 100 < chance98 ? 98 : 95;
}

export default function ResultadoPage() {
  const router = useRouter();
  const { lead, setLead } = useLead();
  const [porcentagem, setPorcentagem] = useState<number>(0);
  const sorteouRef = useRef(false);

  useEffect(() => {
    if (sorteouRef.current) return;
    sorteouRef.current = true;

    // Se já veio uma porcentagem válida (95 ou 98), usa ela
    if (lead.porcentagem === 95 || lead.porcentagem === 98) {
      setPorcentagem(lead.porcentagem);
      return;
    }

    // Senão, sorteia com base no DIA
    const resultado = sortearDoDia();
    setPorcentagem(resultado);
    setLead({ porcentagem: resultado });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-black relative overflow-hidden">
      <VozPagina arquivo="/audio/voz-resultado.mp3" />

      <div className="absolute w-[600px] h-[600px] bg-realme-yellow/15 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
          >
            <CheckCircle2 size={48} className="text-green-400" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Parabéns,{" "}
            <span className="text-realme-yellow">
              {lead.nome.split(" ")[0] || "cliente"}
            </span>
            !
          </h1>
          <p className="text-gray-400">Você foi pré-aprovado com sucesso.</p>
        </div>

        <div className="bg-realme-card/70 backdrop-blur border border-white/10 rounded-2xl p-8 mb-6 text-center shadow-realme-glow">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">
            Score de Aprovação
          </p>
          <div className="text-6xl md:text-7xl font-black text-realme-yellow mb-2 drop-shadow-[0_0_30px_rgba(255,200,0,0.5)]">
            {porcentagem}%
          </div>

          <div className="flex items-start justify-center gap-2 text-xs text-gray-400 mt-4 max-w-md mx-auto">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-realme-yellow" />
            <p className="text-left">
              A porcentagem pode variar durante a análise final, porém{" "}
              <span className="text-white font-semibold">
                você já está apto para realizar o boleto
              </span>{" "}
              normalmente.
            </p>
          </div>
        </div>

        <div className="bg-realme-card/70 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={18} className="text-realme-yellow" />
            <h3 className="font-semibold">Modelos liberados no seu nome</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {MODELOS.map((m) => (
              <span
                key={m}
                className="px-4 py-2 bg-realme-yellow/10 border border-realme-yellow/40 text-realme-yellow text-sm rounded-lg font-medium hover:bg-realme-yellow/20 transition"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/agendamento")}
          className="w-full flex items-center justify-center gap-2 bg-realme-yellow text-black font-bold py-4 rounded-xl hover:scale-[1.02] hover:shadow-realme-glow-lg transition-all shadow-realme-glow"
        >
          Agendar visita à loja <ArrowRight size={18} />
        </button>
      </motion.div>
    </main>
  );
}