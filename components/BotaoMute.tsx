"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export default function BotaoMute() {
  const { mutado, alternarMute } = useAudio();

  return (
    <button
      onClick={alternarMute}
      aria-label={mutado ? "Ativar som" : "Desativar som"}
      className={`fixed top-6 right-6 z-[999] flex items-center gap-2 px-4 py-3 rounded-full border-2 transition-all shadow-2xl ${
        mutado
          ? "bg-black border-realme-yellow text-realme-yellow hover:bg-realme-yellow hover:text-black"
          : "bg-realme-yellow border-realme-yellow text-black hover:scale-105"
      }`}
    >
      {mutado ? <VolumeX size={22} /> : <Volume2 size={22} />}
      <span className="text-sm font-bold">
        {mutado ? "Som desligado" : "Som ligado"}
      </span>
    </button>
  );
}