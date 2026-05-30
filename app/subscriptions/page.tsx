import RoutePage from "@/components/route-page";

export default function SubscriptionsPage() {
  return (
    <RoutePage
      copy={{
        eyebrowEn: "Plans",
        eyebrowAr: "الخطط",
        titleEn: "Subscription tiers shaped for operational procurement",
        titleAr: "مستويات اشتراك مصممة للشراء والتشغيل المؤسسي",
        descriptionEn:
          "Model the commercial structure, the entitlement boundaries, and the support posture that enterprise buyers expect.",
        descriptionAr:
          "تعرض هذه الصفحة الهيكل التجاري وحدود الصلاحيات ومستوى الدعم الذي تتوقعه الجهات المؤسسية.",
        primaryLabelEn: "Back to home",
        primaryLabelAr: "العودة إلى الرئيسية",
        primaryHref: "/",
        secondaryLabelEn: "Open test lab",
        secondaryLabelAr: "فتح مختبر الاختبار",
        secondaryHref: "/admin",
        cards: [
          {
            titleEn: "Starter",
            titleAr: "الأساسية",
            bodyEn: "For pilots and controlled launches that need a crisp proof of value and tight scope.",
            bodyAr: "للتجارب والإطلاقات المضبوطة التي تحتاج إثبات قيمة واضحًا ونطاقًا محدودًا."
          },
          {
            titleEn: "Business",
            titleAr: "الأعمال",
            bodyEn: "For teams that need governance, live operations, and a structured admin workflow.",
            bodyAr: "للأطقم التي تحتاج إلى حوكمة وتشغيل حي ومسار إداري منظم."
          },
          {
            titleEn: "Enterprise",
            titleAr: "المؤسسي",
            bodyEn: "For advanced governance, security review, and integrations that must be operationally auditable.",
            bodyAr: "للحوكمة المتقدمة والمراجعة الأمنية والتكاملات التي يجب أن تكون قابلة للتدقيق التشغيلي."
          }
        ]
      }}
    />
  );
}