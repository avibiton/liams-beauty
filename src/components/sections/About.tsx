import Image from "next/image";
import { useTranslations } from "next-intl";
import { BUSINESS_CONFIG } from "@/lib/config";

export default function About() {
  const t = useTranslations("about");

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Portrait */}
          <div className="relative order-2 md:order-1">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-beige shadow-xl">
              <Image
                src="/assets/images/liam-portrait.jpg"
                alt="ליאם — Liam's Beauty"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />

            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-beige p-4 text-center shadow-sm"
                >
                  <p className="font-display text-2xl font-bold text-brown-700">{s.value}</p>
                  <p className="mt-0.5 text-xs text-brown-500">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
              {t("badge")}
            </span>
            <h2 className="font-display mb-6 whitespace-pre-line text-3xl font-bold leading-tight text-brown-800 md:text-4xl">
              {t("headline")}
            </h2>
            <p className="mb-4 leading-relaxed text-brown-600">{t("p1")}</p>
            <p className="mb-8 leading-relaxed text-brown-600">{t("p2")}</p>

            {/* Features */}
            <ul className="mb-8 space-y-3">
              {ABOUT_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 text-brown-600">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={BUSINESS_CONFIG.bookingUrl}
              className="inline-flex items-center gap-2 rounded-full bg-brown-700 px-7 py-3.5 font-semibold text-cream shadow-md transition-all hover:bg-gold-400 hover:text-brown-900 hover:shadow-lg"
            >
              {t("cta")}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const ABOUT_FEATURES = [
  "חומרים מאושרים משרד הבריאות",
  "טכנולוגיה מתקדמת ומקצועית",
  "התאמה אישית לכל פנים וסוג שיער",
  "חוויה נעימה, אישית ומפנקת",
];

function CheckIcon() {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-400/20">
      <svg className="h-3 w-3 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg className="h-4 w-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
