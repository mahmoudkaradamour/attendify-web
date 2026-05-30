import RoutePage from "@/components/route-page";

export default function PortalPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Portal",
        eyebrowAr: "البوابة",
        titleEn: "An operations portal built for company owners and audit teams",
        titleAr: "بوابة تشغيل مصممة لمالكي الشركات وفرق المراجعة",
        descriptionEn:
          "Use the portal to understand tenant state, operational boundaries, and the path from company onboarding to verified device governance.",
        descriptionAr:
          "استخدم البوابة لفهم حالة المستأجر وحدود التشغيل والمسار من تسجيل الشركة إلى حوكمة الأجهزة الموثقة.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Open admin",
        secondaryLabelAr: "فتح الأدمن",
        secondaryHref: "/admin",
        cards: [
          {
            titleEn: "Company onboarding",
            titleAr: "تسجيل الشركة",
            bodyEn: "New tenants are created in the backend, activated by policy, and exposed through the admin console.",
            bodyAr: "يتم إنشاء المستأجرين في الخادم، وتفعيلهم بسياسة واضحة، ثم عرضهم في لوحة الأدمن."
          },
          {
            titleEn: "Device governance",
            titleAr: "حوكمة الأجهزة",
            bodyEn: "Enrollment, suspension, revocation, and key rotation are all surfaced as controlled operations.",
            bodyAr: "التسجيل والتعليق والسحب وتدوير المفاتيح تظهر كلها كعمليات محكومة داخل النظام."
          },
          {
            titleEn: "Audit-ready state",
            titleAr: "حالة جاهزة للتدقيق",
            bodyEn: "Each action is built to be reflected in MongoDB and verified through the live admin console.",
            bodyAr: "كل إجراء مصمم ليظهر في MongoDB ويمكن التحقق منه من خلال لوحة الأدمن الحية."
          }
        ]
      }}
    />
  );
}