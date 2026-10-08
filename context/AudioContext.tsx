"use client";
import { createContext, useContext, useState, useRef, ReactNode } from "react";

type AudioCtx = {
  mutado: boolean;
  alternarMute: () => void;
  vozAtual: React.MutableRefObject<HTMLAudioElement | null>;
  pararVozAtual: () => void;
};

const AudioContext = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [mutado, setMutado] = useState(false);
  const vozAtual = useRef<HTMLAudioElement | null>(null);

  const alternarMute = () => setMutado((m) => !m);

  // 🛑 Para qualquer voz que esteja tocando
  const pararVozAtual = () => {
    if (vozAtual.current) {
      vozAtual.current.pause();
      vozAtual.current.currentTime = 0;
      vozAtual.current = null;
    }
  };

  return (
    <AudioContext.Provider
      value={{ mutado, alternarMute, vozAtual, pararVozAtual }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio precisa estar dentro do AudioProvider");
  return ctx;
};