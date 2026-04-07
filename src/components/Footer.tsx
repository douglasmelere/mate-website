"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, GitFork, X, Globe, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "5547997847265";
const PHONE_DISPLAY = "(47) 99784-7265";
const EMAIL = "labmatedev@gmail.com";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Tenho interesse no LabMate e gostaria de mais informações.")}`;

type FooterLink = { label: string; href: string; badge?: string };
type FooterLinks = Record<string, FooterLink[]>;

const footerLinks: FooterLinks = {
  Produto: [
    { label: "Mate Copiloto", href: "#demo" },
    { label: "Editor Visual", href: "#produto" },
    { label: "Integrações", href: "#produto" },
    { label: "Alertas & Eventos", href: "#produto" },
    { label: "Changelog", href: "#docs", badge: "Novo" },
  ],
  Desenvolvedores: [
    { label: "Documentação", href: "#docs" },
    { label: "API Reference", href: "#docs" },
    { label: "SDKs", href: "#docs" },
    { label: "Exemplos", href: "#casos" },
    { label: "Status", href: "#demo", badge: "100%" },
  ],
  Empresa: [
    { label: "Sobre a Mate", href: "/" },
    { label: "Casos de Uso", href: "#casos" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Preços", href: "#precos" },
    { label: "Contato", href: "#precos" },
  ],
  Legal: [
    { label: "Privacidade", href: "/" },
    { label: "Termos de Uso", href: "/" },
    { label: "LGPD", href: "/" },
    { label: "Cookies", href: "/" },
  ],
};

const socialLinks = [
  { icon: GitFork, label: "GitHub", href: "https://github.com" },
  { icon: X, label: "X (Twitter)", href: "https://x.com" },
  { icon: Globe, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t border-brand-dark4/60 bg-brand-dark1 overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>

      {/* Subtle glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full bg-brand-green/[0.025] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* CTA band */}
        <div className="py-16 lg:py-24 border-b border-brand-dark4/60">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-display-md font-bold text-white text-balance mb-3">
                Pronto para ver seus dados
                <br />
                <span className="text-brand-green">trabalharem por você?</span>
              </h3>
              <p className="text-gray-400 font-light max-w-md leading-relaxed">
                Configure seu primeiro dashboard industrial em menos de 15
                minutos. Sem instalação, sem consultoria cara.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
                Falar com especialista
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 group focus-visible:outline-none"
              aria-label="LabMate — Ir para página inicial"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-green/8 border border-brand-green/15 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green/15 group-hover:border-brand-green/30">
                <Activity className="w-4 h-4 text-brand-green" />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-white font-semibold text-base tracking-tight">
                  Lab
                </span>
                <span className="text-brand-green font-semibold text-base tracking-tight">
                  Mate
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 max-w-[220px]">
              Dashboards industriais para o chão de fábrica moderno.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-5">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors duration-150 group"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-brand-green transition-colors duration-150 group"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{EMAIL}</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-brand-dark3/80 border border-brand-dark4 flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-dark5 hover:bg-brand-dark5 transition-all duration-150"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-200 transition-colors duration-150"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/15">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-brand-dark4/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} LabMate. Todos os direitos reservados.
          </p>
          <motion.p
            className="text-xs text-gray-600 flex items-center gap-1"
            whileHover={{ scale: 1.02 }}
          >
            Desenvolvido com precisão industrial por{" "}
            <a
              href="/"
              className="font-medium transition-colors duration-200 hover:text-brand-green"
            >
              Mate
            </a>
            <span className="text-gray-700">·</span>
            <span className="text-gray-700">Luzerna, SC — Brasil</span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
