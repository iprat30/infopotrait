import React, { useState } from 'react';
import { PACKAGES_DATA } from '../data/packagesData';
import { MAIN_WHATSAPP } from '../data/branchesData';
import { MessageCircle, Frame, Printer, Info, Check } from 'lucide-react';

export default function FrameAndPrintSection() {
  const [subTab, setSubTab] = useState('frame'); // 'frame' | 'cetak'
  const data = PACKAGES_DATA['frame-cetak'];

  const orderWa = (itemDesc) => {
    const text = `Halo Admin Potrait Studio, saya ingin order cetak/frame: ${itemDesc}. Mohon info proses dan pengiriman file...`;
    return `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-4">
      {/* Visual Showcase Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-warm-200 bg-warm-100 shadow-soft">
        <img
          src="/lulu-novi-al-8766-10rss-1-1328x1992-800x1200.jpg"
          alt="Contoh Pigura & Hasil Cetak Lab Potrait Studio"
          className="w-full h-36 md:h-44 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3.5 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-warm-300">
            Kualitas Cetak Lab Foto
          </span>
          <p className="text-xs md:text-sm font-bold">
            Kertas Doff Silky, Anti-Pudar, dengan Pilihan Pigura Kayu Minimalis & Blok Modern
          </p>
        </div>
      </div>

      {/* Sub-Switch: Frame vs Cetak Saja */}
      <div className="flex p-1 bg-warm-100 rounded-xl border border-warm-200">
        <button
          onClick={() => setSubTab('frame')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
            subTab === 'frame'
              ? 'bg-white text-charcoal shadow-sm'
              : 'text-charcoal-700 hover:text-charcoal'
          }`}
        >
          <Frame className="size-3.5" aria-hidden="true" />
          <span>Frame + Cetak</span>
        </button>

        <button
          onClick={() => setSubTab('cetak')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
            subTab === 'cetak'
              ? 'bg-white text-charcoal shadow-sm'
              : 'text-charcoal-700 hover:text-charcoal'
          }`}
        >
          <Printer className="size-3.5" aria-hidden="true" />
          <span>Cetak Foto Saja</span>
        </button>
      </div>

      {/* 1. FRAME + CETAK VIEW */}
      {subTab === 'frame' && (
        <div className="space-y-3">
          {data.frameCategories.map((frame, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-warm-200 shadow-soft"
            >
              <h4 className="text-sm font-bold text-charcoal mb-2.5 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-warm-800"></span>
                <span>{frame.type}</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {frame.sizes.map((s, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-warm-50 rounded-xl border border-warm-200 flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-semibold text-charcoal-700">{s.size}</span>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-extrabold text-charcoal">{s.price}</span>
                      <a
                        href={orderWa(`${frame.type} - ${s.size} (${s.price})`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold text-wa hover:underline"
                        aria-label={`Pesan ${frame.type} ${s.size}`}
                      >
                        Pesan WA →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. CETAK SAJA VIEW */}
      {subTab === 'cetak' && (
        <div className="bg-white rounded-2xl p-4 border border-warm-200 shadow-soft">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-warm-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              Ukuran Foto
            </h4>
            <div className="flex gap-4 text-xs font-bold text-charcoal">
              <span className="w-20 text-right">Doff Paper</span>
              <span className="w-20 text-right">Doff+Laminasi</span>
            </div>
          </div>

          <div className="divide-y divide-warm-100 max-h-[360px] overflow-y-auto pr-1">
            {data.printOnlyList.map((item, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-charcoal">{item.size}</span>
                </div>
                <div className="flex gap-4 text-right">
                  <span className="w-20 font-bold text-charcoal">{item.doff}</span>
                  <span className="w-20 font-bold text-emerald-700">{item.laminated}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-charcoal-700 italic mt-3 pt-2 border-t border-warm-100 flex items-center gap-1">
            <Info className="size-3 text-warm-800 shrink-0" aria-hidden="true" />
            <span>{data.printNote}</span>
          </p>

          <a
            href={orderWa('Cetak Foto Berbagai Ukuran')}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-bounce mt-3 w-full flex items-center justify-center gap-1.5 bg-wa hover:bg-wa-hover text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition-colors min-h-[42px]"
          >
            <MessageCircle className="size-3.5" aria-hidden="true" />
            <span>Kirim File Foto via WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
}
