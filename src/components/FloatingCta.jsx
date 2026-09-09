import React from 'react';
import { MessageCircle, Zap } from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

export default function FloatingCta() {
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent('Halo Admin Potrait Studio, saya ingin booking/tanya info sesi foto...')}`;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-warm-200 px-4 py-3 pb-safe shadow-floating"
      aria-label="Aksi Cepat WhatsApp"
    >
      <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Status Info */}
        <div className="hidden xs:flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
            <span className="text-[11px] font-bold text-charcoal">Respon Cepat</span>
          </div>
          <span className="text-[10px] text-charcoal-700">Admin Pusat Potrait</span>
        </div>

        {/* Action Button Full-Width / Right-Aligned */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce flex-1 xs:flex-initial flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold py-3 px-5 rounded-2xl shadow-md transition-colors min-h-[48px] text-xs md:text-sm"
          aria-label="Konsultasi & Booking Cepat via WhatsApp"
        >
          <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
          <span className="tracking-tight">Konsultasi & Booking Cepat</span>
        </a>
      </div>
    </aside>
  );
}
