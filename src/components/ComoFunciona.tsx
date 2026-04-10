"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Users,
  Shield,
  Eye,
  Wrench,
  ArrowRight,
  FolderKanban,
  Database,
  LayoutDashboard,
  MonitorSmartphone,
  CreditCard,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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


export default function ComoFunciona() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const profilesWithIcons = t.como.profiles.map((p, i) => ({
    ...p,
    icon: [Shield, Wrench, Eye][i],
    accent: "#7cb342",
  }));

  const modulesWithIcons = t.como.modules.map((m, i) => ({
    ...m,
    icon: [FolderKanban, Database, LayoutDashboard, MonitorSmartphone, CreditCard][i],
    number: `0${i + 1}`,
  }));

  return (
    <section
      ref={ref}
      id="como-funciona"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="como-funciona-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-brand-green/[0.03] blur-[160px]" />
        <div className="absolute inset-0 grid-lines opacity-15" />
        <div className="section-divider absolute top-0" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ════ PART 1: User Profiles ════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <span className="tag-badge mb-5 inline-flex">
            <Users className="w-3 h-3" />
            {t.como.badge}
          </span>
          <h2
            id="como-funciona-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            {t.como.headline1}
            <br />
            <span className="text-gray-500">{t.como.headline2}</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed max-w-xl">
            {t.como.sub}
          </p>
        </motion.div>

        {/* Profile cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-28 lg:mb-36"
        >
          {profilesWithIcons.map((profile, i) => (
            <motion.div
              key={profile.role}
              variants={fadeUp}
              className="group relative rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-6 overflow-hidden
                hover:border-brand-green/25 hover:shadow-[0_0_50px_rgba(124,179,66,0.06)] transition-all duration-400 cursor-default"
            >
              {/* Top highlight */}
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/[0.015] to-transparent pointer-events-none" />

              {/* Step number watermark */}
              <div className="absolute top-4 right-5 text-[52px] font-bold text-brand-dark3/70 leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon + Role */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-brand-green/8 flex items-center justify-center group-hover:bg-brand-green/12 transition-colors duration-200">
                  <profile.icon className="w-4.5 h-4.5 text-brand-green" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-brand-green uppercase tracking-wider">
                    {profile.role}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {profile.title}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-gray-500 font-light leading-relaxed mb-5">
                {profile.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-2 mb-5">
                {profile.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2">
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
                    <span className="text-xs text-gray-400">{cap}</span>
                  </div>
                ))}
              </div>

              {/* Devices badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-dark3/80 border border-brand-dark4 w-fit">
                <MonitorSmartphone className="w-3 h-3 text-gray-600" />
                <span className="text-[10px] text-gray-500 font-medium">
                  {profile.devices}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ════ PART 2: Modules / Flow ═══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 lg:mb-20 text-center max-w-2xl mx-auto"
        >
          <span className="tag-badge mb-5 inline-flex">
            <LayoutDashboard className="w-3 h-3" />
            {t.como.badge2}
          </span>
          <h3 className="text-display-md font-bold text-white text-balance mb-5">
            {t.como.headline3}
            <br />
            <span className="text-gray-500">{t.como.headline4}</span>
          </h3>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed">
            {t.como.sub2}
          </p>
        </motion.div>

        {/* Module steps — timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Vertical connecting line */}
          <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-brand-green/30 via-brand-green/15 to-transparent hidden md:block" />

          <div className="space-y-4">
            {modulesWithIcons.map((mod, i) => (
              <motion.div
                key={mod.number}
                variants={fadeUp}
                className="group relative flex items-start gap-5 rounded-[20px] bg-brand-dark2 border border-brand-dark4 p-6
                  hover:border-brand-green/20 hover:shadow-[0_0_40px_rgba(124,179,66,0.04)] transition-all duration-400 cursor-default"
              >
                {/* Number circle */}
                <div className="flex-shrink-0 w-[54px] h-[54px] rounded-2xl bg-brand-dark3 border border-brand-dark4 flex items-center justify-center
                  group-hover:bg-brand-green/8 group-hover:border-brand-green/20 transition-all duration-300 relative z-10">
                  <mod.icon className="w-5 h-5 text-gray-500 group-hover:text-brand-green transition-colors duration-300" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono text-brand-green/60 bg-brand-green/5 border border-brand-green/10 px-2 py-0.5 rounded-md">
                      {t.como.moduleLabel} {mod.number}
                    </span>
                    <h4 className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      {mod.title}
                    </h4>
                  </div>
                  <p className="text-[13px] text-gray-500 font-light leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                {i < modulesWithIcons.length - 1 && (
                  <div className="hidden md:flex absolute -bottom-4 left-[27px] w-px h-4 items-center justify-center z-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#demo" className="btn-primary">
            {t.como.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#precos" className="btn-ghost">
            {t.como.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
