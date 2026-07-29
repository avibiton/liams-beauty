"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface Testimonial {
  name: string;
  location: string;
  text: string;
  service: string;
  rating: number;
}

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items: Testimonial[] = t.raw("items") as Testimonial[];
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="bg-brown-700 py-20 text-cream md:py-28">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-300">
            {t("badge")}
          </span>
          <h2 className="font-display mb-3 whitespace-pre-line text-3xl font-bold text-cream md:text-4xl">
            {t("headline")}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={i}
              className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                active === i
                  ? "border-gold-400/50 bg-brown-600 shadow-lg"
                  : "border-white/10 bg-white/5 hover:border-gold-400/30 hover:bg-white/10"
              }`}
              onClick={() => setActive(i)}
            >
              {/* Stars */}
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-4 text-sm leading-relaxed text-cream/80">&ldquo;{item.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-400/20 text-sm font-bold text-gold-300">
                  {item.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">{item.name}</p>
                  <p className="text-xs text-cream/50">{item.location} · {item.service}</p>
                </div>
              </div>

              {/* Active indicator */}
              {active === i && (
                <div className="absolute bottom-0 start-1/2 h-1 w-12 -translate-x-1/2 translate-y-1 rounded-full bg-gold-400" />
              )}
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                active === i ? "w-6 bg-gold-400" : "w-1.5 bg-white/30"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
