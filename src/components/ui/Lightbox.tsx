"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";

interface LightboxItem {
  type: "image" | "video";
  src: string;
  poster?: string;
  label: string;
}

interface LightboxProps {
  item: LightboxItem;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.label}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        style={{ insetInlineEnd: "1rem" }}
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute start-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute end-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media */}
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-[85vw] rounded-xl"
          />
        ) : (
          <div className="relative h-[85vh] w-[85vw] max-w-3xl">
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="rounded-xl object-contain"
              sizes="85vw"
              priority
            />
          </div>
        )}
        <p className="mt-2 text-center text-sm text-white/70">{item.label}</p>
      </div>
    </div>
  );
}
