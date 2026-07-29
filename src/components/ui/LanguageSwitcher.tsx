"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const targetLocale = locale === "he" ? "en" : "he";

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`);
    startTransition(() => {
      router.push(newPath);
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className={`rounded-full border border-brown-300 px-3 py-1 text-sm font-medium text-brown-600 transition-colors hover:border-gold-400 hover:text-gold-500 disabled:opacity-50 ${className}`}
      aria-label={`Switch to ${targetLocale === "he" ? "Hebrew" : "English"}`}
    >
      {t("switchLang")}
    </button>
  );
}
