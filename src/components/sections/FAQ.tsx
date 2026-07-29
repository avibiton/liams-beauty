"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const t = useTranslations("faq");
  const items: FAQItem[] = t.raw("items") as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-beige py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
            {t("badge")}
          </span>
          <h2 className="font-display mb-4 whitespace-pre-line text-3xl font-bold text-brown-800 md:text-4xl">
            {t("headline")}
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                openIndex === i
                  ? "border-gold-400/50 bg-cream shadow-md"
                  : "border-beige-dark bg-cream hover:border-brown-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-brown-800">{item.q}</span>
                <span
                  className={`shrink-0 text-gold-500 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                >
                  <ChevronIcon />
                </span>
              </button>

              {openIndex === i && (
                <div className="border-t border-beige-dark px-5 pb-5 pt-4">
                  <p className="leading-relaxed text-brown-600">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Schema FAQ is injected in layout JSON-LD */}
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
