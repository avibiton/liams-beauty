"use client";

import Image from "next/image";
import { useLocale } from "next-intl";

const INSTAGRAM_URL = "https://www.instagram.com/liams_beauty_/";
const HANDLE = "@liams_beauty_";

const GALLERY_IMAGES = [
  "/assets/images/lb1_after.jpeg",
  "/assets/images/eb1.jpeg",
  "/assets/images/lb2_after.jpeg",
  "/assets/images/eb2.jpeg",
  "/assets/images/lb1_before1.jpeg",
  "/assets/images/lb1_before2.jpeg",
];

export default function InstagramSnippet() {
  const locale = useLocale();

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-105"
            style={{ background: "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)" }}
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <h2 className="font-display text-2xl font-bold text-brown-800 md:text-3xl">
            {locale === "he" ? "עקבו אחרינו" : "Follow Us"}
          </h2>
          <p className="text-sm text-brown-500 md:text-base">
            {locale === "he"
              ? "טיפולים, השראה ותוצאות — מהסטודיו אליכם"
              : "Treatments, inspiration & results — straight from the studio"}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brown-600 transition-colors hover:text-[#dd2a7b]"
          >
            {HANDLE}
          </a>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-2xl md:grid-cols-6 md:gap-3">
          {GALLERY_IMAGES.map((src, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-beige"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 17vw"
              />
              {/* hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "rgba(221,42,123,0.35)" }}>
                <InstagramIcon className="h-6 w-6 text-white drop-shadow" />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)" }}
          >
            <InstagramIcon className="h-4 w-4" />
            {locale === "he" ? "לעמוד האינסטגרם" : "Follow on Instagram"}
          </a>
        </div>
      </div>
    </section>
  );
}

function InstagramIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
