"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Cpu,
  Radio,
  Globe,
  Shield,
  Zap,
  BarChart3,
  ArrowUpRight,
  Layers,
  GitBranch,
  Lock,
} from "lucide-react";

/* ── Stagger ───────────────────────────────────────────────────────── */
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardPop: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Mini live chart ───────────────────────────────────────────────── */
function LiveChart() {
  const points = [28, 45, 38, 52, 41, 60, 55, 72, 65, 80, 74, 88, 82, 95];
  const maxY = 100;
  const width = 320;
  const height = 70;

  const pathData = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - (p / maxY) * height;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const fillPath = `${pathData} L${width},${height} L0,${height} Z`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-16"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7cb342" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7cb342" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[17, 35, 52].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2={width}
            y2={y}
            stroke="#222"
            strokeWidth="0.5"
          />
        ))}
        <path d={fillPath} fill="url(#liveGrad)" />
        <path
          d={pathData}
          fill="none"
          stroke="#7cb342"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={width}
          cy={height - (points[points.length - 1] / maxY) * height}
          r="3"
          fill="#7cb342"
        />
        <circle
          cx={width}
          cy={height - (points[points.length - 1] / maxY) * height}
          r="6"
          fill="#7cb342"
          opacity="0.15"
        />
      </svg>
      {/* Live badge */}
      <div className="absolute top-0 right-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-green/8 border border-brand-green/15">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
        <span className="text-[9px] text-brand-green font-semibold tracking-wider">
          AO VIVO
        </span>
      </div>
    </div>
  );
}

/* ── Protocol item ─────────────────────────────────────────────────── */
function ProtocolBadge({ name, port }: { name: string; port: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-brand-dark3/80 border border-brand-dark4 group hover:border-brand-green/25 transition-all duration-200">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
          {name}
        </span>
      </div>
      <span className="text-[10px] text-gray-600 font-mono">{port}</span>
    </div>
  );
}

