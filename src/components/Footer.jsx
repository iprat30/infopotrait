import React from 'react';
import { Instagram, Youtube, Heart } from 'lucide-react';
import { MAIN_WHATSAPP, BRANCHES_DATA } from '../data/branchesData';

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

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warm-100 pt-8 pb-28 px-4 border-t border-charcoal-800">
      <div className="max-w-xl mx-auto text-center space-y-3.5">
        
        {/* Brand Name Typography */}
        <div>
          <span className="font-black text-xl tracking-[0.2em] text-white uppercase block">
            POTRAIT
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-warm-300">
            Digital Foto Studio & Self Photo
          </span>
          <p className="text-xs text-warm-200 mt-1 max-w-sm mx-auto">
            Studio foto modern di Semarang: BQ Square Tembalang, Prof. Soedarto & Sekaran Gunungpati.
          </p>
        </div>

        {/* Social Media Links (@potraiters) */}
        <div className="pt-1">
          <p className="text-[11px] font-bold text-warm-300 uppercase tracking-wider mb-2">
            Ikuti Sosial Media Kami:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href="https://instagram.com/potraiters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Instagram className="size-3 text-pink-400" aria-hidden="true" />
              <span>Instagram: @potraiters</span>
            </a>

            <a
              href="https://tiktok.com/@potraiters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <TikTokIcon className="size-3 text-white" />
              <span>TikTok: @potraiters</span>
            </a>

            <a
              href="https://youtube.com/@potraiters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <Youtube className="size-3 text-red-400" aria-hidden="true" />
              <span>YouTube: @potraiters</span>
            </a>

            <a
              href="https://x.com/potraiters"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              <XIcon className="size-2.5 text-white" />
              <span>X: @potraiters</span>
            </a>
          </div>
        </div>

        {/* Direct WhatsApp Info */}
        <div className="pt-2 text-xs text-warm-200">
          <a
            href={`https://wa.me/${MAIN_WHATSAPP.number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-semibold text-emerald-400"
          >
            WhatsApp Admin Pusat: {MAIN_WHATSAPP.displayNumber}
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-3 border-t border-white/10 text-[11px] text-warm-400">
          <p>© {new Date().getFullYear()} potrait.net. All rights reserved.</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-warm-400">
            <span>Dibuat dengan</span>
            <Heart className="size-3 text-red-400 fill-red-400" aria-hidden="true" />
            <span>untuk memori terbaik Anda di Semarang</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
