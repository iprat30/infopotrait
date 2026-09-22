import React, { useState, useEffect } from 'react';
import {
  Clock, Users, ChevronDown, Check, MessageCircle, Calendar, Shirt,
  Flame, Star, Crown, FileText, Send, Printer, Link2, CheckCheck
} from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';
import PasFotoPrintNavigator from './PasFotoPrintNavigator';
import { getCetakShareUrl } from '../utils/urlHelpers';

export default function PackageCard({
  item,
  onOpenBookingModal,
  isCetakAutoOpen = false,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isCetakOpen, setIsCetakOpen] = useState(Boolean(isCetakAutoOpen && item.isPrintOnly));
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync if auto-open triggered via subdomain / query param
  useEffect(() => {
    if (isCetakAutoOpen && item.isPrintOnly) {
      setIsCetakOpen(true);
    }
  }, [isCetakAutoOpen, item.isPrintOnly]);

  const handleCopyShareLink = (e) => {
    e.stopPropagation();
    const url = getCetakShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const prefilledText = item.isPrintOnly
    ? `Halo Admin Potrait Studio, saya ingin cetak pas foto dari file yang sudah saya miliki. Mohon info prosedur kirim file via WA ya min...`
    : `Halo Admin Potrait Studio, saya ingin pesan paket "${item.name}" (${item.price}${item.priceSuffix || ''}). Mohon info jadwal yang tersedia...`;
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(prefilledText)}`;

  // Render badge with matching badgeType styling
  const renderBadge = () => {
    if (!item.badge) return null;

    if (item.badgeType === 'bestseller') {
      return (
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
          <Flame className="size-3 fill-white" aria-hidden="true" />
          <span>{item.badge}</span>
        </span>
      );
    }

    if (item.badgeType === 'recommended') {
      return (
        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
          <Star className="size-3 fill-white" aria-hidden="true" />
          <span>{item.badge}</span>
        </span>
      );
    }

    if (item.badgeType === 'luxury') {
      return (
        <span className="inline-flex items-center gap-1 bg-charcoal text-amber-300 border border-amber-300/40 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
          <Crown className="size-3 text-amber-300" aria-hidden="true" />
          <span>{item.badge}</span>
        </span>
      );
    }

    return (
      <span className="bg-warm-100 text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full border border-warm-200">
        {item.badge}
      </span>
    );
  };

  return (
    <article
      id={item.isPrintOnly ? 'card-cetak-pasfoto' : `card-${item.id}`}
      className={`bg-white rounded-2xl p-4 border transition-all shadow-soft ${
        item.isPopular || (item.isPrintOnly && isCetakOpen)
          ? 'border-warm-500/80 ring-2 ring-warm-500/25 shadow-elevated'
          : 'border-warm-200 hover:border-warm-300'
      }`}
    >
      {/* Top Row: Name, Badge, Price */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm md:text-base font-extrabold text-charcoal tracking-tight flex items-center gap-1.5">
              {item.isPrintOnly && <Printer className="size-4 text-amber-700 shrink-0" />}
              <span>{item.name}</span>
            </h3>
            {renderBadge()}
          </div>

          {/* Quick Specs Chips */}
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-charcoal-700 flex-wrap">
            {item.capacity && (
              <span className="inline-flex items-center gap-1 bg-warm-50 px-2 py-0.5 rounded-md border border-warm-100">
                <Users className="size-3 text-warm-800" aria-hidden="true" />
                <span>{item.capacity}</span>
              </span>
            )}
            {item.duration && (
              <span className="inline-flex items-center gap-1 bg-warm-50 px-2 py-0.5 rounded-md border border-warm-100">
                <Clock className="size-3 text-warm-800" aria-hidden="true" />
                <span>{item.duration}</span>
              </span>
            )}
            {item.outfits && (
              <span className="inline-flex items-center gap-1 bg-warm-50 px-2 py-0.5 rounded-md border border-warm-100">
                <Shirt className="size-3 text-warm-800" aria-hidden="true" />
                <span>{item.outfits}</span>
              </span>
            )}
          </div>
        </div>

        {/* Price Tag */}
        <div className="text-right shrink-0">
          <div className="flex items-baseline justify-end gap-1">
            <span className="text-base md:text-lg font-black text-charcoal">
              {item.price}
            </span>
            {item.priceSuffix && (
              <span className="text-[11px] font-semibold text-charcoal-700">
                {item.priceSuffix}
              </span>
            )}
          </div>
          {item.normalPrice && (
            <span className="text-[11px] text-charcoal-700 line-through block">
              {item.normalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Expandable Facility & Deliverables List */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-warm-100 text-xs text-charcoal space-y-2.5 animate-fadeIn">
          {item.facilities && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                Fasilitas Sesi:
              </p>
              <ul className="space-y-1">
                {item.facilities.map((fac, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.deliverables && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-charcoal-700 mb-1">
                Yang Didapatkan (Deliverables):
              </p>
              <ul className="space-y-1">
                {item.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <Check className="size-3.5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-medium">{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {item.note && (
            <p className="text-[11px] text-charcoal-700 italic bg-warm-50 p-2 rounded-lg border border-warm-100">
              💡 {item.note}
            </p>
          )}
        </div>
      )}

      {/* Card Action Row */}
      <div className="mt-3 pt-2.5 border-t border-warm-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-[11px] font-semibold text-charcoal-700 hover:text-charcoal flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-warm-50 transition-colors"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Tutup Rincian' : 'Lihat Fasilitas'}</span>
            <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {/* Salin Link Cetak untuk Admin */}
          {item.isPrintOnly && (
            <button
              type="button"
              onClick={handleCopyShareLink}
              title="Salin link langsung untuk dikirim ke klien di WhatsApp"
              className={`tap-bounce inline-flex items-center gap-1 text-[10.5px] font-bold py-1 px-2 rounded-lg border transition-all ${
                copiedLink
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-warm-50 hover:bg-warm-100 text-charcoal-600 border-warm-200'
              }`}
            >
              {copiedLink ? (
                <>
                  <CheckCheck className="size-3 text-emerald-600" />
                  <span>Link Tersalin!</span>
                </>
              ) : (
                <>
                  <Link2 className="size-3 text-warm-800" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          {/* Action Button for Cetak Pas Foto: Buka / Tutup Kalkulator */}
          {item.isPrintOnly ? (
            <>
              <button
                type="button"
                onClick={() => setIsCetakOpen(!isCetakOpen)}
                className={`tap-bounce inline-flex items-center justify-center gap-1.5 text-xs font-black py-2 px-3.5 rounded-xl transition-all min-h-[40px] shadow-sm ${
                  isCetakOpen
                    ? 'bg-charcoal text-white ring-2 ring-charcoal/20'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-charcoal'
                }`}
                aria-expanded={isCetakOpen}
              >
                <Printer className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{isCetakOpen ? '▲ Tutup Kalkulator' : '⚡ Hitung Lembar & Atur'}</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-bounce inline-flex items-center justify-center gap-1 bg-wa hover:bg-wa-hover text-white text-xs font-bold py-2 px-3 rounded-xl shadow-sm transition-colors min-h-[40px]"
                aria-label="Tanya cetak pas foto via WhatsApp"
              >
                <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>Tanya WA</span>
              </a>
            </>
          ) : (
            /* Standar Non-Print Packages */
            <>
              {onOpenBookingModal && (
                <button
                  type="button"
                  onClick={() => onOpenBookingModal(item)}
                  className="tap-bounce inline-flex items-center justify-center gap-1 bg-warm-100 hover:bg-warm-200 text-charcoal text-xs font-bold py-2 px-3 rounded-xl border border-warm-200 transition-colors min-h-[40px]"
                  aria-label={`Pilih format dan cabang untuk ${item.name}`}
                >
                  <Calendar className="size-3 text-warm-800" aria-hidden="true" />
                  <span>Pilih Jam</span>
                </button>
              )}

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-bounce inline-flex items-center justify-center gap-1.5 bg-wa hover:bg-wa-hover text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-sm transition-colors min-h-[40px]"
                aria-label={`Pesan ${item.name} via WhatsApp`}
              >
                <MessageCircle className="size-3.5 shrink-0" aria-hidden="true" />
                <span>Pesan WA</span>
              </a>
            </>
          )}
        </div>
      </div>

      {/* Embedded Full Interactive Navigator & Calculator (Only when user opens it) */}
      {item.isPrintOnly && isCetakOpen && (
        <div className="mt-3">
          <PasFotoPrintNavigator
            isEmbedded={true}
            onClose={() => setIsCetakOpen(false)}
            onOpenBookingModal={onOpenBookingModal}
          />
        </div>
      )}
    </article>
  );
}