/* ── SaaS advantage list ───────────────────────────────────────────── */
function SaasAdvantageList() {
  const items = [
    {
      icon: Globe,
      title: "Acesso de qualquer lugar",
      desc: "Browser, tablet ou monitor de centro de controle",
    },
    {
      icon: Shield,
      title: "Zero infraestrutura local",
      desc: "Sem servidores SCADA caros para manter",
    },
    {
      icon: Zap,
      title: "Deploy instantâneo",
      desc: "Do sensor ao painel em menos de 15 minutos",
    },
  ];

  return (
    <div className="space-y-3 mt-5">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-3 group">
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-brand-green/8 flex items-center justify-center mt-0.5 group-hover:bg-brand-green/15 transition-colors duration-200">
            <it.icon className="w-3.5 h-3.5 text-brand-green" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">
              {it.title}
            </p>
            <p className="text-[11px] text-gray-500 mt-0.5">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Bento card wrapper ────────────────────────────────────────────── */
function BentoCard({
  children,
  className = "",
  glowOnHover = false,
}: {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}) {
  return (
    <motion.div
      variants={cardPop}
      className={`relative rounded-[20px] bg-brand-dark2 border border-brand-dark4 overflow-hidden
        transition-all duration-400 ease-out cursor-default
        ${glowOnHover ? "hover:border-brand-green/25 hover:shadow-[0_0_50px_rgba(124,179,66,0.06)]" : "hover:border-brand-dark5"}
        ${className}`}
    >
      {/* Top highlight */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  BENTO GRID — Asymmetric ecosystem showcase                       */
/* ═══════════════════════════════════════════════════════════════════ */
export default function BentoGrid() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="produto"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="bento-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-green/[0.03] blur-[160px]" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section header — left-aligned for asymmetry */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <span className="tag-badge mb-5 inline-flex">
            <Layers className="w-3 h-3" />
            Ecossistema LabMate
          </span>
          <h2
            id="bento-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            Tudo que o chão de fábrica
            <br />
            <span className="text-gray-500">precisa. Nada do que não precisa.</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-xl">
            Integração nativa com os protocolos mais usados na automação
            industrial — sem middleware, sem gambiarras.
          </p>
        </motion.div>

        {/* Bento grid — asymmetric 12-col layout */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-auto gap-3.5"
        >
          {/* ── Card 1: Sensores em tempo real (spans 7, tall) ─────── */}
          <BentoCard className="lg:col-span-7 lg:row-span-2 p-6 lg:p-7" glowOnHover>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Sensores em tempo real
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    Amostragem a cada 100ms — sem perder um ponto
                  </p>
                </div>
              </div>
              <a href="#como-funciona" className="flex items-center gap-1 text-[11px] text-brand-green hover:text-brand-greenHover transition-colors">
                Ver tudo <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <LiveChart />

            {/* Readings grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {[
                { l: "Pressão", v: "4.2 bar", d: "+0.1" },
                { l: "Temperatura", v: "72.4°C", d: "-1.2" },
                { l: "Vibração", v: "0.8 mm/s", d: "estável" },
                { l: "Corrente", v: "14.3 A", d: "+0.3" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl bg-brand-dark3/80 border border-brand-dark4 p-2.5 hover:border-brand-green/20 transition-all duration-200"
                >
                  <p className="text-[8px] text-gray-500 uppercase tracking-widest mb-1">
                    {s.l}
                  </p>
                  <p className="text-sm font-semibold text-white tabular-nums">
                    {s.v}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{s.d}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm text-gray-400 font-light leading-relaxed">
              Conecte qualquer sensor analógico ou digital ao LabMate. O dado
              vai do campo para o painel sem passar por planilha nenhuma.
            </p>
          </BentoCard>

          {/* ── Card 2: Integração CLPs (5 cols) ──────────────────── */}
          <BentoCard className="lg:col-span-5 p-6" glowOnHover>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Integração nativa com CLPs
                </h3>
                <p className="text-[11px] text-gray-500">
                  Siemens, Allen-Bradley, Mitsubishi e mais
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <ProtocolBadge name="Modbus TCP/RTU" port=":502" />
              <ProtocolBadge name="OPC-UA" port=":4840" />
              <ProtocolBadge name="EtherNet/IP" port=":44818" />
              <ProtocolBadge name="MQTT Broker" port=":1883" />
              <ProtocolBadge name="REST / Webhooks" port="HTTPS" />
            </div>

            <div className="mt-5 pt-4 border-t border-brand-dark4/60 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                +12 protocolos suportados
              </span>
              <a
                href="#como-funciona"
                className="text-[11px] text-brand-green hover:text-brand-greenHover flex items-center gap-0.5 transition-colors"
              >
                Ver todos <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </BentoCard>

          {/* ── Card 3: 100% SaaS (5 cols) ────────────────────────── */}
          <BentoCard className="lg:col-span-5 p-6" glowOnHover>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                <Globe className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  100% SaaS. Zero servidor local.
                </h3>
                <p className="text-[11px] text-gray-500">
                  Abre no browser, funciona em qualquer lugar
                </p>
              </div>
            </div>
            <SaasAdvantageList />
          </BentoCard>

          {/* ── Card 4: IoT topology (4 cols) ─────────────────────── */}
          <BentoCard className="lg:col-span-4 p-6" glowOnHover>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                <Radio className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Topologia IoT visual
              </h3>
            </div>

            <div className="relative h-36 flex items-center justify-center">
              <svg
                viewBox="0 0 240 130"
                className="w-full h-full"
                aria-hidden="true"
              >
                {[
                  [120, 65, 40, 28],
                  [120, 65, 200, 28],
                  [120, 65, 40, 102],
                  [120, 65, 200, 102],
                  [120, 65, 120, 12],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#2a2a2a"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                ))}
                <circle
                  cx="120"
                  cy="65"
                  r="20"
                  fill="#1a1a1a"
                  stroke="#7cb342"
                  strokeWidth="1.5"
                />
                <text
                  x="120"
                  y="60"
                  textAnchor="middle"
                  fill="#7cb342"
                  fontSize="7"
                  fontWeight="600"
                  fontFamily="Outfit"
                >
                  LAB
                </text>
                <text
                  x="120"
                  y="72"
                  textAnchor="middle"
                  fill="#7cb342"
                  fontSize="7"
                  fontWeight="600"
                  fontFamily="Outfit"
                >
                  MATE
                </text>
                {[
                  { x: 40, y: 28, label: "CLP-01" },
                  { x: 200, y: 28, label: "IoT-02" },
                  { x: 40, y: 102, label: "Sensor" },
                  { x: 200, y: 102, label: "CLP-03" },
                  { x: 120, y: 12, label: "Cloud" },
                ].map((n) => (
                  <g key={n.label}>
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r="11"
                      fill="#1a1a1a"
                      stroke="#333"
                      strokeWidth="1"
                    />
                    <text
                      x={n.x}
                      y={n.y + 3}
                      textAnchor="middle"
                      fill="#a3a3a3"
                      fontSize="5.5"
                      fontFamily="Outfit"
                    >
                      {n.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mt-2">
              Visualize toda a topologia da sua rede industrial. Identifique
              gargalos e falhas antes que parem a linha.
            </p>
          </BentoCard>

          {/* ── Card 5: Alertas (4 cols) ───────────────────────────── */}
          <BentoCard className="lg:col-span-4 p-6" glowOnHover>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Alertas & automação de eventos
              </h3>
            </div>

            <div className="space-y-2">
              {[
                {
                  trigger: "Temperatura > 80°C",
                  action: "Notificação WhatsApp",
                  active: true,
                },
                {
                  trigger: "CLP-02 offline",
                  action: "Alerta e-mail + SMS",
                  active: true,
                },
                {
                  trigger: "Produção < 700 pçs/h",
                  action: "Criar ordem de manutenção",
                  active: false,
                },
              ].map((rule) => (
                <div
                  key={rule.trigger}
                  className="rounded-xl bg-brand-dark3/80 border border-brand-dark4 p-3 group hover:border-brand-green/20 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-medium text-gray-300 group-hover:text-white transition-colors">
                        {rule.trigger}
                      </p>
                      <p className="text-[10px] text-gray-600 mt-0.5">
                        → {rule.action}
                      </p>
                    </div>
                    <div
                      className={`flex-shrink-0 w-6 h-3.5 rounded-full transition-colors duration-200 ${rule.active ? "bg-brand-green" : "bg-brand-dark5"}`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5 ${rule.active ? "translate-x-3" : "translate-x-0.5"}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── Card 6: Segurança (4 cols) ─────────────────────────── */}
          <BentoCard className="lg:col-span-4 p-6" glowOnHover>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-green/8 flex items-center justify-center">
                <Lock className="w-4 h-4 text-brand-green" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                Segurança & controle de acesso
              </h3>
            </div>

            <div className="space-y-3">
              {[
                "Criptografia TLS 1.3",
                "Autenticação MFA",
                "Permissões por projeto",
                "Logs de auditoria",
                "LGPD compliant",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-brand-green/12 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-2.5 h-2.5 text-brand-green"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-400">{f}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  );
}
