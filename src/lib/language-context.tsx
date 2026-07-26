"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { translations, type Language, type TranslationKey } from "./i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ela_kids_lang";
const listeners = new Set<() => void>();

function readStoredLanguage(): Language {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "vi" ? saved : "vi";
}

let cachedLanguage: Language = typeof window !== "undefined" ? readStoredLanguage() : "vi";

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Language {
  return cachedLanguage;
}

function getServerSnapshot(): Language {
  return "vi";
}

function setLanguage(lang: Language) {
  cachedLanguage = lang;
  window.localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.vi;
    return dict[key] || translations.vi[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "vi" as Language,
      setLanguage: () => {},
      t: (key: TranslationKey) => translations.vi[key] || key,
    };
  }
  return context;
}
