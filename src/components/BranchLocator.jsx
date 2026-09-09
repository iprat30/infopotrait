import React from 'react';
import { MapPin, Clock, MessageCircle, ExternalLink, Sparkles, Compass } from 'lucide-react';
import { BRANCHES_DATA } from '../data/branchesData';

export default function BranchLocator() {
  return (
    <section id="cabang-studio" className="py-8 px-4 max-w-xl mx-auto" aria-labelledby="branches-heading">
      
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1 bg-warm-100 text-charcoal px-3 py-1 rounded-full text-xs font-bold border border-warm-200">
          <Compass className="size-3.5 text-warm-800" aria-hidden="true" />
          <span>Lokasi Strategis di Semarang</span>
        </span>
        <h2 id="branches-heading" className="text-xl md:text-2xl font-extrabold text-charcoal tracking-tight mt-2">
          3 Cabang Potrait Studio
        </h2>
        <p className="text-xs md:text-sm text-charcoal-700 mt-1">
          Pilih studio terdekat dari kampus UNDIP Tembalang atau UNNES Sekaran
        </p>
      </div>

      {/* Branches List */}
      <div className="space-y-4">
        {BRANCHES_DATA.map((branch) => {
          const waBranchUrl = `https://wa.me/${branch.whatsappNumber}?text=${encodeURIComponent(`Halo ${branch.name}, saya ingin tanya jadwal sesi foto di cabang ini...`)}`;

          return (
            <div
              key={branch.id}
              className="bg-white rounded-2xl md:rounded-3xl p-5 border border-warm-200 shadow-soft transition-all hover:border-warm-300"
            >
              {/* Branch Title & Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block bg-warm-100 text-warm-800 text-[11px] font-bold px-2.5 py-0.5 rounded-md mb-1.5">
                    {branch.badge}
                  </span>
                  <h3 className="text-base font-bold text-charcoal">
                    {branch.name}
                  </h3>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 mt-3 text-xs text-charcoal-700">
                <MapPin className="size-4 text-warm-800 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">{branch.address}</p>
              </div>

              {/* Operational Hours */}
              <div className="flex items-start gap-2.5 mt-2 text-xs text-charcoal">
                <Clock className="size-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="font-semibold">{branch.hours}</p>
              </div>

              {/* Studio Features Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-warm-100">
                {branch.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-warm-50 text-charcoal-700 px-2 py-0.5 rounded border border-warm-200"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Maps & Direct WhatsApp */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-2">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-bounce flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-warm-300 text-charcoal hover:bg-warm-100 text-xs font-semibold rounded-xl transition-colors min-h-[44px]"
                  aria-label={`Buka Google Maps lokasi ${branch.name}`}
                >
                  <ExternalLink className="size-3.5 text-charcoal-700" aria-hidden="true" />
                  <span>Google Maps</span>
                </a>

                <a
                  href={waBranchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tap-bounce flex items-center justify-center gap-1.5 py-2.5 px-3 bg-wa hover:bg-wa-hover text-white text-xs font-semibold rounded-xl shadow-sm transition-colors min-h-[44px]"
                  aria-label={`Hubungi WhatsApp ${branch.name}`}
                >
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                  <span>WA Cabang</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
