import RoutePage from "@/components/route-page";

export default function PortalPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Portal",
        eyebrowAr: "البوابة",
        titleEn: "A focused operations portal for trusted workflows",
        titleAr: "بوابة عمليات مركزة لسير العمل الموثوق",
        descriptionEn:
          "This section explains how the platform separates product operations, verification controls, and company-owned decisions.",
        descriptionAr:
          "تشرح هذه الصفحة كيف تفصل المنصة بين العمليات والضوابط الخاصة بالتحقق والقرارات المملوكة للشركة.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Plans",
        secondaryLabelAr: "الخطط",
        secondaryHref: "/subscriptions",
        cards: [
          {
            titleEn: "Verification flow",
            titleAr: "مسار التحقق",
            bodyEn: "Every request is checked against the agreed trust boundary before the company applies business logic.",
            bodyAr: "يُتحقق من كل طلب مقابل حدود الثقة المتفق عليها قبل تطبيق منطق العمل الخاص بالشركة."
          },
          {
            titleEn: "Operational visibility",
            titleAr: "الرؤية التشغيلية",
            bodyEn: "Use the portal to align product operators, support teams, and auditors around the same evidence model.",
            bodyAr: "استخدم البوابة لمواءمة فرق التشغيل والدعم والتدقيق حول نموذج الأدلة نفسه."
          },
          {
            titleEn: "Ownership boundary",
            titleAr: "حدود الملكية",
            bodyEn: "Decisions remain with the company; Attendify supplies the verification artifacts.",
            bodyAr: "القرارات تبقى لدى الشركة؛ بينما يوفّر Attendify مخرجات التحقق فقط."
          }
        ]
      }}
    />
  );
}