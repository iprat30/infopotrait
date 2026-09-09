import React from 'react';
import { Tag, Images, MapPin, HelpCircle } from 'lucide-react';

export default function NavigationSwitcher({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'packages', label: 'Pricelist', icon: Tag },
    { id: 'portfolio', label: 'Portofolio', icon: Images },
    { id: 'branches', label: '3 Cabang', icon: MapPin },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav className="max-w-xl mx-auto px-4 pt-2 pb-1" aria-label="Navigasi Utama">
      <div className="grid grid-cols-4 p-1 bg-warm-100/90 rounded-2xl border border-warm-200 shadow-soft">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`tap-bounce flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 sm:py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all min-h-[42px] ${
                isActive
                  ? 'bg-white text-charcoal shadow-sm ring-1 ring-black/5'
                  : 'text-charcoal-700 hover:text-charcoal hover:bg-white/50'
              }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon className={`size-3.5 shrink-0 ${isActive ? 'text-charcoal' : 'text-charcoal-700'}`} aria-hidden="true" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
