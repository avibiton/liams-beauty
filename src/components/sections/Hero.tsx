"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const whatsappMsg =
    locale === "he" ? BUSINESS_CONFIG.whatsappMessage : BUSINESS_CONFIG.whatsappMessageEn;
  const whatsappHref = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;
  const headlineLines = t("headline").split("\n");

  return (
    <section id="hero" className="overflow-hidden bg-cream">
      <div className="pt-20 md:pt-24" />

      {/* ── Image mosaic ── */}
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div
          className="grid gap-2 md:gap-3"
          style={{ gridTemplateColumns: "1fr 2.1fr 1fr", height: "clamp(220px, 42vw, 520px)" }}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
              <Image
                src="/assets/images/eb1.jpeg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="15vw"
              />
            </div>
            <div className="hidden rounded-xl bg-beige px-4 py-3 md:block">
              <p className="text-xs leading-relaxed text-brown-600">
                {locale === "he" ? "עיצוב מקצועי לכל פנים" : "Professional design for every face"}
              </p>
            </div>
          </div>

          {/* Column 2 — main */}
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/assets/images/lb1_after.jpeg"
              alt=""
              fill
              className="object-cover object-top"
              priority
              sizes="40vw"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl">
              <Image
                src="/assets/images/eb2.jpeg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="15vw"
              />
            </div>
            <div className="hidden rounded-xl bg-beige px-4 py-3 md:flex md:flex-col md:justify-between">
              <p className="text-xs text-brown-600">
                {locale === "he" ? "תוצאות שמדברות בעד עצמן" : "Results that speak for themselves"}
              </p>
              <a
                href="#gallery"
                className="mt-2 text-xs font-semibold text-gold-600 underline underline-offset-2 hover:text-gold-500"
              >
                {locale === "he" ? "לגלריה" : "Explore"} →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Big headline ── */}
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <h1
          className="font-display mt-4 font-bold leading-[0.88] tracking-tight text-brown-800 md:mt-6"
          style={{ fontSize: "clamp(2.6rem, 10.5vw, 8.5rem)" }}
        >
          {headlineLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Sub + CTAs */}
        <div className="mt-6 flex flex-col gap-5 md:mt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-brown-500 md:text-base">
            {t("subheadline")}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={BUSINESS_CONFIG.bookingUrl}
              className="flex items-center gap-2 rounded-full bg-brown-800 px-7 py-3.5 text-sm font-bold text-cream shadow-md transition-all hover:bg-gold-400 hover:text-brown-900"
            >
              <CalendarIcon />
              {t("cta1")}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-brown-300 px-7 py-3.5 text-sm font-semibold text-brown-700 transition-all hover:border-[#25D366] hover:text-[#25D366]"
            >
              <WhatsAppIcon />
              {t("cta2")}
            </a>
          </div>
        </div>
      </div>

      <div className="pb-14 md:pb-20" />

      {/* Click-to-call bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 border-t border-brown-200 bg-cream/95 px-4 py-3 backdrop-blur-sm sm:hidden">
        <a
          href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brown-300 py-2 text-sm font-medium text-brown-700"
        >
          <PhoneIcon />
          {BUSINESS_CONFIG.phone}
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-2 text-sm font-semibold text-white"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
