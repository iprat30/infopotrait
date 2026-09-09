import React from 'react';
import { Check, Clock, Users, Gift, MessageCircle, Star, Sparkles } from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

export default function PricingCard({ pkg, onOpenCustomBooking }) {
  const prefilledText = `Halo Admin Potrait Studio, saya ingin booking paket "${pkg.name}" (${pkg.price}). Mohon info ketersediaan slot tanggal & jam...`;
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(prefilledText)}`;

  return (
    <article
      className={`relative bg-white rounded-2xl md:rounded-3xl p-5 border transition-all shadow-soft flex flex-col justify-between ${
        pkg.isPopular
          ? 'border-warm-500/50 ring-2 ring-warm-500/20 shadow-elevated'
          : 'border-warm-200 hover:border-warm-300'
      }`}
      aria-labelledby={`pkg-title-${pkg.id}`}
    >
      {/* Popular / Best Value Badge */}
      {pkg.isPopular && (
        <div className="absolute -top-3 right-4 bg-charcoal text-amber-300 text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-amber-300/30">
          <Sparkles className="size-3 text-amber-300" aria-hidden="true" />
          <span>Paling Favorit</span>
        </div>
      )}

      {/* Header Info */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              id={`pkg-title-${pkg.id}`}
              className="text-base md:text-lg font-bold text-charcoal tracking-tight"
            >
              {pkg.name}
            </h3>
            <p className="text-xs text-charcoal-700 mt-1 leading-relaxed">
              {pkg.tagline}
            </p>
          </div>
        </div>

        {/* Price Box */}
        <div className="mt-3.5 pt-3 border-t border-warm-100 flex items-baseline gap-2">
          <span className="text-2xl md:text-3xl font-extrabold text-charcoal tracking-tight">
            {pkg.price}
          </span>
          {pkg.originalPrice && (
            <span className="text-xs text-charcoal-700 line-through">
              {pkg.originalPrice}
            </span>
          )}
        </div>

        {/* Duration & People Quick Specs */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <div className="inline-flex items-center gap-1 bg-warm-50 text-charcoal px-2.5 py-1 rounded-lg text-xs font-medium border border-warm-200">
            <Clock className="size-3.5 text-charcoal-700" aria-hidden="true" />
            <span>{pkg.duration}</span>
          </div>
          <div className="inline-flex items-center gap-1 bg-warm-50 text-charcoal px-2.5 py-1 rounded-lg text-xs font-medium border border-warm-200">
            <Users className="size-3.5 text-charcoal-700" aria-hidden="true" />
            <span>{pkg.people}</span>
          </div>
        </div>

        {/* Facilities List */}
        <div className="mt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal-700 mb-2">
            Fasilitas & Hasil:
          </p>
          <ul className="space-y-2 text-xs text-charcoal leading-relaxed">
            {pkg.facilities.map((fac, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="size-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                  <Check className="size-3 stroke-[2.5]" aria-hidden="true" />
                </span>
                <span>{fac}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus / Extra Privileges */}
        {pkg.bonus && pkg.bonus.length > 0 && (
          <div className="mt-3.5 p-2.5 bg-warm-50 rounded-xl border border-warm-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-warm-800 text-[11px]">
              <Gift className="size-3.5 text-warm-800 shrink-0" aria-hidden="true" />
              <span>Bonus Eksklusif:</span>
            </div>
            <ul className="mt-1 space-y-1 text-charcoal-700 text-[11px]">
              {pkg.bonus.map((b, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-warm-800 font-bold">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendation Note */}
        {pkg.recommendationNote && (
          <p className="text-[11px] text-charcoal-700 italic mt-3 bg-white px-2 py-1 rounded-md border border-warm-100">
            💡 {pkg.recommendationNote}
          </p>
        )}
      </div>

      {/* CTA WhatsApp Button */}
      <div className="mt-5 pt-3 border-t border-warm-100 flex flex-col gap-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-bounce w-full flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors min-h-[48px] text-xs md:text-sm"
          aria-label={`Booking paket ${pkg.name} via WhatsApp`}
        >
          <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>Pesan Paket Ini via WA</span>
        </a>

        {onOpenCustomBooking && (
          <button
            type="button"
            onClick={() => onOpenCustomBooking(pkg)}
            className="w-full text-center text-[11px] font-semibold text-charcoal-700 hover:text-charcoal py-1 transition-colors"
          >
            Pilih Cabang & Jadwal Khusus
          </button>
        )}
      </div>
    </article>
  );
}
