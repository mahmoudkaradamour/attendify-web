"use client";

import { ReactNode } from "react";
import LanguageProvider from "@/components/language-provider";

export default function AppShell({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
