import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-2 text-sm text-brown-500 hover:text-brown-700"
        >
          <svg className="h-4 w-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t("back")}
        </Link>

        <div className="mb-10 text-center">
          <h1 className="font-display mb-3 text-3xl font-bold text-brown-800 md:text-4xl">
            {t("title")}
          </h1>
          <p className="text-brown-500">{t("subtitle")}</p>
        </div>

        {/* Booking embed */}
        {BUSINESS_CONFIG.bookingUrl && BUSINESS_CONFIG.bookingUrl !== "#contact" ? (
          <iframe
            src={BUSINESS_CONFIG.bookingUrl}
            width="100%"
            height="700"
            className="rounded-2xl border border-beige-dark shadow-sm"
            title={t("title")}
            loading="lazy"
          />
        ) : (
          <div className="rounded-2xl border border-beige-dark bg-beige p-12 text-center">
            <p className="mb-4 text-brown-600">
              {locale === "he"
                ? "הגדירי את כתובת מערכת ההזמנות שלך בקובץ .env.local"
                : "Configure your booking system URL in .env.local"}
            </p>
            <code className="rounded bg-brown-100 px-3 py-1.5 text-sm text-brown-700">
              NEXT_PUBLIC_BOOKING_URL=https://calendly.com/your-link
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
