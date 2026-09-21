import React, { useState, useEffect } from 'react';
import {
  X, Sparkles, Flame, Check, Clock, AlertCircle, MessageCircle,
  MapPin, Calendar, Heart, ShieldCheck, ArrowRight, Share2
} from 'lucide-react';
import { PROMO_SPECIAL } from '../data/packagesData';
import { BRANCHES_DATA, MAIN_WHATSAPP } from '../data/branchesData';

export default function PromoDetailModal({ isOpen, onClose, onBookWithSchedule }) {
  // Live ticking countdown
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 28, seconds: 45 });
  const [selectedBranch, setSelectedBranch] = useState('bq-square');

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 2, hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const fmt = (n) => (n < 10 ? `0${n}` : `${n}`);
  const activeBranchData = BRANCHES_DATA.find((b) => b.id === selectedBranch) || BRANCHES_DATA[0];

  const waText = [
    `*KLAIM PROMO SPECIAL WISUDA HEMAT Rp299.000*`,
    `Halo Admin Potrait Studio, saya ingin klaim penawaran Diskon Rp76.000 (Promo Wisuda Hemat Rp299k).`,
    `Pilihan Cabang: ${activeBranchData.name}`,
    ``,
    `Mohon info ketersediaan slot tanggal & jam yang masih kosong ya min. Terima kasih!`
  ].join('\n');

  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(waText)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-auto overflow-hidden rounded-3xl bg-white text-charcoal shadow-2xl border border-warm-200 transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 py-3.5 bg-charcoal text-white border-b border-warm-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center size-6 rounded-full bg-amber-400 text-charcoal">
              <Sparkles className="size-3.5 fill-charcoal" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              Detail Penawaran Eksklusif
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-white/10 hover:bg-white/20 text-warm-200 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Tutup detail promo"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[82vh] overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Badge & Title */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-[11px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs mb-2">
              <Flame className="size-3.5 fill-white text-white animate-pulse" />
              <span>HEMAT Rp 76.000 — SLOT MINGGU INI</span>
            </span>

            <h2 id="promo-detail-title" className="text-xl sm:text-2xl font-black text-charcoal tracking-tight leading-tight">
              {PROMO_SPECIAL.title}
            </h2>
            <p className="text-xs text-charcoal-700 mt-1 leading-relaxed">
              {PROMO_SPECIAL.subtitle}
            </p>
          </div>

          {/* Pricing Box Highlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-warm-50 to-orange-50 border-2 border-amber-300/80 shadow-soft flex items-baseline justify-between">
            <div>
              <span className="text-[11px] font-bold text-charcoal-500 line-through block uppercase tracking-wider">
                Harga Normal: {PROMO_SPECIAL.normalPrice}
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-black text-charcoal tracking-tight font-mono">
                  {PROMO_SPECIAL.price}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                DISKON 20%
              </span>
              <span className="text-[10px] font-bold text-amber-900 block mt-1">
                Keluarga s/d 5 Orang
              </span>
            </div>
          </div>

          {/* Scarcity Bar & Live Countdown */}
          <div className="bg-charcoal text-white p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="flex items-center gap-1.5 text-red-300">
                <AlertCircle className="size-4 text-red-400 shrink-0" />
                <span>Sisa 2 dari 15 Kuota Promo Minggu Ini!</span>
              </span>
              <span className="text-amber-300 font-mono">87% Terisi</span>
            </div>

            {/* Progress visual bar */}
            <div className="w-full bg-charcoal-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/15">
              <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full rounded-full w-[87%]" />
            </div>

            {/* Countdown Grid */}
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[10px] text-warm-300 flex items-center gap-1">
                <Clock className="size-3.5 text-amber-400" />
                <span>Promo Berakhir:</span>
              </span>

              <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                <span className="bg-charcoal-900 px-2 py-1 rounded border border-white/10 text-amber-300">
                  {fmt(timeLeft.days)} Hari
                </span>
                <span>:</span>
                <span className="bg-charcoal-900 px-2 py-1 rounded border border-white/10 text-amber-300">
                  {fmt(timeLeft.hours)} Jam
                </span>
                <span>:</span>
                <span className="bg-charcoal-900 px-2 py-1 rounded border border-white/10 text-amber-300">
                  {fmt(timeLeft.minutes)} Mnt
                </span>
                <span>:</span>
                <span className="bg-charcoal-900 px-2 py-1 rounded border border-red-500/50 text-red-400">
                  {fmt(timeLeft.seconds)} Dtk
                </span>
              </div>
            </div>
          </div>

          {/* Full Deliverables & Bonuses */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-charcoal">
              Fasilitas & Bonus Lengkap yang Anda Dapatkan:
            </h3>

            <div className="space-y-2 text-xs text-charcoal">
              {PROMO_SPECIAL.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-warm-50 border border-warm-100">
                  <span className="size-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-emerald-700 font-bold" />
                  </span>
                  <div className="leading-snug">
                    <span className="font-bold text-charcoal">{item}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
              <Heart className="size-4 text-red-500 fill-red-500 shrink-0 mt-0.5" />
              <span>
                <strong>Bebas 2 Outfit:</strong> Wisudawan bebas bawa 2 kostum berbeda (misal: kebaya/jas + toga lengkap). Asisten studio ramah siap bantu mengarahkan gaya & pose terbaik!
              </span>
            </div>
          </div>

          {/* Branch Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                <MapPin className="size-3.5 text-charcoal" />
                <span>Pilih Lokasi Studio:</span>
              </span>
              <span className="text-[10px] text-charcoal-600 font-bold">3 Cabang Semarang</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {BRANCHES_DATA.map((b) => {
                const isSelected = selectedBranch === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranch(b.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-charcoal text-white border-charcoal shadow-soft ring-2 ring-amber-400/40'
                        : 'bg-warm-50/70 hover:bg-warm-100 border-warm-200 text-charcoal'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`size-2 rounded-full ${isSelected ? 'bg-amber-400' : 'bg-warm-400'}`} />
                        <span className="text-xs font-black">{b.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-warm-200 text-charcoal'}`}>
                        {b.landmark}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>
                      {b.address}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guarantee pill */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Garansi Kepuasan:</strong> Jadwal fleksibel, bebas konsultasi konsep & pose dengan fotografer kami.
            </span>
          </div>

          {/* Sticky CTA Action Area */}
          <div className="pt-2 space-y-2">
            {/* Direct WhatsApp Claim */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-bounce w-full relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 text-white font-black text-sm py-4 px-5 rounded-2xl shadow-xl shadow-emerald-900/30 transition-all text-center min-h-[52px]"
            >
              <MessageCircle className="size-5 shrink-0" />
              <span>KLAIM PROMO KE WHATSAPP SEKARANG</span>
            </a>

            {/* Or Book With Schedule Form */}
            {onBookWithSchedule && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookWithSchedule({
                    ...PROMO_SPECIAL,
                    name: PROMO_SPECIAL.title,
                    price: PROMO_SPECIAL.price,
                  });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-warm-100 hover:bg-warm-200 text-charcoal text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="size-3.5" />
                <span>Atur Tanggal & Jam via Form Booking</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
