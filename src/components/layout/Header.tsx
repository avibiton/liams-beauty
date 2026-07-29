"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { BUSINESS_CONFIG } from "@/lib/config";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const NAV_ITEMS = [
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "gallery", href: "#gallery" },
  { key: "testimonials", href: "#testimonials" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const whatsappMsg =
    locale === "he" ? BUSINESS_CONFIG.whatsappMessage : BUSINESS_CONFIG.whatsappMessageEn;
  const whatsappHref = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="transition-opacity hover:opacity-80"
          aria-label="Liam's Beauty — דף הבית"
        >
          <Image
            src="/assets/images/logo.jpg"
            alt="Liam's Beauty"
            width={72}
            height={72}
            className="h-12 w-12 rounded-xl object-contain md:h-14 md:w-14"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-brown-600 transition-colors hover:text-gold-500"
            >
              {t(item.key as keyof typeof NAV_ITEMS[number])}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
            className="flex items-center gap-1.5 text-sm font-medium text-brown-600 transition-colors hover:text-gold-500"
          >
            <PhoneIcon />
            {BUSINESS_CONFIG.phone}
          </a>
          <a
            href={BUSINESS_CONFIG.bookingUrl}
            className="rounded-full bg-brown-700 px-5 py-2 text-sm font-semibold text-cream shadow-sm transition-all hover:bg-gold-400 hover:shadow-md"
          >
            {t("bookNow")}
          </a>
        </div>

        {/* Mobile: lang + hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-brown-700 transition-colors hover:bg-beige"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-cream px-6 py-8 lg:hidden">
          <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-beige pb-4 text-xl font-medium text-brown-700 transition-colors hover:text-gold-500"
              >
                {t(item.key as keyof typeof NAV_ITEMS[number])}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-2 rounded-full border border-brown-300 px-6 py-3 text-lg font-medium text-brown-700"
            >
              <PhoneIcon />
              {BUSINESS_CONFIG.phone}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-lg font-semibold text-white"
            >
              {t("bookNow")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
