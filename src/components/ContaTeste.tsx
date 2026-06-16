"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Sparkles,
  UserPlus,
  LayoutDashboard,
  Database,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const SIGNUP_URL = "https://dev.labmate.com.br/signup";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ContaTeste() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stepsWithIcons = t.teste.steps.map((step, i) => ({
    ...step,
    icon: [UserPlus, LayoutDashboard, Database, TrendingUp][i],
    number: String(i + 1).padStart(2, "0"),
  }));

  return (
    <section
      ref={ref}
      id="teste"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="teste-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-brand-green/[0.03] blur-[160px]" />
        <div className="absolute inset-0 grid-lines opacity-15" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="tag-badge mb-5 inline-flex">
            <Sparkles className="w-3 h-3" />
            {t.teste.badge}
          </span>
          <h2
            id="teste-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            {t.teste.headline1}
            <br />
            <span className="text-gray-500">{t.teste.headline2}</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed">
            {t.teste.sub}
          </p>
        </motion.div>

        {/* Steps — how the test account works */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto"
        >
          {stepsWithIcons.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="group relative rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-6 overflow-hidden
                hover:border-brand-green/25 hover:shadow-[0_0_50px_rgba(124,179,66,0.06)] transition-all duration-400 cursor-default"
            >
              {/* Top highlight */}
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />

              {/* Step number watermark */}
              <div className="absolute top-4 right-5 text-[44px] font-bold text-brand-dark3/70 leading-none select-none pointer-events-none">
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative w-10 h-10 rounded-xl bg-brand-green/8 flex items-center justify-center mb-5 group-hover:bg-brand-green/12 transition-colors duration-200">
                <step.icon className="w-4.5 h-4.5 text-brand-green" />
              </div>

              <h3 className="relative text-sm font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="relative text-[13px] text-gray-500 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-[24px] border border-brand-green/25 bg-gradient-to-b from-brand-dark2 to-brand-dark1 shadow-[0_0_80px_rgba(124,179,66,0.08),0_0_1px_rgba(124,179,66,0.2)] p-8 sm:p-10 text-center overflow-hidden">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-brand-green/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-display-md font-bold text-white text-balance mb-3">
                {t.teste.ctaTitle}
              </h3>
              <p className="text-gray-400 font-light text-base leading-relaxed max-w-xl mx-auto mb-8">
                {t.teste.ctaSub}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base px-8 py-3.5"
                >
                  {t.teste.ctaButton}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="#precos" className="btn-ghost">
                  {t.teste.ctaSecondary}
                </a>
              </div>

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                {t.teste.reassurance}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
