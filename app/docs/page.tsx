import RoutePage from "@/components/route-page";

export default function DocsPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Docs Portal",
        eyebrowAr: "بوابة الوثائق",
        titleEn: "Documentation for operators, engineers, auditors, and integration teams",
        titleAr: "وثائق للمشغلين والمهندسين والمدققين وفرق التكامل",
        descriptionEn:
          "Use this entry point for system diagrams, API contracts, runbooks, and operational controls that match the live backend.",
        descriptionAr:
          "استخدم هذه الصفحة كنقطة دخول إلى المخططات والعقود البرمجية وإجراءات التشغيل والضوابط المتوافقة مع الخادم الحي.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Open portal",
        secondaryLabelAr: "فتح البوابة",
        secondaryHref: "/portal",
        cards: [
          {
            titleEn: "System overview",
            titleAr: "نظرة عامة على النظام",
            bodyEn: "The platform architecture, trust boundaries, and deployment model in one place.",
            bodyAr: "معمارية المنصة وحدود الثقة ونموذج النشر في مكان واحد."
          },
          {
            titleEn: "Integration guide",
            titleAr: "دليل التكامل",
            bodyEn: "Implementation guidance for authentication, verification, and tenant-owned endpoints.",
            bodyAr: "إرشادات تنفيذ للمصادقة والتحقق ونقاط النهاية المملوكة للشركة."
          },
          {
            titleEn: "Security and operations",
            titleAr: "الأمن والعمليات",
            bodyEn: "Security policy, runbooks, and verification logs aligned to the current release workflow.",
            bodyAr: "سياسة الأمن وإجراءات التشغيل وسجل التحقق بما يتوافق مع مسار الإصدار الحالي."
          }
        ]
      }}
    />
  );
}