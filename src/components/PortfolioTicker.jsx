import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/packagesData';

export default function PortfolioTicker({ onSelectCategory }) {
  // Duplicate array for seamless infinite marquee loop
  const tickerItems = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section className="w-full overflow-hidden py-1 mb-1.5" aria-label="Galeri Portofolio Unggulan">
      {/* Mini Title & Hook */}
      <div className="max-w-xl mx-auto px-4 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center size-5 rounded-full bg-amber-100 text-amber-800">
            <Sparkles className="size-3 fill-amber-500 text-amber-500" aria-hidden="true" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-charcoal">
            Hasil Foto Klien Terbaru
          </span>
        </div>
        <span className="text-[10px] font-bold text-warm-800 bg-warm-100/90 px-2 py-0.5 rounded-full border border-warm-200/80">
          Sentuh foto untuk lihat paket
        </span>
      </div>

      {/* Infinite Running Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur masks for aesthetic finish */}
        <div className="absolute left-0 inset-y-0 w-6 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-6 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-3 py-1 cursor-grab active:cursor-grabbing">
          {tickerItems.map((item, index) => (
            <button
              type="button"
              key={`${item.id}-${index}`}
              onClick={() => onSelectCategory && onSelectCategory(item.category)}
              className="group relative shrink-0 w-44 sm:w-52 h-60 rounded-2xl overflow-hidden bg-charcoal border border-warm-200 shadow-soft tap-bounce transition-all hover:shadow-elevated hover:border-warm-500 text-left focus:outline-none focus:ring-2 focus:ring-warm-500"
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Category Pill Tag */}
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-charcoal/80 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-xs uppercase tracking-tight">
                  {item.category.replace('-', ' ')}
                </span>
              </div>

              {/* Bottom Caption & Hook */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="text-xs font-black line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-warm-200 mt-0.5">
                  <span className="truncate max-w-[110px]">{item.location}</span>
                  <span className="inline-flex items-center gap-0.5 font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform">
                    <span>Lihat</span>
                    <ArrowRight className="size-2.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
