"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import VozPagina from "@/components/VozPagina";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-black">
      {/* 🌟 Glow amarelo */}
      <div className="absolute w-[600px] h-[600px] bg-realme-yellow/20 blur-[130px] rounded-full pointer-events-none" />

      {/* 🎙️ Voz desta página */}
      <VozPagina arquivo="/audio/boas-vindas.mp3" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* ✅ Símbolo "R" REMOVIDO */}

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Seja bem-vindo à{" "}
          <span className="text-realme-yellow">Realme</span>
        </h1>
        <p className="text-lg text-gray-300 mb-2">
          Iremos realizar sua análise de crédito agora mesmo.
        </p>
        <p className="text-sm text-gray-500 mb-10">
          Processo rápido, seguro e 100% digital.
        </p>

        <button
          onClick={() => router.push("/dados")}
          className="group flex items-center gap-3 bg-realme-yellow text-black font-bold px-10 py-4 rounded-xl hover:scale-105 hover:shadow-realme-glow-lg transition-all duration-300 shadow-realme-glow mx-auto"
        >
          Iniciar Análise
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </button>
      </motion.div>
    </main>
  );
}