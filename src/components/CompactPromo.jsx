import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, ChevronDown, Check, Flame, Zap, Clock, Users, AlertCircle, Heart } from 'lucide-react';
import { PROMO_SPECIAL } from '../data/packagesData';
import { MAIN_WHATSAPP } from '../data/branchesData';

export default function CompactPromo() {
  const [expanded, setExpanded] = useState(false);

  // Live real-time ticking countdown to end of Sunday / batch
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 48,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 23, minutes: 59, seconds: 59 }; // Reset cycle
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num) => (num < 10 ? `0${num}` : `${num}`);

  const emotionalWaText = `Halo Admin Potrait Studio, saya ingin amankan SLOT PROMO WISUDA HEMAT Rp299k sebelum kehabisan slot minggu ini. Mohon info tanggal & jam yang masih kosong...`;
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(emotionalWaText)}`;

  return (
    <section className="px-4 py-2 max-w-xl mx-auto" aria-labelledby="promo-card-title">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal-800 text-white p-4 sm:p-5 shadow-elevated border-2 border-amber-400/60 ring-4 ring-amber-400/15">
        
        {/* Glow Ambient Lights */}
        <div className="absolute -top-12 -right-12 size-40 bg-amber-400/25 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>
        <div className="absolute -bottom-12 -left-12 size-40 bg-red-500/15 rounded-full blur-2xl pointer-events-none" aria-hidden="true"></div>

        {/* 1. TOP BANNER: FOMO Ribbon & Active Viewers */}
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-charcoal font-black px-3 py-1 rounded-full text-[11px] shadow-sm tracking-tight">
            <Flame className="size-3.5 fill-charcoal text-charcoal animate-bounce" aria-hidden="true" />
            <span>HEMAT Rp 76.000 — SLOT MINGGU INI</span>
          </span>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="size-2 rounded-full bg-emerald-400 animate-ping mr-0.5" aria-hidden="true"></span>
            <span>4 Klien Sedang Melihat</span>
          </span>
        </div>

        {/* 2. EMOTIONAL HOOK HEADLINE */}
        <div className="mt-1.5">
          <h2 id="promo-card-title" className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {PROMO_SPECIAL.title}
          </h2>
          <p className="text-xs text-amber-200/90 font-medium mt-0.5 flex items-center gap-1 leading-snug">
            <Heart className="size-3.5 text-red-400 fill-red-400 shrink-0" aria-hidden="true" />
            <span>Momen kelulusan bersama orang tua hanya sekali seumur hidup. Abadikan dengan sempurna!</span>
          </p>
        </div>

        {/* 3. BIG PRICE & DISCOUNT DISPLAY */}
        <div className="mt-3 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-baseline justify-between">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-warm-300 font-bold uppercase tracking-wider">
              <span>Harga Normal:</span>
              <span className="line-through">{PROMO_SPECIAL.normalPrice}</span>
            </div>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight block -mt-0.5">
              {PROMO_SPECIAL.price}
            </span>
          </div>
          <div className="text-right">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm block">
              DISKON 20%
            </span>
            <span className="text-[10px] text-warm-300 mt-1 block">Khusus Booking Minggu Ini</span>
          </div>
        </div>

        {/* 4. REAL-TIME COUNTDOWN TIMER (WAKTU TERBATAS) */}
        <div className="mt-3 p-2.5 bg-black/40 rounded-2xl border border-amber-400/30">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1.5 px-1">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
              <span>PROMO BERAKHIR DALAM:</span>
            </span>
            <span className="text-[10px] text-warm-300">Waktu Terbatas</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="bg-charcoal-900/90 py-1.5 px-1 rounded-xl border border-white/10 shadow-xs">
              <span className="font-black text-base sm:text-lg text-amber-300 block font-mono">
                {formatDigit(timeLeft.days)}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-warm-300 font-bold">Hari</span>
            </div>
            <div className="bg-charcoal-900/90 py-1.5 px-1 rounded-xl border border-white/10 shadow-xs">
              <span className="font-black text-base sm:text-lg text-amber-300 block font-mono">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-warm-300 font-bold">Jam</span>
            </div>
            <div className="bg-charcoal-900/90 py-1.5 px-1 rounded-xl border border-white/10 shadow-xs">
              <span className="font-black text-base sm:text-lg text-amber-300 block font-mono">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-warm-300 font-bold">Menit</span>
            </div>
            <div className="bg-charcoal-900/90 py-1.5 px-1 rounded-xl border border-red-500/40 shadow-xs">
              <span className="font-black text-base sm:text-lg text-red-400 block font-mono">
                {formatDigit(timeLeft.seconds)}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-red-300 font-bold">Detik</span>
            </div>
          </div>
        </div>

        {/* 5. SCARCITY SLOT PROGRESS BAR (KUOTA TERSISA) */}
        <div className="mt-3 bg-charcoal-900/60 p-2.5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
            <span className="text-red-300 flex items-center gap-1">
              <AlertCircle className="size-3.5 text-red-400 shrink-0" aria-hidden="true" />
              <span>Sisa 3 dari 15 Slot Promo Minggu Ini!</span>
            </span>
            <span className="text-amber-300">80% Terisi</span>
          </div>

          {/* Progress Visual Bar */}
          <div className="w-full bg-charcoal-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-500"
              style={{ width: '80%' }}
            ></div>
          </div>
          <p className="text-[10px] text-warm-300 mt-1">
            Studio ber-AC Tembalang & Sekaran sangat padat saat periode wisuda. Jangan tunggu H-1!
          </p>
        </div>

        {/* 6. KEY DELIVERABLES BULLETS */}
        <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-warm-100">
          <div className="flex items-center gap-1.5">
            <Check className="size-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>Keluarga hingga 5 orang</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="size-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>4 File Edit Premium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="size-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>GRATIS 4 Cetak 10R+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="size-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <span>All Softcopy Google Drive</span>
          </div>
        </div>

        {/* Collapsible Extended Details */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/15 text-xs text-warm-100 space-y-1.5 animate-fadeIn">
            <p className="font-bold text-amber-300 text-[11px]">Rincian Fasilitas Lengkap:</p>
            {PROMO_SPECIAL.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                <Check className="size-3 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
            <p className="text-[10px] text-warm-300 italic pt-1">
              Wisudawan bebas ganti 2 outfit • Asisten siap membantu menata pose & properti
            </p>
          </div>
        )}

        {/* 7. BIG HIGH-CONVERTING CTA BUTTON */}
        <div className="mt-3.5 flex items-center gap-2 pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-bounce flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-900/40 ring-2 ring-white/20 transition-all min-h-[48px]"
            aria-label="Amankan Slot Promo Wisuda Rp299k Sekarang Sebelum Penuh"
          >
            <MessageCircle className="size-4.5 shrink-0" aria-hidden="true" />
            <span>Amankan Slot Promo Rp299k Sekarang</span>
          </a>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-warm-100 flex items-center gap-1 min-h-[48px] transition-colors shrink-0"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'Tutup' : 'Detail'}</span>
            <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>

        {/* Micro-guarantee */}
        <p className="text-[10px] text-amber-200/80 text-center mt-2 font-medium">
          🔒 Bebas pilih jadwal & konsultasi konsep gratis bersama admin studio.
        </p>
      </div>
    </section>
  );
}
