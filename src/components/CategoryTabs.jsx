import React from 'react';
import { CATEGORIES } from '../data/packagesData';
import { Flame } from 'lucide-react';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div id="category-tabs" className="pt-2 pb-1.5 px-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-charcoal">
          Pilih Kategori Layanan:
        </span>
        <span className="text-[10px] text-charcoal-700 font-semibold">
          Semua kategori terlihat
        </span>
      </div>

      {/* Simple, compact pill buttons - NO photos, all 7 visible at once */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const isPromo = cat.id === 'promo';

          let btnClass = '';
          if (isPromo) {
            btnClass = isActive
              ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md ring-2 ring-orange-400/40 font-black'
              : 'bg-gradient-to-r from-amber-50 to-orange-50 text-orange-800 border border-orange-300 hover:from-amber-100 hover:to-orange-100 font-black shadow-xs';
          } else {
            btnClass = isActive
              ? 'bg-charcoal text-white shadow-sm ring-2 ring-charcoal/20 font-bold'
              : 'bg-white text-charcoal border border-warm-200 hover:bg-warm-100 shadow-xs font-bold';
          }

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`tap-bounce inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-xs transition-all min-h-[36px] ${btnClass}`}
              aria-pressed={isActive}
            >
              {isPromo ? (
                <Flame className={`size-3.5 shrink-0 ${isActive ? 'text-amber-200 fill-amber-200 animate-bounce' : 'text-orange-500 fill-orange-500 animate-pulse'}`} aria-hidden="true" />
              ) : cat.isHot ? (
                <Flame className={`size-3 shrink-0 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} aria-hidden="true" />
              ) : null}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
