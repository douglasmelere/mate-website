"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import type { Locale } from "@/lib/i18n/types";

const FLAG_MAP: Record<Locale, { flag: string; label: string }> = {
  pt: { flag: "🇧🇷", label: "Português" },
  en: { flag: "🇺🇸", label: "English" },
  es: { flag: "🇪🇸", label: "Español" },
};

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      label: t.nav.product,
      href: "#produto",
      children: [
        { label: t.nav.copilotoLabel, desc: t.nav.copilotoDesc, href: "#demo" },
        { label: t.nav.editorLabel, desc: t.nav.editorDesc, href: "#demo" },
        { label: t.nav.integrationsLabel, desc: t.nav.integrationsDesc, href: "#produto" },
      ],
    },
    { label: t.nav.howItWorks, href: "#como-funciona" },
    { label: t.nav.useCases, href: "#casos" },
    { label: t.nav.pricing, href: "#precos" },
    { label: t.nav.docs, href: "#docs" },
  ];

  const locales: Locale[] = ["pt", "en", "es"];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled ? "glassmorphism border-white/5" : "bg-transparent border-transparent"
        }`}
      >
        <nav
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12"
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus-visible:outline-none"
              aria-label="LabMate — Ir para página inicial"
            >
              <div className="relative w-8 h-8 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green/20 group-hover:border-brand-green/40 group-hover:shadow-[0_0_15px_rgba(124,179,66,0.2)]">
                <Activity className="w-4 h-4 text-brand-green" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-white font-semibold text-base tracking-tight">Lab</span>
                <span className="text-brand-green font-semibold text-base tracking-tight">Mate</span>
                <span className="hidden sm:inline text-[10px] text-gray-600 font-medium ml-1 mt-auto mb-0.5">by Mate</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm text-gray-400 font-medium transition-all duration-200 hover:text-white hover:bg-white/5"
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute top-full left-0 mt-2 w-64 rounded-2xl card-surface p-2 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-brand-dark3 group"
                          >
                            <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{child.label}</span>
                            <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{child.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA + Language flags */}
            <div className="hidden md:flex items-center gap-3">
              {/* Flag language switcher */}
              <div className="flex items-center gap-1 rounded-full border border-brand-dark4 bg-brand-dark3/40 p-1">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    title={FLAG_MAP[l].label}
                    aria-label={FLAG_MAP[l].label}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200 ${
                      locale === l
                        ? "ring-2 ring-brand-green bg-brand-green/15 scale-110 shadow-[0_0_10px_rgba(124,179,66,0.25)]"
                        : "opacity-50 hover:opacity-90 hover:bg-white/5 hover:scale-105"
                    }`}
                  >
                    <span className="leading-none">{FLAG_MAP[l].flag}</span>
                  </button>
                ))}
              </div>

              <Link href="#precos" className="btn-primary text-sm py-2 px-5">
                {t.nav.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile: flags + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {/* Flag language switcher — always visible on mobile */}
              <div className="flex items-center gap-0.5 rounded-full border border-brand-dark4 bg-brand-dark3/40 p-0.5">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    title={FLAG_MAP[l].label}
                    aria-label={FLAG_MAP[l].label}
                    className={`relative w-7 h-7 rounded-full flex items-center justify-center text-base transition-all duration-200 ${
                      locale === l
                        ? "ring-2 ring-brand-green bg-brand-green/15 scale-110 shadow-[0_0_8px_rgba(124,179,66,0.25)]"
                        : "opacity-50 hover:opacity-90 hover:bg-white/5 hover:scale-105"
                    }`}
                  >
                    <span className="leading-none">{FLAG_MAP[l].flag}</span>
                  </button>
                ))}
              </div>

              <button
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={t.nav.menuOpen}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden border-t border-white/5"
            >
              <div className="px-4 py-4 space-y-1 bg-brand-bg/98 backdrop-blur-xl">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 flex flex-col gap-2 border-t border-brand-dark4 mt-3">
                  <Link href="#precos" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                    {t.nav.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
