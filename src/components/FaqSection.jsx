import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/packagesData';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="py-6 px-4 max-w-xl mx-auto" aria-labelledby="faq-heading">
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1 bg-warm-100 text-charcoal px-3 py-1 rounded-full text-xs font-bold border border-warm-200">
          <HelpCircle className="size-3.5 text-warm-800" aria-hidden="true" />
          <span>Informasi Praktis</span>
        </span>
        <h2 id="faq-heading" className="text-xl font-extrabold text-charcoal tracking-tight mt-2">
          Pertanyaan Umum (FAQ)
        </h2>
        <p className="text-xs text-charcoal-700 mt-0.5">
          Hal yang sering ditanyakan sebelum sesi foto di Potrait Studio
        </p>
      </div>

      <div className="space-y-2.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-soft transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold text-xs md:text-sm text-charcoal min-h-[48px] hover:bg-warm-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`size-4 text-charcoal-700 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-charcoal' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs text-charcoal-700 leading-relaxed border-t border-warm-100 bg-warm-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
