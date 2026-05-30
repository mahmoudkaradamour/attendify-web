"use client";

import Link from "next/link";
import TopNav from "@/components/top-nav";
import { useLanguage } from "@/lib/site-language";
import { PLAN_MATRIX, PUBLIC_HIGHLIGHTS, TRUST_METRICS } from "@/lib/platform";

export default function HomePage() {
  const { locale } = useLanguage();
  const ar = locale === "ar";

  return (
    <main className="page-shell">
      <TopNav />

      <section className="hero-grid">
        <div className="hero-copy glass-panel">
          <span className="eyebrow">Cloudflare-native attendance operations</span>
          <h1>
            {ar
              ? "منصة ثقة للحضور تبدو وتعمل كمنتج عالمي حقيقي"
              : "A trust platform for attendance that feels and behaves like a global product"}
          </h1>
          <p className="section-copy">
            {ar
              ? "Attendify يوحّد تسجيل الشركات، وأدوات الأدمن، وأجهزة التحقق، وسجل التدقيق في واجهة واحدة فاخرة متصلة بالـ Cloudflare edge والباكند الآمن."
              : "Attendify unifies company onboarding, admin controls, device trust, and audit visibility into one premium surface connected to the Cloudflare edge and a secure backend."}
          </p>

          <div className="button-row">
            <Link href="/access" className="button-primary">
              {ar ? "الدخول إلى المنصة" : "Enter the platform"}
            </Link>
            <Link href="/admin" className="button-secondary">
              {ar ? "لوحة الأدمن" : "Open admin console"}
            </Link>
          </div>

          <div className="metric-grid">
            {TRUST_METRICS.map((metric) => (
              <article key={metric.label} className="metric-card">
                <span className="metric-label">{metric.label}</span>
                <strong>{metric.value}</strong>
                <p>{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="hero-visual glass-panel">
          <div className="hero-visual__top">
            <span className="status-pill success">Live on Cloudflare</span>
            <span className="status-pill">Admin-ready</span>
          </div>

          <div className="stack-grid">
            {PUBLIC_HIGHLIGHTS.map((item) => (
              <article key={item.title} className="feature-card soft">
                <div className="feature-card__accent">{item.accent}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="command-card">
            <div className="command-card__title">Control plane snapshot</div>
            <ul>
              <li>JWT login and company registration available through the worker gateway.</li>
              <li>Admin endpoints expose companies, devices, and overview counters.</li>
              <li>Seeded demo data includes an enterprise admin account and sample tenants.</li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">Product architecture</span>
          <h2>Built like an internal platform, presented like a flagship launch</h2>
        </div>

        <div className="feature-grid">
          {[
            ["Onboarding", "Company signup, login, and admin bootstrap are all API-driven."],
            ["Governance", "Roles, plan tiers, and device lifecycle state are visible at a glance."],
            ["Observability", "Audit trails, debugger attempts, and integration state remain first-class."],
            ["Delivery", "Cloudflare Pages + Worker provide edge delivery and a secure API gateway."]
          ].map(([title, body]) => (
            <article key={title} className="feature-card">
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-header">
          <span className="eyebrow">Commercial tiers</span>
          <h2>Plans that read like a procurement brief, not a marketing brochure</h2>
        </div>

        <div className="plan-grid">
          {PLAN_MATRIX.map((plan) => (
            <article key={plan.name} className="plan-card">
              <div className="plan-card__head">
                <h3>{plan.name}</h3>
                <strong>{plan.price}</strong>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell cta-panel glass-panel">
        <div>
          <span className="eyebrow">Ready to operate</span>
          <h2>Open the console, seed tenants, and manage companies from one command center</h2>
          <p className="section-copy">
            The access page includes login and registration flows. The admin console exposes company and device management,
            and the backend now ships with a demo seed script for enterprise-ready sample data.
          </p>
        </div>
        <div className="button-row">
          <Link href="/access" className="button-primary">
            Sign in
          </Link>
          <Link href="/docs" className="button-secondary">
            Explore docs
          </Link>
        </div>
      </section>
    </main>
  );
}
