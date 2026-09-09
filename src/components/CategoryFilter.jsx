import React from 'react';
import { Search, X, Flame } from 'lucide-react';
import { CATEGORIES } from '../data/packagesData';

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults
}) {
  return (
    <div className="sticky top-0 z-30 bg-warm-50/95 backdrop-blur-md pt-3 pb-2 border-b border-warm-200 shadow-sm">
      <div className="max-w-xl mx-auto px-4">
        
        {/* Search Bar Input */}
        <div className="relative mb-2.5">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-4 text-charcoal-700" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari paket (misal: wisuda, selfi, couple, frame)..."
            className="w-full pl-9 pr-8 py-2.5 bg-white border border-warm-200 rounded-xl text-xs md:text-sm text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:border-charcoal transition-all shadow-soft"
            aria-label="Cari paket foto"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-charcoal"
              aria-label="Hapus pencarian"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Horizontal Category Scroll Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`tap-bounce shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all min-h-[38px] ${
                  isActive
                    ? 'bg-charcoal text-white shadow-sm ring-1 ring-charcoal'
                    : 'bg-white text-charcoal-700 hover:bg-warm-100 border border-warm-200'
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

        {/* Filter / Search Count indicator */}
        <div className="flex items-center justify-between text-[11px] text-charcoal-700 mt-1.5 px-0.5 font-medium">
          <span>
            {searchQuery ? `Hasil untuk "${searchQuery}":` : 'Katalog Pilihan:'} {totalResults} Paket
          </span>
          {searchQuery && (
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
              }}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
