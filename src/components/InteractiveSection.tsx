"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MousePointer2,
  Send,
  LayoutDashboard,
  BarChart3,
  Gauge,
  Thermometer,
  Activity,
  PieChart,
  Grid,
  Type,
  ArrowRight,
  Cpu,
  Check,
  Trash2,
  RotateCcw,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */
type Mode = "ai" | "manual";
type AiStage = "idle" | "generating" | "done";

/* ── Data ──────────────────────────────────────────────────────────── */
const AI_PROMPTS = [
  "Dashboard de produção com OEE, eficiência por turno e temperatura dos CLPs da linha 2.",
  "Painel de energia com consumo por setor, pico de demanda e alertas automáticos.",
  "Dashboard preditivo com vibração, temperatura e horas de operação dos motores.",
];

const DEFAULT_STEPS = [
  "Analisando contexto industrial...",
  "Identificando variáveis relevantes...",
  "Selecionando widgets ideais...",
  "Montando layout do dashboard...",
];

type AiWidget = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  unit: string;
  size: "2×2" | "2×1" | "1×1";
  hasChart?: boolean;
};

const AI_WIDGETS: AiWidget[] = [
  { icon: BarChart3, label: "OEE por Turno", value: "94.2", unit: "%", size: "2×2", hasChart: true },
  { icon: Activity,  label: "Eficiência Linha 2", value: "91", unit: "%", size: "2×1", hasChart: true },
  { icon: Thermometer, label: "Temp. CLPs", value: "42", unit: "°C", size: "1×1" },
  { icon: Gauge,     label: "Cadência", value: "847", unit: "p/h", size: "1×1" },
  { icon: PieChart,  label: "Dist. Paradas", value: "3", unit: "min", size: "2×1" },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  AI PANEL — two-column: chat + live preview                        */
/* ═══════════════════════════════════════════════════════════════════ */
function AiPanel({ active, onOpenEditor }: { active: boolean; onOpenEditor: () => void }) {
  const [stage, setStage] = useState<AiStage>("idle");
  const [promptIdx, setPromptIdx] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [completedSteps, setCompletedSteps] = useState(0);
  const [visibleWidgets, setVisibleWidgets] = useState(0);
  const [aiSteps, setAiSteps] = useState<string[]>(DEFAULT_STEPS);
  const [aiExplanation, setAiExplanation] = useState("");
  const [activeWidgetIds, setActiveWidgetIds] = useState<Set<number>>(new Set([0, 1, 2, 3, 4]));

  const WIDGET_MS = 160;

  async function handleSubmit() {
    const val = inputValue.trim() || AI_PROMPTS[promptIdx];
    setSubmittedPrompt(val);
    setInputValue("");
    setStage("generating");
    setCompletedSteps(0);
    setVisibleWidgets(0);
    setAiExplanation("");

    // Chama o endpoint real
    let steps = DEFAULT_STEPS;
    let widgetIds = [0, 1, 2, 3, 4];
    let explanation = "";

    // Mostra steps animados enquanto aguarda a resposta
    let stepCursor = 0;
    const stepInterval = setInterval(() => {
      stepCursor++;
      setCompletedSteps(stepCursor);
    }, 500);

    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: val }),
      });
      if (res.ok) {
        const data = await res.json();
        steps = data.steps ?? DEFAULT_STEPS;
        widgetIds = data.widgetIds ?? [0, 1, 2, 3, 4];
        explanation = data.explanation ?? "";
      }
    } catch {
      // silently fallback to defaults
    } finally {
      clearInterval(stepInterval);
    }

    setAiSteps(steps);
    setCompletedSteps(steps.length);
    setAiExplanation(explanation);
    setActiveWidgetIds(new Set(widgetIds));

    setTimeout(() => {
      setStage("done");
      let w = 0;
      const widgetTimer = setInterval(() => {
        w++;
        setVisibleWidgets(w);
        if (w >= AI_WIDGETS.length) clearInterval(widgetTimer);
      }, WIDGET_MS);
    }, 300);
  }

  function handleReset() {
    setStage("idle");
    setInputValue("");
    setSubmittedPrompt("");
    setCompletedSteps(0);
    setVisibleWidgets(0);
    setPromptIdx((i) => (i + 1) % AI_PROMPTS.length);
  }

  const isIdle = stage === "idle";
  const isDone = stage === "done";

  return (
    <div className="flex flex-col md:flex-row h-full md:min-h-[460px]">
      {/* ── LEFT: Conversation ─────────────────────────────────────── */}
      <div className="w-full md:w-[44%] h-[300px] md:h-auto flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-brand-dark4/50">

        {/* Chat scroll area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 min-h-0">
          <AnimatePresence mode="wait">

            {/* IDLE — suggestion chips */}
            {isIdle && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">
                  Exemplos de prompt
                </p>
                <div className="space-y-2">
                  {AI_PROMPTS.map((prompt, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.3 }}
                      onClick={() => setInputValue(prompt)}
                      className="w-full text-left text-[12px] text-gray-500 p-3 rounded-xl bg-brand-dark3/40 border border-brand-dark4/80
                        hover:bg-brand-dark3 hover:border-brand-green/20 hover:text-gray-200
                        active:scale-[0.98] transition-all duration-150 leading-relaxed"
                    >
                      <span className="text-brand-green/60 mr-1.5 font-mono text-[10px]">{i + 1}.</span>
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* GENERATING / DONE */}
            {!isIdle && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* User bubble */}
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[88%] bg-brand-green/8 border border-brand-green/18 rounded-2xl rounded-tr-sm px-3.5 py-2.5">
                    <p className="text-[12px] text-gray-200 leading-relaxed">{submittedPrompt}</p>
                  </div>
                </motion.div>

                {/* AI message */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-brand-green/12 border border-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-brand-green" />
                  </div>
                  <div className="flex-1 bg-brand-dark3/50 border border-brand-dark4/60 rounded-2xl rounded-tl-sm px-4 py-3.5">
                    <div className="space-y-2.5">
                      {aiSteps.map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.25 }}
                          className="flex items-center gap-2.5"
                        >
                          <motion.div
                            animate={{
                              backgroundColor: completedSteps > i
                                ? "rgba(124,179,66,0.18)"
                                : "rgba(42,42,42,0.8)",
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            {completedSteps > i ? (
                              <Check className="w-2.5 h-2.5 text-brand-green" />
                            ) : (
                              <motion.div
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                                className="w-1.5 h-1.5 rounded-full bg-gray-600"
                              />
                            )}
                          </motion.div>
                          <motion.p
                            animate={{ color: completedSteps > i ? "#9ca3af" : "#4b5563" }}
                            transition={{ duration: 0.3 }}
                            className="text-[11px] leading-snug"
                          >
                            {step}
                          </motion.p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Done message */}
                    <AnimatePresence>
                      {isDone && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-3 pt-3 border-t border-brand-dark4/50"
                        >
                          <p className="text-[12px] text-gray-300 leading-relaxed">
                            {aiExplanation || (
                              <>
                                Dashboard gerado com{" "}
                                <span className="text-brand-green font-semibold">{activeWidgetIds.size} widgets</span>.
                                {" "}Tudo ajustável no editor.
                              </>
                            )}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* CTA buttons */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                      className="flex gap-2 pl-8"
                    >
                      <button
                        onClick={onOpenEditor}
                        className="flex-1 py-2 rounded-xl bg-brand-green text-brand-bg text-xs font-semibold
                          hover:bg-brand-greenHover flex items-center justify-center gap-1.5
                          active:scale-95 transition-all duration-150"
                      >
                        <LayoutDashboard className="w-3 h-3" />
                        Editar no canvas
                      </button>
                      <button
                        onClick={handleReset}
                        className="py-2 px-3 rounded-xl bg-brand-dark3/80 border border-brand-dark4/60
                          text-gray-400 text-xs hover:text-white hover:bg-brand-dark4
                          active:scale-95 transition-all duration-150 flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Novo
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 p-4 border-t border-brand-dark4/50">
          <div
            className={`flex items-end gap-2 rounded-2xl border px-4 py-3 transition-all duration-200
              ${isIdle
                ? "bg-brand-dark3/60 border-brand-dark4 focus-within:border-brand-green/30 focus-within:shadow-[0_0_0_3px_rgba(124,179,66,0.06)]"
                : "bg-brand-dark3/20 border-brand-dark4/30"
              }`}
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={!isIdle}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && isIdle) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder={isIdle ? "Descreva seu dashboard..." : "Gerando..."}
              className="flex-1 bg-transparent text-[13px] text-gray-300 placeholder-gray-600
                resize-none outline-none min-h-[20px] max-h-[80px] leading-relaxed
                disabled:opacity-30 disabled:cursor-not-allowed"
              rows={1}
            />
            <motion.button
              onClick={() => isIdle && handleSubmit()}
              disabled={!isIdle}
              whileHover={isIdle ? { scale: 1.08 } : {}}
              whileTap={isIdle ? { scale: 0.9 } : {}}
              className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150
                ${isIdle
                  ? "bg-brand-green hover:bg-brand-greenHover cursor-pointer"
                  : "bg-brand-dark4 cursor-not-allowed opacity-30"
                }`}
              aria-label="Enviar prompt"
            >
              <Send className="w-3.5 h-3.5 text-brand-bg" />
            </motion.button>
          </div>
          <p className="text-[10px] text-gray-700 mt-2 text-center">
            Enter para gerar · Shift+Enter para nova linha
          </p>
        </div>
      </div>

      {/* ── RIGHT: Live dashboard preview ─────────────────────────── */}
      <div className="flex-1 relative overflow-hidden bg-[#090909] min-h-[300px]">
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #1d1d1d 0.8px, transparent 0.8px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Idle state placeholder */}
        <AnimatePresence>
          {isIdle && (
            <motion.div
              key="preview-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-dark2 border border-brand-dark4 flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-gray-700" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-700 font-medium">Preview ao vivo</p>
                <p className="text-[11px] text-gray-800 mt-1">Widgets aparecem aqui conforme a IA gera</p>
              </div>
              {/* Placeholder ghost widgets */}
              <div className="absolute inset-5 grid grid-cols-3 grid-rows-3 gap-2.5 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border border-brand-dark3/60 bg-brand-dark1/40
                      ${i === 0 ? "col-span-2 row-span-2" : i === 1 || i === 4 ? "col-span-2" : "col-span-1"}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated widgets */}
        {!isIdle && (
          <div className="absolute inset-4 grid grid-cols-3 auto-rows-[1fr] gap-2.5">
            {AI_WIDGETS.map((w, i) => {
              const isActive = activeWidgetIds.has(i);
              const revealIdx = [...activeWidgetIds].sort((a, b) => a - b).indexOf(i);
              return (
              <motion.div
                key={w.label}
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={{
                  opacity: isActive && visibleWidgets > revealIdx ? 1 : isActive ? 0 : 0,
                  scale: isActive && visibleWidgets > revealIdx ? 1 : 0.8,
                  y: isActive && visibleWidgets > revealIdx ? 0 : 12,
                }}
                transition={{ type: "spring", bounce: 0.35, duration: 0.45 }}
                className={`relative rounded-xl bg-brand-dark2 border flex flex-col overflow-hidden
                  ${isActive && visibleWidgets > revealIdx
                    ? "border-brand-green/18 shadow-[0_0_20px_rgba(124,179,66,0.05)]"
                    : "border-brand-dark4/30"
                  }
                  ${w.size === "2×2" ? "col-span-2 row-span-2" : w.size === "2×1" ? "col-span-2" : "col-span-1"}`}
              >
                <div className="flex items-center justify-between px-3 pt-3 pb-1">
                  <div className="flex items-center gap-1.5">
                    <w.icon className="w-3 h-3 text-brand-green" />
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider leading-none">{w.label}</p>
                  </div>
                  {isActive && visibleWidgets > revealIdx && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"
                    />
                  )}
                </div>

                <div className="px-3 pb-1">
                  <span className="text-base font-semibold text-white tabular-nums">{w.value}</span>
                  <span className="text-[10px] text-gray-600 ml-1">{w.unit}</span>
                </div>

                {/* Mini chart for large + wide widgets */}
                {w.hasChart && (
                  <div className="flex-1 px-2 pb-2 min-h-0">
                    <svg viewBox="0 0 80 28" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`pg-${i}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7cb342" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#7cb342" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={i === 0
                          ? "M0,22 C12,18 22,10 35,11 C48,12 58,6 80,4"
                          : "M0,20 C20,16 40,8 80,5"}
                        fill="none"
                        stroke="#7cb342"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d={i === 0
                          ? "M0,22 C12,18 22,10 35,11 C48,12 58,6 80,4 L80,28 L0,28 Z"
                          : "M0,20 C20,16 40,8 80,5 L80,28 L0,28 Z"}
                        fill={`url(#pg-${i})`}
                      />
                    </svg>
                  </div>
                )}
              </motion.div>
              );
            })}
          </div>
        )}

        {/* Status label */}
        <div className="absolute bottom-3 right-3">
          <AnimatePresence mode="wait">
            {stage === "generating" && (
              <motion.div
                key="gen-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-[9px] text-gray-700"
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-brand-green"
                />
                Gerando...
              </motion.div>
            )}
            {isDone && (
              <motion.p
                key="done-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] text-gray-700"
              >
                {AI_WIDGETS.length} widgets · editável
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  MANUAL PANEL — improved drag-and-drop editor                      */
/* ═══════════════════════════════════════════════════════════════════ */

const PALETTE_GROUPS = [
  {
    label: "Gráficos",
    items: [
      { icon: BarChart3, label: "Linha / Área", hasChart: true, mockValue: "847", unit: "p/h" },
      { icon: PieChart,  label: "Pizza / Donut", hasChart: false, mockValue: "63", unit: "%" },
      { icon: Activity,  label: "Sinal Real-time", hasChart: true, mockValue: "12", unit: "ms" },
    ],
  },
  {
    label: "Indicadores",
    items: [
      { icon: Gauge,       label: "Gauge",      hasChart: false, mockValue: "94", unit: "%" },
      { icon: Thermometer, label: "Termômetro", hasChart: false, mockValue: "42", unit: "°C" },
      { icon: Type,        label: "Métrica KPI", hasChart: false, mockValue: "1420", unit: "RPM" },
    ],
  },
  {
    label: "Sistemas",
    items: [
      { icon: Cpu,  label: "Status CLP",  hasChart: false, mockValue: "OK", unit: "" },
      { icon: Grid, label: "Tabela",      hasChart: false, mockValue: "—", unit: "" },
    ],
  },
];

type PaletteItem = (typeof PALETTE_GROUPS)[0]["items"][0];

type PlacedWidget = {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  x: number;
  y: number;
  mockValue: string;
  unit: string;
  hasChart: boolean;
};

function ManualPanel() {
  const initialWidgets = useMemo<PlacedWidget[]>(
    () => [
      { id: 1, icon: BarChart3, label: "Produção/h",  x: 6,  y: 8,  mockValue: "847",  unit: "p/h", hasChart: true },
      { id: 2, icon: Gauge,     label: "RPM Motor",   x: 50, y: 8,  mockValue: "1420", unit: "RPM", hasChart: false },
      { id: 3, icon: Thermometer, label: "Temp. Linha", x: 6, y: 56, mockValue: "72",  unit: "°C",  hasChart: false },
    ],
    []
  );

  const [placed, setPlaced] = useState<PlacedWidget[]>(initialWidgets);
  const [nextId, setNextId] = useState(10);
  const [dragging, setDragging] = useState<number | null>(null);
  const [hovering, setHovering] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  function addWidget(item: PaletteItem) {
    const id = nextId;
    setPlaced((p) => [
      ...p,
      {
        id,
        icon: item.icon,
        label: item.label,
        x: 14 + ((id * 17) % 40),
        y: 12 + ((id * 23) % 42),
        mockValue: item.mockValue,
        unit: item.unit,
        hasChart: item.hasChart,
      },
    ]);
    setNextId((n) => n + 1);
  }

  function removeWidget(id: number) {
    setPlaced((p) => p.filter((w) => w.id !== id));
  }

  function clearAll() {
    setPlaced([]);
  }

  return (
    <div className="flex flex-col h-full min-h-[460px]">
      {/* ── Toolbar ──────────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b border-brand-dark4/50 bg-brand-dark2/60">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          <span className="text-[11px] text-gray-500">
            {placed.length} widget{placed.length !== 1 ? "s" : ""} no canvas
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={clearAll}
            disabled={placed.length === 0}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-gray-600 hover:text-red-400/80 hover:bg-red-500/5
              disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <Trash2 className="w-3 h-3" />
            Limpar
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row flex-1 min-h-[400px] sm:min-h-0">
        {/* ── Palette sidebar ──────────────────────────────────── */}
        <div className="w-full sm:w-[126px] h-[100px] sm:h-auto flex-shrink-0 border-b sm:border-b-0 sm:border-r border-brand-dark4/50 overflow-x-auto sm:overflow-y-auto p-2.5 flex sm:flex-col gap-6 sm:gap-4 sm:space-y-4">
          {PALETTE_GROUPS.map((group) => (
            <div key={group.label} className="flex-shrink-0 flex sm:block flex-col">
              <p className="hidden sm:block text-[9px] text-gray-700 uppercase tracking-widest px-1 mb-1.5">
                {group.label}
              </p>
              <div className="flex sm:flex-col gap-2 sm:space-y-0.5">
                {group.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => addWidget(item)}
                    title={`Adicionar ${item.label}`}
                    className="flex-shrink-0 sm:w-full flex items-center gap-2 px-3 sm:px-2 py-2 rounded-lg sm:text-left
                      bg-brand-dark3/40 sm:bg-transparent
                      hover:bg-brand-dark3 hover:border-brand-dark5
                      group transition-all duration-150 border border-brand-dark4 sm:border-transparent"
                  >
                    <div className="hidden sm:flex w-6 h-6 rounded-lg bg-brand-dark3/80 border border-brand-dark4 items-center justify-center flex-shrink-0
                      group-hover:bg-brand-green/8 group-hover:border-brand-green/20 transition-all duration-150">
                      <item.icon className="w-3 h-3 text-gray-600 group-hover:text-brand-green transition-colors duration-150" />
                    </div>
                    <span className="text-[10px] sm:text-gray-600 text-gray-300 group-hover:text-gray-200 transition-colors leading-tight">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Canvas ───────────────────────────────────────────── */}
        <div
          ref={canvasRef}
          className="flex-1 relative overflow-hidden bg-[#080808]"
          style={{
            backgroundImage: "radial-gradient(circle, #1c1c1c 0.8px, transparent 0.8px)",
            backgroundSize: "24px 24px",
          }}
          aria-label="Canvas do dashboard"
        >
          {/* Empty state */}
          <AnimatePresence>
            {placed.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-dark2 border border-brand-dark4 flex items-center justify-center">
                  <MousePointer2 className="w-5 h-5 text-gray-700" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700">Canvas vazio</p>
                  <p className="text-[11px] text-gray-800 mt-0.5">Clique nos widgets para adicionar</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {placed.map((w) => (
            <motion.div
              key={w.id}
              drag
              dragMomentum={false}
              dragConstraints={canvasRef}
              onDragStart={() => setDragging(w.id)}
              onDragEnd={() => setDragging(null)}
              onHoverStart={() => setHovering(w.id)}
              onHoverEnd={() => setHovering(null)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.35 }}
              style={{ position: "absolute", left: `${w.x}%`, top: `${w.y}%` }}
              className={`rounded-xl bg-brand-dark2 border overflow-hidden min-w-[100px]
                shadow-[0_4px_24px_rgba(0,0,0,0.6)]
                transition-[border-color,box-shadow] duration-150
                ${dragging === w.id
                  ? "border-brand-green/40 shadow-[0_0_28px_rgba(124,179,66,0.18)] z-20 cursor-grabbing"
                  : "border-brand-dark4 hover:border-brand-dark5 cursor-grab"
                }`}
              whileTap={{ scale: 1.04, zIndex: 20 }}
            >
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <w.icon className="w-3 h-3 text-brand-green flex-shrink-0" />
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider whitespace-nowrap leading-none">
                      {w.label}
                    </p>
                  </div>
                  {/* Delete button */}
                  <AnimatePresence>
                    {(hovering === w.id || dragging === w.id) && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.12 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeWidget(w.id);
                        }}
                        className="w-4 h-4 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center
                          hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-100 ml-1.5 flex-shrink-0 cursor-pointer"
                        aria-label="Remover widget"
                      >
                        <svg className="w-2 h-2 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-base font-semibold text-white tabular-nums">{w.mockValue}</span>
                  {w.unit && (
                    <span className="text-[10px] text-gray-600">{w.unit}</span>
                  )}
                </div>
              </div>

              {/* Mini chart for chart-type widgets */}
              {w.hasChart && (
                <div className="px-3 pb-3 pt-1">
                  <svg viewBox="0 0 80 22" className="w-full h-5" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`cg-${w.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7cb342" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#7cb342" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,18 C15,15 25,8 40,9 C55,10 65,4 80,2"
                      fill="none"
                      stroke="#7cb342"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,18 C15,15 25,8 40,9 C55,10 65,4 80,2 L80,22 L0,22 Z"
                      fill={`url(#cg-${w.id})`}
                    />
                    <circle cx="80" cy="2" r="2" fill="#7cb342" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}

          {/* Canvas hint */}
          <div className="absolute bottom-3 right-3 text-[9px] text-gray-800 tracking-wide pointer-events-none">
            Arraste para reposicionar
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab button ────────────────────────────────────────────────────── */
function ModeTab({
  mode,
  activeMode,
  icon: Icon,
  label,
  desc,
  shortcut,
  onClick,
}: {
  mode: Mode;
  activeMode: Mode;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  shortcut: string;
  onClick: () => void;
}) {
  const isActive = mode === activeMode;

  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center gap-3 px-5 py-3.5 transition-all duration-300 relative overflow-hidden focus-visible:outline-none
        ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
      aria-pressed={isActive}
    >
      {isActive && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute inset-0 bg-brand-dark3/50 border-b-2 border-brand-green"
          transition={{ type: "spring", bounce: 0.18, duration: 0.38 }}
        />
      )}

      <div className={`relative z-10 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200
        ${isActive ? "bg-brand-green/10 border border-brand-green/20" : "bg-brand-dark3/60 border border-brand-dark4/60"}`}
      >
        <Icon className={`w-4 h-4 transition-colors duration-200 ${isActive ? "text-brand-green" : "text-gray-600"}`} />
      </div>

      <div className="relative z-10 text-left flex-1">
        <p className="text-[13px] font-semibold leading-tight">{label}</p>
        <p className={`text-[11px] font-light transition-colors duration-200 ${isActive ? "text-gray-500" : "text-gray-700"}`}>
          {desc}
        </p>
      </div>

      <span className={`relative z-10 hidden sm:block text-[10px] font-mono px-1.5 py-0.5 rounded-md border transition-all duration-200
        ${isActive
          ? "border-brand-green/20 text-brand-green/60 bg-brand-green/5"
          : "border-brand-dark4 text-gray-700 bg-brand-dark3/40"
        }`}
      >
        {shortcut}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  INTERACTIVE SECTION                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default function InteractiveSection() {
  const [mode, setMode] = useState<Mode>("ai");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="demo"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="interactive-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[450px] rounded-full bg-brand-green/[0.03] blur-[180px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-brand-green/[0.02] blur-[120px]" />
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 lg:mb-18 max-w-2xl"
        >
          <span className="tag-badge mb-5 inline-flex">
            <LayoutDashboard className="w-3 h-3" />
            Duas formas de criar
          </span>
          <h2
            id="interactive-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            Do prompt ao painel.
            <br />
            <span className="text-gray-500">Ou do zero, se preferir.</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-xl">
            O LabMate não escolhe por você. Deixe a IA trabalhar ou tome o
            controle total — os dois caminhos chegam no mesmo lugar.
          </p>
        </motion.div>

        {/* Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-[24px] bg-brand-dark1 border border-brand-dark4/80 overflow-hidden
            shadow-[0_0_100px_rgba(124,179,66,0.07),0_0_1px_rgba(255,255,255,0.04),0_32px_80px_rgba(0,0,0,0.5)]
            min-h-[580px] flex flex-col"
        >
          {/* Window chrome */}
          <div className="flex-shrink-0 flex items-center px-5 py-3 border-b border-brand-dark4/60 bg-brand-dark2/50">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]/60" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]/60" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-brand-dark3/60 border border-brand-dark4/60 text-[11px] text-gray-600 font-mono">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-green/60" />
                labmate.app/editor
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Tabs */}
          <div className="flex-shrink-0 flex border-b border-brand-dark4/60 bg-brand-dark2/30">
            <ModeTab
              mode="ai"
              activeMode={mode}
              icon={Sparkles}
              label="Mate Copiloto"
              desc="IA que entende o contexto"
              shortcut="⌘1"
              onClick={() => setMode("ai")}
            />
            <div className="w-px bg-brand-dark4/50 my-2.5" />
            <ModeTab
              mode="manual"
              activeMode={mode}
              icon={MousePointer2}
              label="Editor Visual"
              desc="Drag-and-drop total"
              shortcut="⌘2"
              onClick={() => setMode("manual")}
            />
          </div>

          {/* Panel */}
          <div className="flex-1 min-h-0">
            <AnimatePresence mode="wait">
              {mode === "ai" ? (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full"
                >
                  <AiPanel active={mode === "ai"} onOpenEditor={() => setMode("manual")} />
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full"
                >
                  <ManualPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="#precos" className="btn-primary">
            Ver planos e preços
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/5547997847265?text=Ol%C3%A1!%20Tenho%20interesse%20no%20LabMate%20e%20gostaria%20de%20uma%20proposta." target="_blank" rel="noopener noreferrer" className="btn-ghost">
            Falar com um especialista
          </a>
        </motion.div>
      </div>
    </section>
  );
}
