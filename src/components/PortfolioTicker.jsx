import React, { useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/packagesData';

// Triple items so there's always room to drag left AND right
const TICKER_ITEMS = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

const SCROLL_SPEED = 0.7;   // px per animation frame
const RESUME_DELAY = 2200;  // ms idle before auto-scroll resumes
const DRAG_THRESHOLD = 6;   // px movement to count as drag (not tap)

export default function PortfolioTicker({ onSelectCategory }) {
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const pointerStartX = useRef(0);
  const scrollAtStart = useRef(0);

  /* ── Auto-scroll engine ─────────────────────────────────── */
  const autoScroll = () => {
    const el = trackRef.current;
    if (!el) return;

    el.scrollLeft += SCROLL_SPEED;

    // Seamless loop: when we reach 2/3, snap back to 1/3
    const oneThird = el.scrollWidth / 3;
    if (el.scrollLeft >= oneThird * 2) {
      el.scrollLeft -= oneThird;
    }

    rafRef.current = requestAnimationFrame(autoScroll);
  };

  const startAutoScroll = () => {
    cancelAutoScroll();
    rafRef.current = requestAnimationFrame(autoScroll);
  };

  const cancelAutoScroll = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const scheduleResume = () => {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(startAutoScroll, RESUME_DELAY);
  };

  // Initialise: start scroll from middle section so there's left-room
  useEffect(() => {
    const el = trackRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth / 3;
    }
    startAutoScroll();
    return () => {
      cancelAutoScroll();
      clearTimeout(resumeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Looping guard on manual scroll ────────────────────── */
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const oneThird = el.scrollWidth / 3;
    if (el.scrollLeft >= oneThird * 2) el.scrollLeft -= oneThird;
    if (el.scrollLeft < 0) el.scrollLeft += oneThird;
  };

  /* ── Pointer / Mouse drag (desktop) ────────────────────── */
  const handleMouseDown = (e) => {
    isDragging.current = true;
    didDrag.current = false;
    pointerStartX.current = e.clientX;
    scrollAtStart.current = trackRef.current.scrollLeft;
    cancelAutoScroll();
    clearTimeout(resumeTimerRef.current);
    trackRef.current.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - pointerStartX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) didDrag.current = true;
    trackRef.current.scrollLeft = scrollAtStart.current - dx;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
    scheduleResume();
  };

  /* ── Touch drag (mobile) ────────────────────────────────── */
  const handleTouchStart = (e) => {
    isDragging.current = true;
    didDrag.current = false;
    pointerStartX.current = e.touches[0].clientX;
    scrollAtStart.current = trackRef.current.scrollLeft;
    cancelAutoScroll();
    clearTimeout(resumeTimerRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - pointerStartX.current;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      didDrag.current = true;
      trackRef.current.scrollLeft = scrollAtStart.current - dx;
      e.preventDefault(); // prevent page scroll while swiping ticker
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    scheduleResume();
  };

  /* ── Tap / Click navigation ─────────────────────────────── */
  const handleCardClick = (catId) => {
    if (didDrag.current) return; // ignore if user was dragging
    didDrag.current = false;
    if (onSelectCategory) {
      onSelectCategory(catId);
      setTimeout(() => {
        const el = document.getElementById('category-tabs');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  return (
    <section className="w-full py-1 mb-1.5" aria-label="Galeri Portofolio Unggulan">
      {/* Header Row */}
      <div className="max-w-xl mx-auto px-4 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center size-5 rounded-full bg-amber-100 text-amber-800">
            <Sparkles className="size-3 fill-amber-500 text-amber-500" aria-hidden="true" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-charcoal">
            Hasil Foto Klien Terbaru
          </span>
        </div>
        {/* Gesture hint */}
        <span className="flex items-center gap-0.5 text-[10px] font-bold text-warm-700 bg-warm-100/90 px-2 py-0.5 rounded-full border border-warm-200/80 select-none">
          <ChevronLeft className="size-3" />
          <span>geser</span>
          <ChevronRight className="size-3" />
        </span>
      </div>

      {/* Scrollable track */}
      <div className="relative w-full">
        {/* Fade masks */}
        <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-warm-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-warm-50 to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex gap-3 py-1 px-2 overflow-x-scroll no-scrollbar cursor-grab select-none"
          style={{ scrollBehavior: 'auto', WebkitOverflowScrolling: 'touch' }}
          onScroll={handleScroll}
          /* Desktop drag */
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          /* Mobile swipe */
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {TICKER_ITEMS.map((item, index) => (
            <button
              type="button"
              key={`ticker-${item.id}-${index}`}
              draggable={false}
              onClick={() => handleCardClick(item.category)}
              className="group relative shrink-0 w-44 sm:w-52 h-60 rounded-2xl overflow-hidden bg-charcoal border border-warm-200 shadow-soft active:scale-95 transition-transform duration-150 text-left focus:outline-none focus:ring-2 focus:ring-warm-500"
              aria-label={`Lihat paket ${item.category} — ${item.title}`}
            >
              {/* Photo */}
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                loading="lazy"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Category pill */}
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-charcoal/80 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-tight">
                  {item.category.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Tap feedback overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity duration-100 bg-black/25 pointer-events-none">
                <span className="bg-white/95 text-charcoal text-[11px] font-black px-3 py-1.5 rounded-full shadow-lg">
                  Lihat Paket →
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white pointer-events-none">
                <h3 className="text-xs font-black line-clamp-1">{item.title}</h3>
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
