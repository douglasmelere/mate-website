"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Cpu,
  Wifi,
  TrendingUp,
  Activity,
  BarChart3,
  Thermometer,
  Gauge,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { useLanguage } from "@/lib/i18n/context";

/* ── Stagger orchestration ─────────────────────────────────────────── */
const orchestrate: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ── Typewriter — cycles through industrial phrases ──────────────── */
function TypewriterText({ phrases }: { phrases: string[] }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 2200);
      return () => clearTimeout(t);
    }

    const current = phrases[phraseIndex];

    if (!deleting && charIndex === current.length) {
      setPaused(true);
      setDeleting(true);
      return;
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const speed = deleting ? 30 : 55;
    const t = setTimeout(() => {
      setCharIndex((c) => c + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(t);
  }, [charIndex, deleting, paused, phraseIndex, phrases]);

  return (
    <span className="text-brand-green glow-green-text">
      {phrases[phraseIndex].slice(0, charIndex)}
      <span className="animate-[blinkCursor_1s_step-end_infinite] text-brand-green/80">
        ▍
      </span>
    </span>
  );
}

/* ── Floating metric card — used around the dashboard ────────────── */
function FloatingMetric({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendDir,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit: string;
  trend?: string;
  trendDir?: "up" | "down";
  className?: string;
}) {
  return (
    <div
      className={`card-surface rounded-2xl p-3.5 min-w-[150px] backdrop-blur-sm ${className ?? ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
          {label}
        </span>
        <div className="w-6 h-6 rounded-lg bg-brand-green/10 flex items-center justify-center">
          <Icon className="w-3 h-3 text-brand-green" />
        </div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-semibold text-white tabular-nums">
          {value}
        </span>
        <span className="text-xs text-gray-500">{unit}</span>
      </div>
      {trend && (
        <div
          className={`flex items-center gap-1 mt-1.5 text-[10px] font-medium ${trendDir === "up" ? "text-brand-green" : "text-red-400"}`}
        >
          <TrendingUp
            className={`w-2.5 h-2.5 ${trendDir === "down" ? "rotate-180" : ""}`}
          />
          {trend}
        </div>
      )}
      {/* Sparkline */}
      <div className="mt-2 h-8 relative overflow-hidden">
        <svg
          viewBox="0 0 140 32"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`fg-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7cb342" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#7cb342" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,24 C18,22 28,12 42,14 C56,16 65,6 84,8 C103,10 112,18 140,4"
            fill="none"
            stroke="#7cb342"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M0,24 C18,22 28,12 42,14 C56,16 65,6 84,8 C103,10 112,18 140,4 L140,32 L0,32 Z"
            fill={`url(#fg-${label})`}
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Connection status badges ─────────────────────────────────────── */
function ConnectionPill({
  label,
  status,
}: {
  label: string;
  status: "online" | "warning";
}) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-dark2/80 border border-brand-dark4 text-[11px] text-gray-500 backdrop-blur-sm">
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "online" ? "bg-brand-green" : "bg-yellow-400"} animate-pulse`}
      />
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  HERO — "Show, Don't Tell" — Dashboard as centerpiece             */
/* ═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const { t, locale } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const dashY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const dashScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-label="Hero — LabMate dashboards industriais"
    >
      {/* ── Background glows ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Main radial glow — massive and subtle */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full bg-brand-green/[0.04] blur-[180px]" />
        {/* Accent glow — offset left for asymmetry */}
        <div className="absolute top-[15%] -left-[10%] w-[500px] h-[500px] rounded-full bg-brand-green/[0.03] blur-[140px]" />
        {/* Grid lines */}
        <div className="absolute inset-0 grid-lines opacity-30" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_80%)]" />
      </div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full pt-24 sm:pt-26 lg:pt-28"
      >
        {/* Copy — centered, massively weighted headline */}
        <motion.div
          variants={orchestrate}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto mb-10 lg:mb-12"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="tag-badge">
              <Zap className="w-3 h-3" />
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-display-xl text-white text-balance mb-6"
          >
            {t.hero.headline}
            <br />
            <TypewriterText phrases={t.hero.phrases} />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-gray-400 font-light leading-relaxed text-balance mb-7 max-w-2xl mx-auto"
          >
            {t.hero.sub}{" "}
            <span className="text-gray-200 font-medium">{t.hero.subHighlight}</span>{" "}
            {locale === "pt"
              ? "a dashboards visuais acionáveis — sem servidor local, sem infraestrutura, sem planilha."
              : locale === "en"
              ? "to actionable visual dashboards — no local server, no infrastructure, no spreadsheets."
              : "a paneles visuales accionables — sin servidor local, sin infraestructura, sin planillas."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-5"
          >
            <Link href="#precos" className="btn-primary">
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#demo" className="btn-ghost">
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Protocol connections — infinite marquee */}
          <motion.div variants={fadeUp} className="relative w-full overflow-hidden">
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-bg to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-bg to-transparent" />
            <Marquee duration="28s" gap="0.5rem" pauseOnHover repeat={3}>
              {[
                { label: "Modbus TCP", status: "online" as const },
                { label: "OPC-UA", status: "online" as const },
                { label: "MQTT", status: "online" as const },
                { label: "REST API", status: "online" as const },
                { label: "EtherNet/IP", status: "online" as const },
                { label: "Profibus DP", status: "online" as const },
                { label: "BACnet/IP", status: "online" as const },
                { label: "DNP3", status: "online" as const },
                { label: "CANopen", status: "warning" as const },
                { label: "LoRaWAN", status: "online" as const },
                { label: "Zigbee", status: "online" as const },
                { label: "SNMP", status: "online" as const },
              ].map((p) => (
                <ConnectionPill key={p.label} label={p.label} status={p.status} />
              ))}
            </Marquee>
          </motion.div>
        </motion.div>

        {/* ── Dashboard mockup — CENTERPIECE ─────────────────────────── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          style={{ y: dashY, scale: dashScale }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow behind the dashboard */}
          <div
            className="absolute -inset-12 rounded-[40px] bg-brand-green/[0.06] blur-[80px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Main frame */}
          <div className="relative rounded-3xl card-surface-elevated overflow-hidden shadow-[0_0_100px_rgba(124,179,66,0.1),0_25px_80px_rgba(0,0,0,0.6)]">
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-brand-dark4 bg-brand-dark2/60">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 max-w-md mx-auto rounded-lg bg-brand-dark3/80 flex items-center px-3 gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-green/50" />
                  <span className="text-[10px] text-gray-600 font-mono">
                    labmate.app/dashboard/production-line-01
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-brand-green/10 flex items-center justify-center">
                  <Activity className="w-3 h-3 text-brand-green" />
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-4 sm:p-5 bg-gradient-to-br from-[#151515] via-[#131313] to-[#0e0e0e]">
              {/* Top metrics row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
                {[
                  { l: t.hero.dashProduction, v: "847", u: "pçs/h", c: "#7cb342", icon: BarChart3 },
                  { l: "OEE", v: "94.2", u: "%", c: "#7cb342", icon: Gauge },
                  { l: t.hero.dashTempCLP, v: "42", u: "°C", c: "#7cb342", icon: Thermometer },
                  { l: t.hero.dashStops, v: "2", u: "min", c: "#f59e0b", icon: Zap },
                ].map((m) => (
                  <div
                    key={m.l}
                    className="rounded-xl bg-brand-dark2/80 border border-brand-dark4/60 p-3 group hover:border-brand-green/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">
                        {m.l}
                      </p>
                      <m.icon className="w-3 h-3 text-gray-600 group-hover:text-brand-green transition-colors duration-300" />
                    </div>
                    <p
                      className="text-lg font-semibold tabular-nums"
                      style={{ color: m.c }}
                    >
                      {m.v}{" "}
                      <span className="text-[10px] text-gray-500 font-normal">
                        {m.u}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart + gauge row */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-2.5 mb-3">
                {/* Chart */}
                <div className="rounded-2xl bg-brand-dark2/80 border border-brand-dark4/60 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-brand-green" />
                      <span className="text-xs font-medium text-gray-300">
                        {t.hero.dashLine}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-600">
                      {t.hero.dashLast8h}
                    </span>
                  </div>
                  <svg
                    viewBox="0 0 480 90"
                    className="w-full h-20"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGHero"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#7cb342"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#7cb342"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    {[22, 44, 66].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="480"
                        y2={y}
                        stroke="#222"
                        strokeWidth="0.5"
                      />
                    ))}
                    <path
                      d="M0,68 C35,62 55,45 90,48 C125,51 140,34 175,32 C210,30 235,40 270,36 C305,32 325,16 365,13 C405,10 430,22 480,20"
                      fill="none"
                      stroke="#7cb342"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,68 C35,62 55,45 90,48 C125,51 140,34 175,32 C210,30 235,40 270,36 C305,32 325,16 365,13 C405,10 430,22 480,20 L480,90 L0,90 Z"
                      fill="url(#chartGHero)"
                    />
                    {/* Current point */}
                    <circle cx="480" cy="20" r="3" fill="#7cb342" />
                    <circle
                      cx="480"
                      cy="20"
                      r="6"
                      fill="#7cb342"
                      opacity="0.2"
                    />
                  </svg>
                </div>

                {/* Status + Gauge sidebar */}
                <div className="space-y-2.5 hidden sm:block">
                  {/* Gauge */}
                  <div className="rounded-2xl bg-brand-dark2/80 border border-brand-dark4/60 p-3 flex flex-col items-center">
                    <div className="flex items-center gap-1.5 self-start mb-2">
                      <Thermometer className="w-3 h-3 text-orange-400" />
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                        {t.hero.dashMainMotor}
                      </span>
                    </div>
                    <svg viewBox="0 0 100 60" className="w-20 h-12">
                      <path
                        d="M10,55 A45,45 0 0,1 90,55"
                        fill="none"
                        stroke="#222"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10,55 A45,45 0 0,1 90,55"
                        fill="none"
                        stroke="#7cb342"
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray="141"
                        strokeDashoffset="42"
                      />
                      <text
                        x="50"
                        y="52"
                        textAnchor="middle"
                        fill="white"
                        fontSize="13"
                        fontWeight="600"
                        fontFamily="Outfit, sans-serif"
                      >
                        42°C
                      </text>
                    </svg>
                  </div>

                  {/* CLP Status */}
                  <div className="rounded-2xl bg-brand-dark2/80 border border-brand-dark4/60 p-3">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Cpu className="w-3 h-3 text-brand-green" />
                      <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                        {t.hero.dashStatusCLPs}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: "S7-1200", ok: true },
                        { name: "CompactLogix", ok: true },
                        { name: "FX5U", ok: false },
                      ].map((clp) => (
                        <div
                          key={clp.name}
                          className="flex items-center justify-between"
                        >
                          <span className="text-[10px] text-gray-400 font-mono">
                            {clp.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${clp.ok ? "bg-brand-green" : "bg-yellow-500"} animate-pulse`}
                            />
                            <span
                              className={`text-[9px] ${clp.ok ? "text-brand-green" : "text-yellow-500"}`}
                            >
                              {clp.ok ? "OK" : "⚠"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom row — sensor readings */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { l: t.hero.dashPressure, v: "4.2", u: "bar" },
                  { l: t.hero.dashVibration, v: "0.8", u: "mm/s" },
                  { l: t.hero.dashCurrent, v: "14.3", u: "A" },
                  { l: t.hero.dashFlow, v: "22.1", u: "m³/h" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl bg-brand-dark2/60 border border-brand-dark4/40 px-3 py-2"
                  >
                    <p className="text-[8px] text-gray-600 uppercase tracking-widest mb-0.5">
                      {s.l}
                    </p>
                    <p className="text-sm font-semibold text-white tabular-nums">
                      {s.v}{" "}
                      <span className="text-[10px] text-gray-500 font-normal">
                        {s.u}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none" />
          </div>

          {/* ── Floating widgets — orbiting the dashboard ───────────── */}
          <div className="hidden lg:block">
            {/* Top-left float */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="absolute -left-16 top-12 animate-float-slow"
            >
              <FloatingMetric
                icon={Cpu}
                label="CPU CLP"
                value="38"
                unit="%"
                trend="+2%/h"
                trendDir="up"
              />
            </motion.div>

            {/* Right float */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-12 top-1/3 animate-float-delayed"
            >
              <FloatingMetric
                icon={Wifi}
                label="Latência"
                value="12"
                unit="ms"
                trend="-3ms"
                trendDir="up"
              />
            </motion.div>

            {/* Top-right notification */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -top-6 right-24 card-surface rounded-2xl px-4 py-2.5 flex items-center gap-3 animate-float"
            >
              <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center">
                <Layers className="w-3 h-3 text-brand-green" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-white">
                  {t.hero.floatDashboard}
                </p>
                <p className="text-[9px] text-gray-500">{t.hero.floatDashboardSub}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Social proof bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="relative z-10 mt-auto pb-10 pt-16"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center">
            {/* Integrators */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#7CB342", "#5E9B2A", "#A0C050", "#6DAA38"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-brand-bg flex items-center justify-center text-[9px] font-bold text-brand-bg"
                      style={{ backgroundColor: color }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  )
                )}
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-white">
                  +<NumberTicker value={240} delay={1.8} className="text-white" /> {t.hero.teamsLabel}
                </p>
                <p className="text-[10px] text-gray-500">{t.hero.teamsUnit}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-brand-dark4" />

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-brand-green"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                <NumberTicker value={4.9} delay={1.9} decimalPlaces={1} className="text-gray-400" />/5.0
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-brand-dark4" />

            {/* Uptime */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs text-gray-400">
                <NumberTicker value={99.98} delay={2.0} decimalPlaces={2} className="text-white font-medium" />% {t.hero.uptimeLabel}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
