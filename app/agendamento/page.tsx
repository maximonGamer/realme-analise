"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLead } from "@/context/LeadContext";
import {
  Calendar,
  FileText,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import VozPagina from "@/components/VozPagina";

const MODELOS = ["C71", "C73", "Note 70", "Note 80", "P4 Lite", "C100", "Note 60s"];

export default function AgendamentoPage() {
  const { lead, setLead } = useLead();
  const [data, setData] = useState("");
  const [modelo, setModelo] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [hoje, setHoje] = useState("");

  useEffect(() => {
    setHoje(new Date().toISOString().split("T")[0]);
  }, []);

  const handleFinalizar = () => {
    if (!data || !modelo) return;
    setLead({ dataAgendamento: data, modeloEscolhido: modelo });
    setFinalizado(true);
  };

  const gerarResumo = () => {
    const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    return `🟡 *AGENDAMENTO REALME*
━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${lead.nome}
📄 *CPF:* ${lead.cpf}
📱 *Modelo escolhido:* ${modelo}
📅 *Data da visita:* ${dataFormatada}
📊 *Score de aprovação:* ${lead.porcentagem}%
━━━━━━━━━━━━━━━━━━
📌 *Documentos necessários:*
• CNH ou RG original em mãos
• Aceitamos aparelho antigo como entrada
• Entrada a partir de R$ 300 (varia por modelo)
━━━━━━━━━━━━━━━━━━
Aguardo contato para finalizar a negociação! 🤝`;
  };

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(gerarResumo());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      alert("Não foi possível copiar. Selecione manualmente.");
    }
  };

  if (finalizado) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-black relative overflow-hidden">
        <VozPagina arquivo="/audio/voz-agendamento.mp3" />

        <div className="absolute w-[500px] h-[500px] bg-realme-yellow/15 blur-[130px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md text-center bg-realme-card/70 border border-white/10 rounded-2xl p-10 shadow-realme-glow"
        >
          <CheckCircle2 size={64} className="text-green-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-2">Tudo pronto!</h1>
          <p className="text-gray-400 mb-6">
            Seu agendamento foi registrado com sucesso.
          </p>

          <div className="text-left space-y-3 text-sm bg-black/50 rounded-xl p-5 mb-6 border border-white/5">
            <p>
              <span className="text-gray-400">Cliente:</span>{" "}
              <strong>{lead.nome}</strong>
            </p>
            <p>
              <span className="text-gray-400">CPF:</span>{" "}
              <strong>{lead.cpf}</strong>
            </p>
            <p>
              <span className="text-gray-400">Modelo:</span>{" "}
              <strong className="text-realme-yellow">{modelo}</strong>
            </p>
            <p>
              <span className="text-gray-400">Data:</span>{" "}
              <strong>
                {new Date(data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </strong>
            </p>
            <p>
              <span className="text-gray-400">Score:</span>{" "}
              <strong className="text-realme-yellow">{lead.porcentagem}%</strong>
            </p>
          </div>

          <button
            onClick={handleCopiar}
            className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all mb-6 ${
              copiado
                ? "bg-green-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            {copiado ? (
              <>
                <Check size={18} /> Copiado!
              </>
            ) : (
              <>
                <Copy size={18} /> Copiar resumo do agendamento
              </>
            )}
          </button>

          <p className="text-xs text-gray-500">
            Aguarde o contato do nosso consultor para finalizar sua negociação. 🤝
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-black relative overflow-hidden">
      <VozPagina arquivo="/audio/voz-agendamento.mp3" />

      <div className="absolute w-[500px] h-[500px] bg-realme-yellow/10 blur-[130px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold mb-2">Finalizar agendamento</h1>
        <p className="text-gray-400 mb-8">
          Escolha a data da sua visita e o modelo desejado.
        </p>

        <div className="bg-realme-card/70 border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={18} className="text-realme-yellow" />
            <h3 className="font-semibold">Data da visita</h3>
          </div>
          <input
            type="date"
            value={data}
            min={hoje}
            onChange={(e) => setData(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-realme-yellow outline-none"
          />
        </div>

        <div className="bg-realme-card/70 border border-white/10 rounded-2xl p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone size={18} className="text-realme-yellow" />
            <h3 className="font-semibold">Escolha seu modelo</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MODELOS.map((m) => (
              <button
                key={m}
                onClick={() => setModelo(m)}
                className={`py-3 rounded-xl border text-sm font-medium transition ${
                  modelo === m
                    ? "bg-realme-yellow text-black border-realme-yellow shadow-realme-glow"
                    : "bg-black/40 border-white/10 text-gray-300 hover:border-realme-yellow/50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-realme-card/70 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-realme-yellow" />
            <h3 className="font-semibold">Documentos necessários</h3>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>✅ CNH ou RG em mãos (original)</li>
            <li>✅ Aceitamos aparelhos antigos como entrada</li>
            <li>
              ✅ Entrada a partir de{" "}
              <strong className="text-realme-yellow">R$ 300</strong>, variando
              conforme o modelo
            </li>
          </ul>
        </div>

        <button
          disabled={!data || !modelo}
          onClick={handleFinalizar}
          className="w-full flex items-center justify-center gap-2 bg-realme-yellow text-black font-bold py-4 rounded-xl disabled:opacity-30 hover:scale-[1.02] hover:shadow-realme-glow-lg transition-all shadow-realme-glow"
        >
          Confirmar agendamento <ArrowRight size={18} />
        </button>
      </motion.div>
    </main>
  );
}