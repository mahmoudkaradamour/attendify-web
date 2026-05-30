"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/site-language";

const labels = {
  en: {
    overview: "Overview",
    access: "Access",
    admin: "Admin",
    portal: "Portal",
    plans: "Plans",
    docs: "Docs Portal",
    cta: "Get Started",
    brand: "Attendance Trust Platform"
  },
  ar: {
    overview: "نظرة عامة",
    access: "الدخول",
    admin: "الأدمن",
    portal: "البوابة",
    plans: "الخطط",
    docs: "بوابة الوثائق",
    cta: "ابدأ الآن",
    brand: "منصة الثقة للحضور"
  }
} as const;

export default function TopNav() {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const copy = labels[locale];

  const links = [
    { href: "/", label: copy.overview },
    { href: "/access", label: copy.access },
    { href: "/admin", label: copy.admin },
    { href: "/portal", label: copy.portal },
    { href: "/subscriptions", label: copy.plans },
    { href: "/docs", label: copy.docs }
  ];

  return (
    <header className="nav-shell">
      <nav aria-label="Primary navigation" className="nav-inner">
        <Link href="/" className="nav-brand" aria-label="Attendify home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="brand-copy">
            <span className="brand-wordmark">Attendify</span>
            <span className="brand-subtitle">{copy.brand}</span>
          </span>
        </Link>

        <div className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "is-active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="language-toggle"
            aria-label="Switch language"
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
          >
            {locale === "en" ? "AR" : "EN"}
          </button>

          <Link href="/access" className="nav-cta" data-primary="true">
            {copy.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
