import React from 'react';
import { CATEGORIES } from '../data/packagesData';
import { Flame } from 'lucide-react';

export default function CategoryTabs({ selectedCategory, onSelectCategory }) {
  return (
    <div className="pt-2 pb-1.5 px-4 max-w-xl mx-auto">
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
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`tap-bounce inline-flex items-center gap-1 py-1.5 px-3 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                isActive
                  ? 'bg-charcoal text-white shadow-sm ring-2 ring-charcoal/20'
                  : 'bg-white text-charcoal border border-warm-200 hover:bg-warm-100 shadow-xs'
              }`}
              aria-pressed={isActive}
            >
              {cat.isHot && (
                <Flame className={`size-3 shrink-0 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} aria-hidden="true" />
              )}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
