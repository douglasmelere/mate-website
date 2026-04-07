"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  BookOpen,
  Code2,
  Terminal,
  ArrowUpRight,
  Puzzle,
  Cpu,
  Radio,
  FileText,
  Video,
  MessageSquare,
} from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardPop: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

type DocCard = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  links: { label: string; href: string }[];
};

const docCards: DocCard[] = [
  {
    icon: Terminal,
    title: "Quickstart",
    description: "Do zero a um dashboard funcional em menos de 15 minutos.",
    links: [
      { label: "Conectar primeiro CLP", href: "#" },
      { label: "Criar primeiro dashboard", href: "#" },
      { label: "Configurar alertas", href: "#" },
    ],
  },
  {
    icon: Cpu,
    title: "Guia de CLPs",
    description: "Configurações passo a passo para os CLPs mais usados no Brasil.",
    links: [
      { label: "Siemens S7-1200 / 1500", href: "#" },
      { label: "Allen-Bradley CompactLogix", href: "#" },
      { label: "Mitsubishi FX5U / iQ-R", href: "#" },
    ],
  },
  {
    icon: Radio,
    title: "Protocolos",
    description: "Referência completa de todos os protocolos suportados.",
    links: [
      { label: "Modbus TCP/RTU", href: "#" },
      { label: "OPC-UA", href: "#" },
      { label: "MQTT / MQTT-SN", href: "#" },
    ],
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "REST API completa para integrar LabMate com seus sistemas.",
    links: [
      { label: "Autenticação (JWT)", href: "#" },
      { label: "Endpoints de dados", href: "#" },
      { label: "Webhooks & eventos", href: "#" },
    ],
  },
  {
    icon: Puzzle,
    title: "Mate Copiloto",
    description: "Como usar a IA generativa para criar e ajustar dashboards.",
    links: [
      { label: "Prompts eficazes", href: "#" },
      { label: "Tipos de widgets suportados", href: "#" },
      { label: "Limites e boas práticas", href: "#" },
    ],
  },
  {
    icon: FileText,
    title: "Referência de Widgets",
    description: "Todos os componentes visuais disponíveis e suas configurações.",
    links: [
      { label: "Gráficos e séries temporais", href: "#" },
      { label: "Gauges e indicadores", href: "#" },
      { label: "Tabelas e relatórios", href: "#" },
    ],
  },
];

const resources = [
  {
    icon: Video,
    label: "Tutoriais em vídeo",
    desc: "YouTube com demos passo a passo",
    href: "#",
  },
  {
    icon: MessageSquare,
    label: "Comunidade Discord",
    desc: "+1.200 integradores ativos",
    href: "#",
  },
  {
    icon: BookOpen,
    label: "Blog técnico",
    desc: "Artigos sobre automação e IoT",
    href: "#",
  },
];

// Simple code snippet component
function CodeSnippet() {
  return (
    <div className="rounded-2xl bg-[#0a0a0a] border border-brand-dark4 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-brand-dark4 bg-brand-dark2/40">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
        <span className="ml-2 text-[10px] text-gray-600 font-mono">labmate-sdk.js</span>
      </div>
      <div className="p-5 font-mono text-[12px] leading-relaxed overflow-x-auto">
        <div>
          <span className="text-gray-600">// Conectar ao CLP via Modbus TCP</span>
        </div>
        <div className="mt-2">
          <span className="text-purple-400">import</span>
          <span className="text-gray-300"> LabMate </span>
          <span className="text-purple-400">from</span>
          <span className="text-brand-green"> &apos;@mate/labmate-sdk&apos;</span>
          <span className="text-gray-300">;</span>
        </div>
        <div className="mt-3">
          <span className="text-purple-400">const</span>
          <span className="text-blue-300"> client</span>
          <span className="text-gray-300"> = </span>
          <span className="text-purple-400">new</span>
          <span className="text-blue-300"> LabMate</span>
          <span className="text-gray-300">{"({"}</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-200">apiKey</span>
          <span className="text-gray-300">: </span>
          <span className="text-brand-green">&apos;lm_prod_...&apos;</span>
          <span className="text-gray-300">,</span>
        </div>
        <div className="text-gray-300">{"});"}</div>
        <div className="mt-3">
          <span className="text-purple-400">await</span>
          <span className="text-gray-300"> client.</span>
          <span className="text-blue-300">device</span>
          <span className="text-gray-300">.</span>
          <span className="text-yellow-300">connect</span>
          <span className="text-gray-300">{"({"}</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-200">protocol</span>
          <span className="text-gray-300">: </span>
          <span className="text-brand-green">&apos;modbus-tcp&apos;</span>
          <span className="text-gray-300">,</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-200">host</span>
          <span className="text-gray-300">: </span>
          <span className="text-brand-green">&apos;192.168.1.10&apos;</span>
          <span className="text-gray-300">,</span>
        </div>
        <div className="pl-4">
          <span className="text-blue-200">port</span>
          <span className="text-gray-300">: </span>
          <span className="text-orange-400">502</span>
          <span className="text-gray-300">,</span>
        </div>
        <div className="text-gray-300">{"});"}</div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-gray-600">// Dados chegando em 100ms ✓</span>
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function Documentacao() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="docs"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="docs-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-green/[0.025] blur-[150px]" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <div className="max-w-xl">
            <span className="tag-badge mb-5 inline-flex">
              <BookOpen className="w-3 h-3" />
              Documentação
            </span>
            <h2
              id="docs-heading"
              className="text-display-lg font-bold text-white text-balance mb-5"
            >
              Tudo que você precisa
              <br />
              <span className="text-gray-500">para integrar de verdade.</span>
            </h2>
            <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed">
              Guias, referências de API e exemplos de código prontos para
              Modbus, OPC-UA, MQTT e mais.
            </p>
          </div>
          <div className="lg:w-[420px] flex-shrink-0">
            <CodeSnippet />
          </div>
        </motion.div>

        {/* Doc cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {docCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardPop}
              className="group rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-5 hover:border-brand-green/25 hover:shadow-[0_0_40px_rgba(124,179,66,0.05)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-brand-green/8 flex items-center justify-center group-hover:bg-brand-green/12 transition-colors duration-200">
                  <card.icon className="w-3.5 h-3.5 text-brand-green" />
                </div>
                <h3 className="text-sm font-semibold text-white">{card.title}</h3>
              </div>

              <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-4">
                {card.description}
              </p>

              <ul className="space-y-1.5">
                {card.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-brand-green transition-colors duration-150 group/link"
                    >
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Resources strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-dark4/60"
        >
          {resources.map((r) => (
            <a
              key={r.label}
              href={r.href}
              className="flex items-center gap-3 px-5 py-3 hover:bg-brand-dark3/40 rounded-xl transition-colors duration-150 group"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-dark3 border border-brand-dark4 flex items-center justify-center flex-shrink-0 group-hover:border-brand-green/20 group-hover:bg-brand-green/8 transition-all duration-200">
                <r.icon className="w-4 h-4 text-gray-500 group-hover:text-brand-green transition-colors duration-200" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {r.label}
                </p>
                <p className="text-[11px] text-gray-600">{r.desc}</p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-600 ml-auto opacity-0 group-hover:opacity-100 group-hover:text-brand-green transition-all duration-150" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
