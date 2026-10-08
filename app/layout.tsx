import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeadProvider } from "@/context/LeadContext";
import { AudioProvider } from "@/context/AudioContext";
import AudioGlobal from "@/components/AudioGlobal";
import BotaoMute from "@/components/BotaoMute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realme | Análise de Aprovação",
  description: "Análise de crédito exclusiva Realme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black`}>
        <AudioProvider>
          <LeadProvider>
            {/* 🎵 Música de fundo (toca em todas as páginas) */}
            <AudioGlobal />
            {/* 🔇 Botão mute global */}
            <BotaoMute />
            {children}
          </LeadProvider>
        </AudioProvider>
      </body>
    </html>
  );
}