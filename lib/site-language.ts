"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "ar";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "attendify_locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

export const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {}
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "ar" ? "ar" : "en";
}
