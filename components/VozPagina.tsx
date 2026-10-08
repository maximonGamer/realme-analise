"use client";
import { useEffect, useRef } from "react";
import { useAudio } from "@/context/AudioContext";

export default function VozPagina({ arquivo }: { arquivo: string }) {
  const vozRef = useRef<HTMLAudioElement | null>(null);
  const { mutado, vozAtual, pararVozAtual } = useAudio();

  useEffect(() => {
    const voz = vozRef.current;
    if (!voz) return;

    pararVozAtual();
    vozAtual.current = voz;

    voz.pause();
    voz.currentTime = 0;
    voz.volume = 1;
    voz.muted = mutado;

    const playPromise = voz.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const tocarNoClique = () => {
          if (vozRef.current) {
            vozRef.current.play().catch(() => {});
          }
          document.removeEventListener("click", tocarNoClique);
        };
        document.addEventListener("click", tocarNoClique, { once: true });
      });
    }

    return () => {
      try {
        voz.pause();
        voz.currentTime = 0;
        voz.src = voz.src;
      } catch {}
      if (vozAtual.current === voz) {
        vozAtual.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arquivo]);

  useEffect(() => {
    const voz = vozRef.current;
    if (!voz) return;
    voz.muted = mutado;
    if (!mutado && voz.paused && voz.currentTime > 0) {
      voz.play().catch(() => {});
    }
  }, [mutado]);

  return <audio ref={vozRef} src={arquivo} preload="auto" />;
}