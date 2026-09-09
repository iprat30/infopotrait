import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { PROMO_SPECIAL } from '../data/packagesData';
import { MAIN_WHATSAPP } from '../data/branchesData';

export default function PromoBanner() {
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(PROMO_SPECIAL.whatsappMessage)}`;

  return (
    <section className="px-4 py-2 max-w-xl mx-auto" aria-labelledby="promo-heading">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal-800 text-white p-5 md:p-6 shadow-elevated border border-warm-300/20">
        
        {/* Glow Accent Effect */}
        <div className="absolute -top-12 -right-12 size-36 bg-warm-300/20 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>
        
        {/* Header Ribbon & Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-amber-400/30">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {PROMO_SPECIAL.badge}
          </span>
          <span className="text-[11px] text-warm-200/90 font-medium">Slot Terbatas Wisuda</span>
        </div>

        {/* Title & Tagline */}
        <h2 id="promo-heading" className="text-lg md:text-xl font-extrabold text-white tracking-tight">
          {PROMO_SPECIAL.title}
        </h2>
        <p className="text-xs text-warm-100/80 mt-0.5 leading-relaxed">
          {PROMO_SPECIAL.tagline}
        </p>

        {/* Price Tag Box */}
        <div className="mt-3.5 flex items-baseline gap-2.5 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
          <div>
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {PROMO_SPECIAL.price}
            </span>
            <span className="text-xs text-warm-200 line-through ml-2">
              {PROMO_SPECIAL.originalPrice}
            </span>
          </div>
          <span className="ml-auto text-[11px] font-semibold bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40">
            Hemat 33%
          </span>
        </div>

        {/* Highlight Bullets */}
        <ul className="mt-3.5 space-y-1.5 text-xs text-warm-100">
          {PROMO_SPECIAL.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="size-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="leading-tight">{item}</span>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="mt-4 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-bounce w-full flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-colors min-h-[48px] text-sm"
            aria-label="Klaim Promo Wisuda Hemat via WhatsApp"
          >
            <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
            <span>Klaim Promo via WhatsApp</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
