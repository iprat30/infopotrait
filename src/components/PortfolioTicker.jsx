import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/packagesData';

export default function PortfolioTicker({ onSelectCategory }) {
  const [isPaused, setIsPaused] = useState(false);
  // Track touch start position to distinguish tap vs swipe
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Duplicate for seamless infinite loop
  const tickerItems = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true); // Pause marquee immediately on touch
  };

  const handleTouchEnd = () => {
    // Small delay before resuming so scroll animation doesn't jump
    setTimeout(() => setIsPaused(false), 400);
  };

  const handleCardClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
      // Scroll gently to the category tabs area so user can see the packages
      setTimeout(() => {
        const el = document.getElementById('category-tabs');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  const handleCardTouchEnd = (e, catId) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    // Only navigate if it was a tap (small movement), not a swipe
    if (dx < 12 && dy < 12) {
      handleCardClick(catId);
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => setIsPaused(false), 400);
  };

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
          ☝️ Sentuh foto → lihat paket
        </span>
      </div>

      {/* Infinite Running Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 inset-y-0 w-6 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-6 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />

        {/* Marquee track — pause controlled by React state for both desktop & mobile */}
        <div
          className="animate-marquee flex gap-3 py-1"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {tickerItems.map((item, index) => (
            <button
              type="button"
              key={`${item.id}-${index}`}
              onClick={() => handleCardClick(item.category)}
              onTouchEnd={(e) => handleCardTouchEnd(e, item.category)}
              className="group relative shrink-0 w-44 sm:w-52 h-60 rounded-2xl overflow-hidden bg-charcoal border border-warm-200 shadow-soft active:scale-95 transition-all hover:shadow-elevated hover:border-warm-500 text-left focus:outline-none focus:ring-2 focus:ring-warm-500"
              aria-label={`Lihat paket ${item.category} — ${item.title}`}
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Category Pill */}
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-charcoal/80 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-tight">
                  {item.category.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Tap CTA Overlay — visible always on mobile */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity bg-black/20">
                <span className="bg-white/90 text-charcoal text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg">
                  Lihat Paket →
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                <h3 className="text-xs font-black line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] text-warm-200 mt-0.5">
                  <span className="truncate max-w-[110px]">{item.location}</span>
                  <span className="inline-flex items-center gap-0.5 font-bold text-amber-300">
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


