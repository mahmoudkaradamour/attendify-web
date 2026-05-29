"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
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

const shellStyle: CSSProperties = {
  display: "grid",
  gap: "2rem",
  paddingBottom: "4rem"
};

const cardGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
  marginTop: "2rem"
};

const cardStyle: CSSProperties = {
  background: "rgba(255, 255, 255, 0.82)",
  border: "1px solid rgba(21, 101, 192, 0.14)",
  borderRadius: "22px",
  padding: "1.15rem 1.15rem 1.25rem",
  boxShadow: "0 18px 50px rgba(21, 101, 192, 0.08)",
  backdropFilter: "blur(12px)"
};

const actionRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.85rem",
  marginTop: "1.75rem"
};

const primaryButtonStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.95rem 1.4rem",
  borderRadius: "999px",
  textDecoration: "none",
  background: "linear-gradient(135deg, #1a73e8, #185abc)",
  color: "#fff",
  fontWeight: 700,
  boxShadow: "0 14px 30px rgba(26, 115, 232, 0.22)"
};

const secondaryButtonStyle: CSSProperties = {
  ...primaryButtonStyle,
  background: "rgba(255, 255, 255, 0.76)",
  color: "#0f172a",
  border: "1px solid rgba(21, 101, 192, 0.18)",
  boxShadow: "none"
};

export default function RoutePage({ copy }: { copy: RoutePageCopy }) {
  const { locale } = useLanguage();
  const ar = locale === "ar";

  return (
    <main className="public-shell">
      <TopNav />

      <section className="hero fade-up">
        <div className="hero-copy" style={shellStyle}>
          <div>
            <span className="eyebrow">{ar ? copy.eyebrowAr : copy.eyebrowEn}</span>
            <h1>{ar ? copy.titleAr : copy.titleEn}</h1>
            <p className="section-copy">{ar ? copy.descriptionAr : copy.descriptionEn}</p>
          </div>

          <div style={cardGridStyle}>
            {copy.cards.map((card) => (
              <article key={card.titleEn} style={cardStyle}>
                <h2 style={{ margin: 0, fontSize: "1.05rem" }}>{ar ? card.titleAr : card.titleEn}</h2>
                <p style={{ margin: "0.75rem 0 0", color: "var(--muted)", lineHeight: 1.7 }}>
                  {ar ? card.bodyAr : card.bodyEn}
                </p>
              </article>
            ))}
          </div>

          <div style={actionRowStyle}>
            <Link href={copy.primaryHref} style={primaryButtonStyle}>
              {ar ? copy.primaryLabelAr : copy.primaryLabelEn}
            </Link>
            {copy.secondaryHref && copy.secondaryLabelEn ? (
              <Link href={copy.secondaryHref} style={secondaryButtonStyle}>
                {ar ? copy.secondaryLabelAr ?? copy.secondaryLabelEn : copy.secondaryLabelEn}
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}