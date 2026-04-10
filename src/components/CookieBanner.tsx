"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

const STORAGE_KEY = "labmate_cookie_consent";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
          role="region"
          aria-label="Aviso de cookies"
        >
          <div className="rounded-2xl bg-brand-dark2/95 backdrop-blur-xl border border-brand-dark4 shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-green/8 border border-brand-green/15 flex items-center justify-center mt-0.5">
                <Cookie className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-0.5">
                  {t.cookies.title}
                </p>
                <p className="text-[12px] text-gray-500 font-light leading-relaxed">
                  {t.cookies.body}{" "}
                  <a href="/privacidade#lgpd" className="text-brand-green hover:underline">
                    {t.cookies.lgpdLink}
                  </a>
                  {t.cookies.body2}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={decline}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-[12px] font-medium text-gray-400 hover:text-white border border-brand-dark4 hover:border-brand-dark5 hover:bg-brand-dark3 transition-all duration-150"
              >
                {t.cookies.essential}
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-[12px] font-medium bg-brand-green text-brand-dark1 hover:bg-brand-green/90 transition-colors duration-150"
              >
                {t.cookies.accept}
              </button>
              <button
                onClick={decline}
                aria-label="Fechar"
                className="p-1.5 rounded-lg text-gray-600 hover:text-gray-400 hover:bg-brand-dark3 transition-all duration-150"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
