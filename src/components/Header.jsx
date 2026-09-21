import React from 'react';
import { MapPin, Star, Instagram, Youtube } from 'lucide-react';
import { SOCIAL_MEDIA } from '../data/packagesData';

// Custom lightweight SVG icons for TikTok and X
function TikTokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.46v-7.05a8.16 8.16 0 0 0 5.77 2.31V12a4.84 4.84 0 0 1-3.77-1.39 4.84 4.84 0 0 1-.23-3.92z"/>
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export default function Header() {
  return (
    <header className="pt-4 pb-2 px-4 max-w-xl mx-auto text-center">
      {/* Brand Typography Wordmark (Replacing image logo with attractive editorial font) */}
      <div className="flex flex-col items-center justify-center">
        <div className="inline-block py-1">
          <span className="font-black text-2xl md:text-3xl tracking-[0.22em] text-charcoal uppercase block">
            POTRAIT
          </span>
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.3em] uppercase text-warm-800 -mt-1 block">
            Digital Studio & Self Photo
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-1.5 mt-2 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-xs">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
          <span className="text-[11px] font-bold text-emerald-800 tracking-tight">
            Buka Hari Ini (09.00 - 20.00 WIB)
          </span>
        </div>
      </div>

      {/* Social Media Links Bar (@potraiters) */}
      <div className="flex items-center justify-center gap-2 mt-2.5 flex-wrap">
        <a
          href="https://instagram.com/potraiters"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-warm-200 text-[11px] font-bold text-charcoal hover:bg-warm-100 transition-colors shadow-xs"
          aria-label="Instagram @potraiters"
        >
          <Instagram className="size-3 text-pink-600" aria-hidden="true" />
          <span>@potraiters</span>
        </a>

        <a
          href="https://tiktok.com/@potraiters"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-warm-200 text-[11px] font-bold text-charcoal hover:bg-warm-100 transition-colors shadow-xs"
          aria-label="TikTok @potraiters"
        >
          <TikTokIcon className="size-3 text-charcoal" />
          <span>TikTok</span>
        </a>

        <a
          href="https://youtube.com/@potraiters"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-warm-200 text-[11px] font-bold text-charcoal hover:bg-warm-100 transition-colors shadow-xs"
          aria-label="YouTube @potraiters"
        >
          <Youtube className="size-3 text-red-600" aria-hidden="true" />
          <span>YouTube</span>
        </a>

        <a
          href="https://x.com/potraiters"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-warm-200 text-[11px] font-bold text-charcoal hover:bg-warm-100 transition-colors shadow-xs"
          aria-label="X @potraiters"
        >
          <XIcon className="size-2.5 text-charcoal" />
          <span>X</span>
        </a>
      </div>

      {/* Campus Location Pills */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-charcoal font-medium">
        <span className="inline-flex items-center gap-1 bg-warm-100/80 px-2.5 py-0.5 rounded-full border border-warm-200">
          <MapPin className="size-3 text-warm-800 shrink-0" aria-hidden="true" />
          <span>Tembalang (UNDIP)</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-warm-100/80 px-2.5 py-0.5 rounded-full border border-warm-200">
          <MapPin className="size-3 text-warm-800 shrink-0" aria-hidden="true" />
          <span>Sekaran (UNNES)</span>
        </span>
      </div>
    </header>
  );
}
