"use client";
import { useEffect, useRef } from "react";
import { useAudio } from "@/context/AudioContext";

export default function AudioGlobal() {
  const musicaRef = useRef<HTMLAudioElement>(null);
  const { mutado } = useAudio();

  useEffect(() => {
    const musica = musicaRef.current;
    if (!musica) return;

    musica.volume = 0.3;
    musica.loop = true;

    musica.play().catch(() => {
      const tocarNoClique = () => {
        musica.play().catch(() => {});
        document.removeEventListener("click", tocarNoClique);
      };
      document.addEventListener("click", tocarNoClique);
    });
  }, []);

  useEffect(() => {
    const musica = musicaRef.current;
    if (!musica) return;
    musica.muted = mutado;
    if (!mutado) musica.play().catch(() => {});
  }, [mutado]);

  return (
    <audio ref={musicaRef} src="/audio/musica-fundo.mp3" preload="auto" loop />
  );
}