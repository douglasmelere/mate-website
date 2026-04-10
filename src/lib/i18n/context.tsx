"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Dict, Locale } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

const dicts: Record<Locale, Dict> = { pt, en, es };

type LanguageCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
};

const Ctx = createContext<LanguageCtx>({ locale: "pt", setLocale: () => {}, t: pt });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("labmate_lang") as Locale | null;
    if (saved && saved in dicts) setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("labmate_lang", l);
  }

  return (
    <Ctx.Provider value={{ locale, setLocale, t: dicts[locale] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLanguage() {
  return useContext(Ctx);
}
