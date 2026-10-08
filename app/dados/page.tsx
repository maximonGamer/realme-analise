"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLead } from "@/context/LeadContext";
import { ArrowRight, User, CreditCard, AlertCircle } from "lucide-react";
import VozPagina from "@/components/VozPagina";

// 🛡️ VALIDAÇÃO DE CPF REAL (com dígitos verificadores)
function validarCPF(cpf: string): boolean {
  const numeros = cpf.replace(/\D/g, "");

  // Precisa ter 11 dígitos
  if (numeros.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais (111.111.111-11, 222.222.222-22, etc.)
  if (/^(\d)\1{10}$/.test(numeros)) return false;

  // Valida 1º dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(numeros.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(numeros.charAt(9))) return false;

  // Valida 2º dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(numeros.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(numeros.charAt(10))) return false;

  return true;
}

export default function DadosPage() {
  const router = useRouter();
  const { lead, setLead } = useLead();
  const [nome, setNome] = useState(lead.nome);
  const [cpf, setCpf] = useState(lead.cpf);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const formatCPF = (v: string) =>
    v.replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

  const cpfNumeros = cpf.replace(/\D/g, "");
  const cpfValido = validarCPF(cpf);
  const nomeValido = nome.trim().length > 2;

  // Erros separados pra mostrar mensagens certas
  const erroNome = tentouEnviar && !nomeValido;
  const erroCPF = tentouEnviar && cpfNumeros.length > 0 && !cpfValido;
  const cpfIncompleto = cpfNumeros.length > 0 && cpfNumeros.length < 11;

  const valido = nomeValido && cpfValido;

  const handleNext = () => {
    setTentouEnviar(true);
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
          {/* NOME */}
          <div>
            <label className="text-xs uppercase text-gray-400 mb-2 block">
              Nome completo
            </label>
            <div
              className={`flex items-center gap-3 bg-black/60 border rounded-xl px-4 py-3 transition ${
                erroNome
                  ? "border-red-500"
                  : "border-white/10 focus-within:border-realme-yellow"
              }`}
            >
              <User
                size={18}
                className={erroNome ? "text-red-500" : "text-realme-yellow"}
              />
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João da Silva"
                className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              />
            </div>
            {erroNome && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle size={12} /> Informe seu nome completo
              </p>
            )}
          </div>

          {/* CPF */}
          <div>
            <label className="text-xs uppercase text-gray-400 mb-2 block">
              CPF
            </label>
            <div
              className={`flex items-center gap-3 bg-black/60 border rounded-xl px-4 py-3 transition ${
                erroCPF
                  ? "border-red-500"
                  : "border-white/10 focus-within:border-realme-yellow"
              }`}
            >
              <CreditCard
                size={18}
                className={erroCPF ? "text-red-500" : "text-realme-yellow"}
              />
              <input
                value={cpf}
                onChange={(e) => setCpf(formatCPF(e.target.value))}
                placeholder="000.000.000-00"
                inputMode="numeric"
                className="bg-transparent outline-none w-full text-white placeholder-gray-600"
              />
            </div>
            {erroCPF && (
              <p className="flex items-center gap-1 text-red-500 text-xs mt-2">
                <AlertCircle size={12} /> CPF inválido — verifique os números
              </p>
            )}
            {cpfIncompleto && !erroCPF && (
              <p className="text-gray-500 text-xs mt-2">
                Continue digitando... ({cpfNumeros.length}/11)
              </p>
            )}
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