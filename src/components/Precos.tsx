"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  MessageCircle,
  Mail,
  HelpCircle,
  Zap,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Building2,
  Phone,
  User,
  Send
} from "lucide-react";
import emailjs from '@emailjs/browser';

const WHATSAPP_NUMBER = "5547997847265";
const COMMERCIAL_EMAIL = "labmatedev@gmail.com";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Tenho interesse no LabMate e gostaria de uma proposta."
)}`;

const highlights = [
  "Dashboards ilimitados por projeto",
  "Conecte CLPs, Modbus, OPC-UA, MQTT",
  "Alertas via WhatsApp, SMS e e-mail",
  "Mate Copiloto (IA) incluso",
  "API REST e integrações customizadas",
  "Suporte técnico especializado",
];

const faqs = [
  {
    q: "Como funciona o processo de contratação?",
    a: "Entre em contato com nosso time comercial via WhatsApp ou preenchendo o formulário. Apresentamos uma demonstração, entendemos suas necessidades e montamos uma proposta personalizada.",
  },
  {
    q: "O Mate Copiloto está disponível em todos os planos?",
    a: "Sim. O Mate Copiloto para geração de dashboards via IA é incluído na contratação. Demonstre agora mesmo na seção acima.",
  },
  {
    q: "O que conta como um dispositivo?",
    a: "Qualquer fonte de dados: CLP, gateway IoT, sensor com IP, ou endpoint de API REST.",
  },
  {
    q: "Vocês oferecem suporte durante a integração?",
    a: "Sim. Nossa equipe técnica acompanha a integração com seus sistemas, desde CLPs e gateways até configuração de alertas.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function Precos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    empresa: "",
    telefone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const templateParams = {
        name: formData.name,       // Compatível com o template fornecido agora: {{name}}, {{time}}, {{message}}
        from_name: formData.name,  // Retrocompatibilidade
        from_email: formData.email,
        empresa: formData.empresa,
        telefone: formData.telefone,
        message: formData.message,
        time: new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date())
      };

      // Substitua pelo seu Service ID, Template ID e Public Key do EmailJS configurados no .env.local
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "public_key_default"
      );
      
      setSubmitStatus("success");
      setFormData({ name: "", email: "", empresa: "", telefone: "", message: "" });
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={ref}
      id="precos"
      className="relative py-28 lg:py-36 overflow-hidden"
      aria-labelledby="precos-heading"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-green/[0.04] blur-[180px]" />
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
            <Zap className="w-3 h-3" />
            Proposta personalizada
          </span>
          <h2
            id="precos-heading"
            className="text-display-lg font-bold text-white text-balance mb-5"
          >
            Preço sob medida para
            <br />
            <span className="text-gray-500">o seu processo.</span>
          </h2>
          <p className="text-gray-400 font-light text-base sm:text-lg leading-relaxed">
            Cada operação é única. Fale com nosso time comercial e receba uma proposta adaptada ao tamanho e às necessidades da sua planta.
          </p>
        </motion.div>

        {/* CTA Card com Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="rounded-[24px] border border-brand-green/25 bg-gradient-to-b from-brand-dark2 to-brand-dark1 shadow-[0_0_80px_rgba(124,179,66,0.08),0_0_1px_rgba(124,179,66,0.2)] overflow-hidden lg:grid lg:grid-cols-2">
            <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-brand-green/[0.03] to-transparent pointer-events-none" />

            {/* Lado Esquerdo - Info */}
            <div className="p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-brand-dark4/60 relative">
              <h3 className="text-xl font-semibold text-white mb-6">O que está incluso:</h3>
              
              <ul className="space-y-4 mb-10">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0" />
                    <span className="text-sm text-gray-300">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-brand-dark3/40 rounded-xl p-5 border border-brand-dark4">
                <p className="text-sm text-gray-400 mb-4">
                  Prefere falar direto pelo WhatsApp? Nossa equipe está online.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-center py-3"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Lado Direito - Form */}
            <div className="p-8 sm:p-10 relative">
              <h3 className="text-xl font-semibold text-white mb-6">Solicitar contato</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-gray-400 ml-1">Nome</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-brand-dark3/50 border border-brand-dark4 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-gray-600"
                        placeholder="Seu nome"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-gray-400 ml-1">Telefone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        required
                        type="tel" 
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full bg-brand-dark3/50 border border-brand-dark4 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-gray-600"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-400 ml-1">E-mail corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-brand-dark3/50 border border-brand-dark4 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-gray-600"
                      placeholder="email@suaempresa.com.br"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-400 ml-1">Empresa</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      className="w-full bg-brand-dark3/50 border border-brand-dark4 text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-gray-600"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-gray-400 ml-1">Como podemos ajudar?</label>
                  <textarea 
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-brand-dark3/50 border border-brand-dark4 text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/50 transition-all placeholder:text-gray-600 resize-none"
                    placeholder="Nos conte um pouco sobre o seu projeto ou necessidade..."
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center py-3.5 text-sm"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar solicitação
                      </>
                    )}
                  </button>
                </div>
                
                {submitStatus === "success" && (
                  <p className="text-center text-sm text-brand-green mt-3 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Mensagem enviada! Retornaremos em breve.
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-center text-sm text-red-500 mt-3">
                    Erro ao enviar mensagem. Tente pelo WhatsApp.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
           initial={{ opacity: 0, y: 24 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.6, delay: 0.35 }}
           className="max-w-2xl mx-auto"
        >
          <h3 className="text-center text-lg font-semibold text-white mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-brand-green" />
            Perguntas frequentes
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-brand-dark2 border border-brand-dark4 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-brand-dark3/40 transition-colors duration-150 focus-visible:outline-none"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-sm font-medium text-gray-300">{faq.q}</span>
                  <span
                    className={`text-brand-green flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? "auto" : 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-sm text-gray-500 font-light leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
