"use client";

import TopNav from "@/components/top-nav";
import Link from "next/link";
import { useLanguage } from "@/lib/site-language";

export default function HomePage() {
  const { locale } = useLanguage();
  const ar = locale === "ar";

  return (
    <main className="public-shell">
      <TopNav />

      <section className="hero fade-up">
        <div className="hero-copy">
          <div className="hero-brand">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <div>
              <div className="brand-wordmark">Attendify</div>
              <div className="brand-subtitle">Attendance Trust Platform</div>
            </div>
          </div>

          <span className="eyebrow">Google-grade public front door</span>
          <h1>{ar ? "واجهة زرقاء فاخرة تشرح المنتج وتحول الزوار إلى عملاء." : "A premium blue-gradient landing page that explains the product and converts visitors into customers."}</h1>
          <p className="section-copy">
            {ar
              ? "Attendify هي الواجهة العامة لمنصة الثقة للحضور: تجربة سريعة وفاخرة لتسجيل الشركات، ودخول المالكين والمطورين، وإدارة الاشتراكات، وعمليات الويب هوك، والمناطق الجغرافية، ورؤية التدقيق."
              : "Attendify is the public front door for the attendance trust platform: a fast, premium experience for company registration, owner and developer access, subscription governance, webhook operations, geofencing, and audit visibility."}
          </p>
        </div>
      </section>
    </main>
  );
}
