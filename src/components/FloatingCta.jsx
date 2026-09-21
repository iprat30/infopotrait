import React, { useState, useEffect } from 'react';
import { MessageCircle, Sparkles, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

export default function FloatingCta() {
  const [activeHintIndex, setActiveHintIndex] = useState(0);

  const hints = [
    '⚡ Admin Siap Bantu Booking Jadwal',
    '✨ Promo Wisuda 299k Slot Terbatas',
    '💬 Tanya Paket & Cek Ketersediaan Jam',
    '🔥 Respon Cepat < 3 Menit'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHintIndex((prev) => (prev + 1) % hints.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hints.length]);

  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(
    'Halo Admin Potrait Studio, saya ingin konsultasi dan booking jadwal sesi foto...'
  )}`;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-safe bg-gradient-to-t from-white via-white/95 to-white/80 backdrop-blur-md border-t border-warm-200/80 shadow-floating"
      aria-label="Aksi Cepat WhatsApp"
    >
      <div className="max-w-xl mx-auto flex flex-col gap-1.5">
        
        {/* Top Floating Dynamic Micro-Bar: Rotating Hint & Live Status */}
        <div className="flex items-center justify-between px-1 text-[10.5px]">
          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
            </span>
            <span className="transition-all duration-300 ease-in-out">
              {hints[activeHintIndex]}
            </span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-charcoal-700 font-medium">
            <CheckCircle2 className="size-3 text-emerald-600" />
            <span>Official Admin</span>
          </span>
        </div>

        {/* Dynamic Interactive CTA Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-500 via-wa to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold py-3 px-4 sm:px-5 rounded-2xl shadow-lg animate-cta-pulse tap-bounce transition-all"
          aria-label="Konsultasi & Booking Cepat via WhatsApp"
        >
          {/* Shimmer light bar sweeping across button */}
          <div 
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer pointer-events-none"
            aria-hidden="true"
          />

          {/* Left Icon with breathing circle badge */}
          <div className="relative flex items-center justify-center size-9 sm:size-10 rounded-xl bg-white/20 backdrop-blur-xs text-white shrink-0 group-hover:scale-110 transition-transform">
            <MessageCircle className="size-5 sm:size-5.5 fill-white/20 text-white" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-amber-400 border-2 border-emerald-600" />
          </div>

          {/* Center Call to Action Typography */}
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs sm:text-sm font-black tracking-tight uppercase">
                Konsultasi & Booking Cepat
              </span>
              <Zap className="size-3.5 fill-amber-300 text-amber-300 animate-bounce shrink-0" aria-hidden="true" />
            </div>
            <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium truncate mt-0.5">
              Hubungi via WhatsApp • Bebas tanya paket & jadwal
            </p>
          </div>

          {/* Right Action Badge / Arrow with pulse trigger */}
          <div className="flex items-center gap-1 bg-white/20 group-hover:bg-white/30 px-2.5 py-1.5 rounded-xl text-white text-[11px] font-black shrink-0 transition-all group-hover:translate-x-0.5">
            <span className="hidden xs:inline">Chat</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </div>
        </a>
      </div>
    </aside>
  );
}
