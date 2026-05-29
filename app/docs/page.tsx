import RoutePage from "@/components/route-page";

export default function DocsPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Docs Portal",
        eyebrowAr: "بوابة الوثائق",
        titleEn: "Documentation designed for engineers, security teams, and auditors",
        titleAr: "وثائق مصممة للمهندسين وفرق الأمن والتدقيق",
        descriptionEn:
          "Use this area as the entry point to product docs, release notes, and integration guidance for technical stakeholders.",
        descriptionAr:
          "استخدم هذه الصفحة كنقطة دخول إلى وثائق المنتج وملاحظات الإصدارات وإرشادات التكامل للجهات التقنية.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Portal",
        secondaryLabelAr: "البوابة",
        secondaryHref: "/portal",
        cards: [
          {
            titleEn: "System overview",
            titleAr: "نظرة عامة على النظام",
            bodyEn: "Narrative guidance for the platform philosophy and trust boundaries.",
            bodyAr: "إرشاد سردي لفلسفة المنصة وحدود الثقة."
          },
          {
            titleEn: "Integration guide",
            titleAr: "دليل التكامل",
            bodyEn: "Step-by-step onboarding for integrators and implementation teams.",
            bodyAr: "خطوات تنفيذية واضحة لفرق الدمج والتنفيذ."
          },
          {
            titleEn: "Security and operations",
            titleAr: "الأمن والعمليات",
            bodyEn: "Threat model, error model, runbooks, and release policy in one place.",
            bodyAr: "نموذج التهديدات، ونموذج الأخطاء، وإجراءات التشغيل، وسياسة الإصدارات في مكان واحد."
          }
        ]
      }}
    />
  );
}