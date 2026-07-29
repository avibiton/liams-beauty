"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { GALLERY_ITEMS } from "@/lib/config";
import Lightbox from "@/components/ui/Lightbox";

type Category = "all" | "eyebrows" | "hair";

export default function Gallery() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === activeCategory);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i !== null && i < filtered.length - 1 ? i + 1 : i)),
    [filtered.length]
  );

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t("all") },
    { key: "eyebrows", label: t("eyebrows") },
    { key: "hair", label: t("hair") },
  ];

  return (
    <section id="gallery" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-gold-400/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
            {t("badge")}
          </span>
          <h2 className="font-display mb-4 whitespace-pre-line text-3xl font-bold text-brown-800 md:text-4xl">
            {t("headline")}
          </h2>
          <p className="mx-auto max-w-xl text-brown-500">{t("subheadline")}</p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-brown-700 text-cream shadow-sm"
                  : "border border-beige-dark bg-cream text-brown-500 hover:border-brown-300 hover:text-brown-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-beige shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-gold-400"
              aria-label={locale === "he" ? item.labelHe : item.labelEn}
            >
              {item.type === "video" ? (
                <>
                  <video
                    src={item.src}
                    poster={item.poster}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="none"
                  />
                  {/* Video play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brown-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 end-2 rounded-full bg-brown-700/80 p-1">
                    <svg className="h-3 w-3 text-cream" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={item.src}
                    alt={locale === "he" ? item.labelHe : item.labelEn}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-brown-900/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs font-medium text-cream">
                      {t("viewFull")}
                    </span>
                  </div>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <Lightbox
            item={{
              type: filtered[lightboxIndex].type,
              src: filtered[lightboxIndex].src,
              poster: filtered[lightboxIndex].poster,
              label: locale === "he" ? filtered[lightboxIndex].labelHe : filtered[lightboxIndex].labelEn,
            }}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
            hasPrev={lightboxIndex > 0}
            hasNext={lightboxIndex < filtered.length - 1}
          />
        )}
      </div>
    </section>
  );
}
