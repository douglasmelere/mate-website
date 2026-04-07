"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Factory,
  Zap,
  Wrench,
  FlaskConical,
  Truck,
  Wind,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardPop: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

type UseCase = {
  icon: React.ComponentType<{ className?: string }>;
  industry: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  accent: string;
};

const useCases: UseCase[] = [
  {
    icon: Factory,
    industry: "Manufatura",
    title: "Linha de montagem automotiva",
    description:
      "Monitoramento em tempo real de 47 CLPs distribuídos em 3 linhas de produção. OEE subiu de 72% para 91% em 4 meses.",
    metrics: [
      { label: "OEE", value: "+26%" },
      { label: "Paradas não planejadas", value: "-63%" },
      { label: "CLPs monitorados", value: "47" },
    ],
    tags: ["Modbus TCP", "Siemens S7", "OEE"],
    accent: "#7cb342",
  },
  {
    icon: Zap,
    industry: "Energia",
    title: "Gestão de subestações elétricas",
    description:
      "Dashboard unificado para 12 subestações. Alertas automáticos detectam anomalias antes de virar falha. ROI em 3 meses.",
    metrics: [
      { label: "Subestações", value: "12" },
      { label: "Tempo de resposta", value: "100ms" },
      { label: "Falhas evitadas/mês", value: "8" },
    ],
    tags: ["MQTT", "OPC-UA", "Alertas"],
    accent: "#7cb342",
  },
  {
    icon: Wrench,
    industry: "Manutenção",
    title: "Manutenção preditiva de motores",
    description:
      "Análise de vibração, temperatura e corrente detecta desgaste 3 semanas antes da falha. Zero paradas não planejadas.",
    metrics: [
      { label: "Antecipação de falhas", value: "3 sem." },
      { label: "Custo manutenção", value: "-41%" },
      { label: "Uptime", value: "99.7%" },
    ],
    tags: ["Sensores IoT", "IA preditiva", "Alertas"],
    accent: "#7cb342",
  },
  {
    icon: FlaskConical,
    industry: "Farmacêutico",
    title: "Rastreabilidade de processo",
    description:
      "Conformidade regulatória com rastreio completo de temperatura, umidade e lote em câmaras frias e reatores.",
    metrics: [
      { label: "Pontos rastreados", value: "280" },
      { label: "Auditorias ANVISA", value: "100%" },
      { label: "Relatórios", value: "Auto" },
    ],
    tags: ["LGPD", "Conformidade", "Rastreio"],
    accent: "#7cb342",
  },
  {
    icon: Truck,
    industry: "Logística",
    title: "Controle de frota e armazéns",
    description:
      "Temperatura de câmaras frias, posição de empilhadeiras e nível de estoque integrados num único dashboard.",
    metrics: [
      { label: "Câmaras monitoradas", value: "34" },
      { label: "Desvios de temp.", value: "-78%" },
      { label: "Avarias", value: "-55%" },
    ],
    tags: ["IoT", "GPS", "Alertas"],
    accent: "#7cb342",
  },
  {
    icon: Wind,
    industry: "Energia Renovável",
    title: "Parque eólico offshore",
    description:
      "Telemetria de 60 turbinas, análise de performance por vento e previsão de geração integrada com dados meteorológicos.",
    metrics: [
      { label: "Turbinas", value: "60" },
      { label: "Geração prevista", value: "±2%" },
      { label: "Tempo diagnóstico", value: "-70%" },
    ],
    tags: ["SCADA", "REST API", "BI"],
    accent: "#7cb342",
  },
];

export default function CasosDeUso() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="casos"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="casos-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full bg-brand-green/[0.03] blur-[160px]" />
        <div className="absolute inset-0 grid-lines opacity-15" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <span className="tag-badge mb-5 inline-flex">
            <CheckCircle2 className="w-3 h-3" />
            Casos reais de uso
          </span>
          <h2
            id="casos-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            Chão de fábrica real.
            <br />
            <span className="text-gray-500">Resultados mensuráveis.</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-xl">
            Integradores e engenheiros de automação usando LabMate em produção —
            de montadoras a parques eólicos.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {useCases.map((uc) => (
            <motion.div
              key={uc.title}
              variants={cardPop}
              className="group relative rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-6 overflow-hidden
                hover:border-brand-green/25 hover:shadow-[0_0_50px_rgba(124,179,66,0.05)] transition-all duration-400 cursor-default"
            >
              {/* Top highlight */}
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />

              {/* Hover glow spot */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-brand-green/[0.04] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Industry badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center group-hover:bg-brand-green/12 transition-colors duration-200">
                    <uc.icon className="w-4 h-4 text-brand-green" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    {uc.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm font-semibold text-white mb-2.5 leading-snug group-hover:text-white transition-colors">
                {uc.title}
              </h3>
              <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-5">
                {uc.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {uc.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl bg-brand-dark3/80 border border-brand-dark4 px-2 py-2.5 text-center"
                  >
                    <p className="text-sm font-semibold text-brand-green tabular-nums mb-0.5">
                      {m.value}
                    </p>
                    <p className="text-[9px] text-gray-600 leading-tight">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {uc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-brand-dark3 border border-brand-dark4 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#precos" className="btn-primary">
            Ver planos e preços
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="https://wa.me/5547997847265?text=Ol%C3%A1!%20Tenho%20interesse%20no%20LabMate%20e%20gostaria%20de%20uma%20proposta." target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Falar com um especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}
