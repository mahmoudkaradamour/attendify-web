import RoutePage from "@/components/route-page";

export default function SubscriptionsPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Plans",
        eyebrowAr: "الخطط",
        titleEn: "Subscription tiers built for enterprise readiness",
        titleAr: "مستويات اشتراك مصممة للجاهزية المؤسسية",
        descriptionEn:
          "This page frames pricing, onboarding, and entitlement boundaries for enterprise buyers and procurement teams.",
        descriptionAr:
          "تعرض هذه الصفحة التسعير والتأهيل وحدود الصلاحيات للجهات المؤسسية وفرق المشتريات.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Access",
        secondaryLabelAr: "الدخول",
        secondaryHref: "/access",
        cards: [
          {
            titleEn: "Starter",
            titleAr: "الأساسية",
            bodyEn: "For pilots and low-volume deployments that need a clean proof of value.",
            bodyAr: "للتجارب والتشغيل منخفض الحجم الذي يحتاج إلى إثبات قيمة واضح."
          },
          {
            titleEn: "Business",
            titleAr: "الأعمال",
            bodyEn: "For teams that need stronger controls, operational reporting, and support alignment.",
            bodyAr: "للأطقم التي تحتاج إلى ضوابط أقوى وتقارير تشغيلية وتنسيق أفضل مع الدعم."
          },
          {
            titleEn: "Enterprise",
            titleAr: "المؤسسي",
            bodyEn: "For advanced governance, custom integrations, and formal security review requirements.",
            bodyAr: "للحوكمة المتقدمة والتكاملات المخصصة ومتطلبات المراجعة الأمنية الرسمية."
          }
        ]
      }}
    />
  );
}