"use client";

import Link from "next/link";
import TopNav from "@/components/top-nav";
import { useLanguage } from "@/lib/site-language";

type Card = {
  titleEn: string;
  titleAr: string;
  bodyEn: string;
  bodyAr: string;
};

export type RoutePageCopy = {
  eyebrowEn: string;
  eyebrowAr: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  primaryLabelEn: string;
  primaryLabelAr: string;
  primaryHref: string;
  secondaryLabelEn?: string;
  secondaryLabelAr?: string;
  secondaryHref?: string;
  cards: Card[];
};

export default function RoutePage({ copy }: { copy: RoutePageCopy }) {
  const { locale } = useLanguage();
  const ar = locale === "ar";

  return (
    <main className="page-shell">
      <TopNav />

      <section className="hero-grid compact fade-up">
        <div className="hero-copy glass-panel">
          <div>
            <span className="eyebrow">{ar ? copy.eyebrowAr : copy.eyebrowEn}</span>
            <h1>{ar ? copy.titleAr : copy.titleEn}</h1>
            <p className="section-copy">{ar ? copy.descriptionAr : copy.descriptionEn}</p>
          </div>

          <div className="feature-grid">
            {copy.cards.map((card) => (
              <article key={card.titleEn} className="feature-card soft">
                <h2 style={{ margin: 0, fontSize: "1.05rem" }}>{ar ? card.titleAr : card.titleEn}</h2>
                <p style={{ marginTop: "0.75rem" }}>
                  {ar ? card.bodyAr : card.bodyEn}
                </p>
              </article>
            ))}
          </div>

          <div className="button-row">
            <Link href={copy.primaryHref} className="button-primary">
              {ar ? copy.primaryLabelAr : copy.primaryLabelEn}
            </Link>
            {copy.secondaryHref && copy.secondaryLabelEn ? (
              <Link href={copy.secondaryHref} className="button-secondary">
                {ar ? copy.secondaryLabelAr ?? copy.secondaryLabelEn : copy.secondaryLabelEn}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}