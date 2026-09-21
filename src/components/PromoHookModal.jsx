import React, { useState, useEffect } from 'react';
import {
  X, Flame, Sparkles, Clock, AlertCircle, ArrowRight,
  GraduationCap, Users, Heart, CheckCircle2, Zap
} from 'lucide-react';
import { PROMO_SPECIAL } from '../data/packagesData';

// Context-aware hooks per user interest
const HOOK_CONTENT = {
  'wisuda-indoor': {
    badge: '🔥 FLASH SALE WISUDA — KHUSUS HARI INI',
    icon: <GraduationCap className="size-4 text-amber-300" />,
    headline: 'Momen Wisuda Cuma 1 Kali! Amankan Diskon Rp 76.000 Sekarang',
    sub: 'Bikin orang tua bangga & haru dengan foto wisuda keluarga terbaik sebelum slot studio penuh!',
    targetName: 'Wisuda Hemat Family & Bestie',
  },
  'wisuda-outdoor': {
    badge: '🌿 FLASH SALE WISUDA OUTDOOR',
    icon: <GraduationCap className="size-4 text-emerald-300" />,
    headline: 'Foto Wisuda Outdoor Kampus Semarang — Hemat Rp 76.000!',
    sub: 'Golden hour + momen kelulusan impian. Kuota fotografer outdoor terbatas minggu ini!',
    targetName: 'Wisuda Outdoor Hemat',
  },
  'group': {
    badge: '👨‍👩‍👧‍👦 PROMO SPESIAL KELUARGA & GROUP',
    icon: <Users className="size-4 text-rose-300" />,
    headline: 'Kapan Terakhir Foto Keluarga Lengkap? Hemat Rp 76.000 Hari Ini',
    sub: 'Abadikan kehangatan bersama orang tercinta di studio ber-AC nyaman sebelum jadwal weekend padat.',
    targetName: 'Foto Keluarga / Group Hemat',
  },
  'default': {
    badge: '⚡ FLASH SALE EKSKLUSIF PENGUNJUNG',
    icon: <Flame className="size-4 text-amber-300" />,
    headline: 'Spesial Pengunjung Baru: Amankan Voucher Diskon Rp 76.000!',
    sub: 'Penawaran terbatas untuk sesi foto studio berkualitas studio Tembalang & Sekaran.',
    targetName: 'Paket Hemat Eksklusif',
  }
};

export default function PromoHookModal({ isOpen, onClose, onClaimPromo, selectedCategory = '' }) {
  // Live ticking countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const hook = HOOK_CONTENT[selectedCategory] || HOOK_CONTENT.default;
  const fmt = (n) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-hook-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-charcoal-900 via-charcoal to-charcoal-950 text-white border-2 border-amber-400/80 shadow-2xl shadow-amber-500/20 transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient effects */}
        <div className="absolute -top-20 -right-20 size-56 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-56 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 size-8 rounded-full bg-white/10 hover:bg-white/20 text-warm-200 hover:text-white flex items-center justify-center transition-colors"
          aria-label="Tutup penawaran"
        >
          <X className="size-4" />
        </button>

        <div className="p-5 sm:p-6 space-y-3.5">
          {/* Top Badge: Hook Scarcity */}
          <div className="flex items-center gap-1.5 flex-wrap pr-8">
            <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-charcoal font-black text-[10.5px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              {hook.icon}
              <span>{hook.badge}</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Sisa 2 Kuota</span>
            </span>
          </div>

          {/* Emotional Hook Headline */}
          <div>
            <h3 id="promo-hook-title" className="text-base sm:text-lg font-black text-white leading-snug tracking-tight">
              {hook.headline}
            </h3>
            <p className="text-xs text-warm-200/90 mt-1 leading-relaxed">
              {hook.sub}
            </p>
          </div>

          {/* Pricing Highlight Block */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-3.5 border border-amber-400/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-warm-300 uppercase tracking-wider block">
                Harga Normal: <span className="line-through text-warm-400">{PROMO_SPECIAL.normalPrice}</span>
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
                  {PROMO_SPECIAL.price}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-gradient-to-r from-red-500 to-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm">
                HEMAT Rp 76.000
              </span>
              <span className="text-[10px] text-warm-300 block mt-1">
                Diskon 20% Terbatas
              </span>
            </div>
          </div>

          {/* Key Deliverables Hook (Compact) */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-warm-100 bg-black/30 p-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-amber-400 shrink-0" />
              <span>Keluarga s/d 5 Orang</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-amber-400 shrink-0" />
              <span>GRATIS 4 Cetak 10R+</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-amber-400 shrink-0" />
              <span>4 Edit File Premium</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-amber-400 shrink-0" />
              <span>All Softcopy G-Drive</span>
            </div>
          </div>

          {/* Countdown timer ticker */}
          <div className="flex items-center justify-between bg-black/50 px-3 py-2 rounded-xl border border-amber-400/20 text-xs">
            <span className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
              <Clock className="size-3.5 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Berakhir Dalam:</span>
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-amber-200 text-xs">
              <span className="bg-charcoal px-1.5 py-0.5 rounded border border-white/10">{fmt(timeLeft.hours)}j</span>
              <span>:</span>
              <span className="bg-charcoal px-1.5 py-0.5 rounded border border-white/10">{fmt(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="bg-charcoal px-1.5 py-0.5 rounded border border-red-500/50 text-red-400">{fmt(timeLeft.seconds)}d</span>
            </div>
          </div>

          {/* Primary High-Converting CTA Button */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={onClaimPromo}
              className="w-full relative overflow-hidden group tap-bounce flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-charcoal font-black text-sm py-3.5 px-5 rounded-2xl shadow-xl shadow-orange-500/25 transition-all cursor-pointer min-h-[50px]"
            >
              {/* Shimmer light sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer pointer-events-none" />

              <Zap className="size-4.5 fill-charcoal text-charcoal shrink-0 animate-bounce" />
              <span className="tracking-tight uppercase">AMBIL PROMO SEKARANG (HEMAT 76RB)</span>
              <ArrowRight className="size-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Subtle dismiss link */}
            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-[11px] text-warm-300/80 hover:text-white hover:underline py-1 transition-colors"
            >
              Nanti saja, saya ingin lihat pricelist biasa dulu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
