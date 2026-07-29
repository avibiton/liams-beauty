import { useTranslations } from "next-intl";
import { BUSINESS_CONFIG } from "@/lib/config";

interface ServiceItem {
  name: string;
  description: string;
  price: string;
  duration: string;
}

export default function Services() {
  const t = useTranslations("services");
  const tNav = useTranslations("nav");

  const eyebrowItems: ServiceItem[] = t.raw("eyebrows.items") as ServiceItem[];
  const hairItems: ServiceItem[] = t.raw("hair.items") as ServiceItem[];

  return (
    <section id="services" className="bg-beige py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
            {t("badge")}
          </span>
          <h2 className="font-display mb-4 whitespace-pre-line text-3xl font-bold text-brown-800 md:text-4xl">
            {t("headline")}
          </h2>
          <p className="mx-auto max-w-xl text-brown-500">{t("subheadline")}</p>
        </div>

        {/* Eyebrow services */}
        <CategorySection
          icon={<BrowIcon />}
          title={t("eyebrows.title")}
          items={eyebrowItems}
          ctaLabel={t("cta")}
          bookingUrl={BUSINESS_CONFIG.bookingUrl}
          accent="gold"
        />

        <div className="my-10 border-t border-beige-dark" />

        {/* Hair services */}
        <CategorySection
          icon={<HairIcon />}
          title={t("hair.title")}
          items={hairItems}
          ctaLabel={t("cta")}
          bookingUrl={BUSINESS_CONFIG.bookingUrl}
          accent="brown"
        />

        <p className="mt-8 text-center text-xs text-brown-400">{t("priceNote")}</p>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <a
            href={BUSINESS_CONFIG.bookingUrl}
            className="inline-flex items-center gap-2 rounded-full bg-brown-700 px-8 py-4 font-semibold text-cream shadow-md transition-all hover:bg-gold-400 hover:text-brown-900 hover:shadow-lg"
          >
            <CalendarIcon />
            {tNav("bookNow")}
          </a>
        </div>
      </div>
    </section>
  );
}

function CategorySection({
  icon,
  title,
  items,
  ctaLabel,
  bookingUrl,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  items: ServiceItem[];
  ctaLabel: string;
  bookingUrl: string;
  accent: "gold" | "brown";
}) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            accent === "gold" ? "bg-gold-400/20 text-gold-500" : "bg-brown-200 text-brown-600"
          }`}
        >
          {icon}
        </div>
        <h3 className="font-display text-2xl font-bold text-brown-700">{title}</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex flex-col rounded-2xl bg-cream p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <h4 className="mb-2 font-semibold text-brown-800">{item.name}</h4>
            <p className="mb-4 flex-1 text-sm leading-relaxed text-brown-500">{item.description}</p>
            <div className="mb-4 flex items-center justify-between border-t border-beige pt-3">
              <span className="text-sm font-semibold text-gold-500">{item.price}</span>
              <span className="flex items-center gap-1 text-xs text-brown-400">
                <ClockIcon />
                {item.duration}
              </span>
            </div>
            <a
              href={bookingUrl}
              className="flex items-center justify-center gap-1.5 rounded-full border border-brown-300 py-2 text-sm font-medium text-brown-700 transition-colors group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-brown-900"
            >
              <CalendarIcon />
              {ctaLabel}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 0M5 9c0 0 3-2 7-2s7 2 7 2M12 21l0-9" />
    </svg>
  );
}

function HairIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18M8 6c0 0-3 3-3 8M16 6c0 0 3 3 3 8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
