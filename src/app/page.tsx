import type { Metadata } from "next";
// Trigger commit for i18n deployment verification
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ComoFunciona from "@/components/ComoFunciona";
import InteractiveSection from "@/components/InteractiveSection";
import CasosDeUso from "@/components/CasosDeUso";
import Precos from "@/components/Precos";
import Documentacao from "@/components/Documentacao";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LabMate — Dashboards Industriais e IoT em Tempo Real",
  description:
    "Plataforma SaaS para criação de dashboards industriais inteligentes. Conecte CLPs, sensores e dispositivos IoT a painéis visuais dinâmicos — com IA generativa ou drag-and-drop.",
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-brand-bg">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Bento Grid — produto */}
      <BentoGrid />

      {/* Como Funciona — Perfis B2B2B + Módulos */}
      <ComoFunciona />

      {/* Interactive — Copiloto vs Manual */}
      <InteractiveSection />

      {/* Casos de Uso */}
      <CasosDeUso />

      {/* Preços */}
      <Precos />

      {/* Documentação */}
      <Documentacao />

      {/* Footer */}
      <Footer />
    </main>
  );
}
