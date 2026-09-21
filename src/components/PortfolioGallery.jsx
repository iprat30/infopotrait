import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/packagesData';
import { Sparkles, MapPin } from 'lucide-react';

const FILTER_TAGS = [
  { id: 'all', label: 'Semua Portofolio' },
  { id: 'wisuda-indoor', label: 'Wisuda Studio' },
  { id: 'wisuda-outdoor', label: 'Wisuda Outdoor' },
  { id: 'pasfoto', label: 'Pas Foto & ID' },
  { id: 'selfi', label: 'Self Photo' },
  { id: 'psn', label: 'Couple' },
  { id: 'group', label: 'Group' },
  { id: 'frame-cetak', label: 'Frame & Cetak' },
];

export default function PortfolioGallery() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section className="py-3 px-4 max-w-xl mx-auto w-full" aria-labelledby="portfolio-heading">
      
      {/* Section Title */}
      <div className="text-center mb-3">
        <span className="inline-flex items-center gap-1 bg-warm-100 text-charcoal px-3 py-1 rounded-full text-xs font-bold border border-warm-200">
          <Sparkles className="size-3.5 text-warm-800" aria-hidden="true" />
          <span>Hasil Jepretan Asli Studio</span>
        </span>
        <h2 id="portfolio-heading" className="text-lg md:text-xl font-extrabold text-charcoal tracking-tight mt-1.5">
          Galeri Dinamis Portofolio
        </h2>
        <p className="text-xs text-charcoal-700 mt-0.5">
          Inspirasi pose, pencahayaan, dan kualitas hasil cetak Potrait Studio Semarang
        </p>
      </div>

      {/* Dynamic Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-3 scroll-smooth">
        {FILTER_TAGS.map((tag) => {
          const isActive = activeFilter === tag.id;
          return (
            <button
              key={tag.id}
              onClick={() => setActiveFilter(tag.id)}
              className={`tap-bounce shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[36px] ${
                isActive
                  ? 'bg-charcoal text-white shadow-sm ring-1 ring-charcoal'
                  : 'bg-white text-charcoal-700 border border-warm-200 hover:bg-warm-50'
              }`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* Dynamic Photo Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-warm-100 border border-warm-200 shadow-soft aspect-[3/4] transition-all hover:shadow-elevated"
          >
            <img
              src={item.image}
              alt={item.title}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {/* Dark Gradient Overlay with Title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2.5 text-white">
              <span className="text-[10px] font-bold text-warm-300 flex items-center gap-1">
                <MapPin className="size-2.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.location}</span>
              </span>
              <h3 className="text-xs font-bold leading-tight mt-0.5 text-white">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-[11px] text-charcoal-700 italic">
          Ingin hasil foto seperti di atas? Hubungi admin via WhatsApp untuk reservasi sesi Anda.
        </p>
      </div>
    </section>
  );
}
