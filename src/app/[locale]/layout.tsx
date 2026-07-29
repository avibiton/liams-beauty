import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { BUSINESS_CONFIG } from "@/lib/config";

type Locale = (typeof routing.locales)[number];

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const isHe = locale === "he";
  const siteUrl = BUSINESS_CONFIG.siteUrl;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        he: `${siteUrl}/he`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${siteUrl}/${locale}`,
      siteName: "Liam's Beauty",
      locale: isHe ? "he_IL" : "en_US",
      type: "website",
      images: [
        {
          url: `${siteUrl}/assets/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Liam's Beauty — עיצוב גבות והחלקות שיער",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${siteUrl}/assets/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "he";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              name: "Liam's Beauty",
              description:
                "עיצוב גבות מקצועי והחלקות שיער בהתאמה אישית באור עקיבא וקיסריה",
              url: BUSINESS_CONFIG.siteUrl,
              telephone: BUSINESS_CONFIG.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "אור עקיבא",
                addressRegion: "מחוז חיפה",
                addressCountry: "IL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: BUSINESS_CONFIG.location.lat,
                longitude: BUSINESS_CONFIG.location.lng,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
                  opens: "09:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Friday",
                  opens: "09:00",
                  closes: "14:00",
                },
              ],
              sameAs: [
                `https://www.instagram.com/${BUSINESS_CONFIG.instagram}`,
                `https://www.facebook.com/${BUSINESS_CONFIG.facebook}`,
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Beauty Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "עיצוב גבות",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "החלקות שיער",
                    },
                  },
                ],
              },
            }),
          }}
        />
        {/* Google Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-cream font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
