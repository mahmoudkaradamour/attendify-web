import RoutePage from "@/components/route-page";

export default function AccessPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Access",
        eyebrowAr: "الدخول",
        titleEn: "Secure access pathways for every operator",
        titleAr: "مسارات دخول آمنة لكل مشغل",
        descriptionEn:
          "Use this area to direct company owners, administrators, and support users into the correct portal with a clear trust boundary.",
        descriptionAr:
          "استخدم هذه الصفحة لتوجيه المالكين والمشرفين وفرق الدعم إلى البوابة الصحيحة ضمن حدود ثقة واضحة.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Documentation",
        secondaryLabelAr: "الوثائق",
        secondaryHref: "/docs",
        cards: [
          {
            titleEn: "Company owners",
            titleAr: "مالكو الشركات",
            bodyEn: "Sign in to review company configuration, deployment status, and commercial controls.",
            bodyAr: "سجّل الدخول لمراجعة إعدادات الشركة وحالة النشر والضوابط التجارية."
          },
          {
            titleEn: "Administrators",
            titleAr: "المشرفون",
            bodyEn: "Manage access, users, and operational settings from a dedicated administration flow.",
            bodyAr: "أدر الوصول والمستخدمين والإعدادات التشغيلية من خلال مسار إداري مخصص."
          },
          {
            titleEn: "Support operators",
            titleAr: "فرق الدعم",
            bodyEn: "Use verified request context and audit trails to resolve incidents without broad trust exposure.",
            bodyAr: "استخدم سياق الطلب الموثق وسجلات التدقيق لحل الحوادث من دون توسيع نطاق الثقة."
          }
        ]
      }}
    />
  );
}