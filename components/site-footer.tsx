"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/site-language";

const footerCopy = {
  en: {
    product: "Product",
    build: "Build",
    company: "Company",
    links: [
      ["Overview", "/"],
      ["Access Portal", "/access"],
      ["Admin Console", "/admin"],
      ["Plans", "/subscriptions"]
    ],
    buildLinks: [
      ["Onboarding", "/onboarding"],
      ["Webhooks", "/integration"],
      ["Geofencing", "/geofencing"]
    ],
    companyLinks: [
      ["Developer Portal", "/developer"],
      ["Docs", "/docs"]
    ],
    description: "Public marketing site, company onboarding, owner access, subscriptions, geofencing, and webhook operations in one product surface.",
    tagline: "Built for enterprise attendance workflows."
  },
  ar: {
    product: "المنتج",
    build: "البناء",
    company: "الشركة",
    links: [
      ["نظرة عامة", "/"],
      ["بوابة الدخول", "/access"],
      ["لوحة الأدمن", "/admin"],
      ["الخطط", "/subscriptions"]
    ],
    buildLinks: [
      ["الإعداد الأولي", "/onboarding"],
      ["الربط عبر الويب هوك", "/integration"],
      ["المناطق الجغرافية", "/geofencing"]
    ],
    companyLinks: [
      ["بوابة المطورين", "/developer"],
      ["الوثائق", "/docs"]
    ],
    description: "واجهة عامة للتسويق، وإعداد الشركات، ودخول المالكين والمطورين، والاشتراكات، والمناطق الجغرافية، وعمليات الويب هوك في مساحة منتج واحدة.",
    tagline: "مصمم لسير عمل الحضور المؤسسي."
  }
} as const;

export default function SiteFooter() {
  const { locale } = useLanguage();
  const copy = footerCopy[locale];

  return (
    <footer className="footer-shell">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="brand-lockup">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <div>
              <div className="brand-wordmark">Attendify</div>
              <div className="brand-subtitle">{locale === "en" ? "Attendance Trust Platform" : "منصة الثقة للحضور"}</div>
            </div>
          </div>
          <p>{copy.description}</p>
        </div>

        <div className="footer-grid">
          <div>
            <h3>{copy.product}</h3>
            <div className="footer-links">
              {copy.links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>{copy.build}</h3>
            <div className="footer-links">
              {copy.buildLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>{copy.company}</h3>
            <div className="footer-links">
              {copy.companyLinks.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <span>{copy.tagline}</span>
        <span>© {new Date().getFullYear()} Attendify</span>
      </div>
    </footer>
  );
}
