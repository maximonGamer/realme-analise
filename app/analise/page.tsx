"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLead } from "@/context/LeadContext";
import { ShieldCheck } from "lucide-react";
import VozPagina from "@/components/VozPagina";

const frases = [
  "Verificando seu CPF...",
  "Consultando histórico de crédito...",
  "Analisando perfil de compra...",
  "Cruzando dados com parceiros...",
  "Calculando limite disponível...",
  "Gerando resultado final...",
];

const chance98 = 60;

export default function AnalisePage() {
  const router = useRouter();
  const { setLead } = useLead();
  const [progresso, setProgresso] = useState(0);
  const [frase, setFrase] = useState(0);
  const jaRedirecionou = useRef(false);

  useEffect(() => {
    const total = 15000; // 15 segundos
    const inicio = Date.now();

    const interval = setInterval(() => {
      const passado = Date.now() - inicio;
      const pct = Math.min(100, (passado / total) * 100);
      setProgresso(pct);
      setFrase(Math.min(frases.length - 1, Math.floor((pct / 100) * frases.length)));

      // 🎯 Quando completar, redireciona
      if (passado >= total) {
        clearInterval(interval);

        // 🛡️ Trava pra garantir que só redireciona 1x
        if (jaRedirecionou.current) return;
        jaRedirecionou.current = true;

        // 🎲 Sorteia 89 ou 98
        const sorteio = Math.random() * 100;
        const resultado = sorteio < chance98 ? 98 : 89;

        setLead({ porcentagem: resultado });
        router.push("/resultado");
      }
    }, 100);

    // 🧹 Cleanup — se sair da página, para o timer
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-black relative overflow-hidden">
      <VozPagina arquivo="/audio/voz-analise.mp3" />

      <div className="absolute w-[500px] h-[500px] bg-realme-yellow/15 blur-[130px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="relative w-36 h-36 mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-realme-yellow border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={44} className="text-realme-yellow" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Analisando seu perfil</h2>
        <p className="text-gray-400 text-sm mb-8">
          Certo, agora só aguarde um instante...
        </p>

        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-realme-yellow to-realme-yellow-bright shadow-realme-glow"
            style={{ width: `${progresso}%` }}
          />
        </div>

        <p className="text-realme-yellow text-sm font-medium h-6">{frases[frase]}</p>
        <p className="text-gray-500 text-xs mt-2">
          {Math.floor(progresso)}% concluído
        </p>
      </motion.div>
    </main>
  );
}