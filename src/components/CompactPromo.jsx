import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles, MessageCircle, ChevronDown, Check,
  Flame, Clock, AlertCircle, Heart, X, Zap, Users, GraduationCap,
} from 'lucide-react';
import { PROMO_SPECIAL } from '../data/packagesData';
import { MAIN_WHATSAPP } from '../data/branchesData';

// Context-aware copy per category intent
const INTENT_CONTEXTS = {
  'wisuda-indoor': {
    icon: <GraduationCap className="size-4 shrink-0" />,
    label: 'PROMO FOTO WISUDA',
    headline: 'Momen Wisuda Hanya Sekali Seumur Hidup — Abadikan Sekarang',
    sub: 'Orang tua sudah mengorbankan segalanya. Hadirkan foto wisuda yang bikin mereka bangga dan haru.',
    waText: 'Halo Admin Potrait, saya mau amankan SLOT PROMO WISUDA HEMAT Rp299k. Mohon info slot tersisa minggu ini ya!',
    urgency: 'Periode wisuda = slot super padat!',
    color: 'from-violet-700 via-charcoal to-charcoal',
    badge: 'bg-violet-400 text-white',
  },
  'wisuda-outdoor': {
    icon: <GraduationCap className="size-4 shrink-0" />,
    label: 'PROMO FOTO WISUDA OUTDOOR',
    headline: 'Foto Wisuda Outdoor Terbaik Semarang — Hemat Rp76.000',
    sub: 'Latar alam terbuka + golden hour = foto yang tak terlupakan. Slot outdoor terbatas!',
    waText: 'Halo Admin Potrait, saya mau amankan SLOT PROMO WISUDA OUTDOOR HEMAT Rp299k. Mohon info slot tersisa!',
    urgency: 'Slot outdoor paling cepat habis!',
    color: 'from-emerald-800 via-charcoal to-charcoal',
    badge: 'bg-emerald-400 text-charcoal',
  },
  group: {
    icon: <Users className="size-4 shrink-0" />,
    label: 'PROMO FOTO KELUARGA',
    headline: 'Foto Keluarga Lengkap — Hemat Rp76.000 Minggu Ini',
    sub: 'Kapan terakhir foto bersama seluruh keluarga? Buat momen ini nyata sebelum semua sibuk lagi.',
    waText: 'Halo Admin Potrait, saya mau amankan SLOT PROMO FOTO KELUARGA HEMAT Rp299k. Mohon info slot tersisa!',
    urgency: 'Akhir pekan = jadwal keluarga terpadat!',
    color: 'from-rose-800 via-charcoal to-charcoal',
    badge: 'bg-rose-400 text-white',
  },
  default: {
    icon: <Flame className="size-4 shrink-0" />,
    label: 'FLASH SALE TERBATAS',
    headline: 'Promo Spesial Minggu Ini — Hemat Rp76.000',
    sub: 'Penawaran eksklusif hanya untuk pengunjung yang hadir hari ini. Jangan lewatkan!',
    waText: 'Halo Admin Potrait, saya mau amankan SLOT PROMO HEMAT Rp299k. Mohon info slot tersisa minggu ini!',
    urgency: 'Harga normal kembali minggu depan!',
    color: 'from-amber-800 via-charcoal to-charcoal',
    badge: 'bg-amber-400 text-charcoal',
  },
};

const HIGH_INTENT = ['wisuda-indoor', 'wisuda-outdoor', 'group'];

export default function CompactPromo({ visible = false, selectedCategory = '', onDismiss }) {
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);          // controls CSS entrance
  const [showAttention, setShowAttention] = useState(false); // pulsing ring
  const prevVisibleRef = useRef(false);

  // Animate in when visible flips to true
  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      // Small RAF delay so CSS transition fires properly
      requestAnimationFrame(() => {
        setShow(true);
        // Show attention ring 800ms after slide-in starts
        setTimeout(() => setShowAttention(true), 800);
      });
    }
    prevVisibleRef.current = visible;
  }, [visible]);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 48, seconds: 35 });
  useEffect(() => {
    if (!visible) return;
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
  }, [visible]);

  const fmt = (n) => (n < 10 ? `0${n}` : `${n}`);

  const ctx = INTENT_CONTEXTS[selectedCategory] || INTENT_CONTEXTS.default;
  const waUrl = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(ctx.waText)}`;
  const isHighIntent = HIGH_INTENT.includes(selectedCategory);

  const handleDismiss = () => {
    setShow(false);
    setShowAttention(false);
    setTimeout(() => onDismiss?.(), 400); // wait for slide-out
  };

  if (!visible && !show) return null;

  return (
    <div
      className={`
        px-4 py-2 max-w-xl mx-auto w-full
        transition-all duration-500 ease-out
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
      `}
      aria-live="polite"
      aria-label="Promo terbatas"
    >
      {/* Attention ring that pulses around the whole card */}
      <div className={`relative rounded-3xl transition-all duration-700 ${showAttention ? 'ring-4 ring-amber-400/50' : 'ring-0'}`}>

        <section
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${ctx.color} text-white p-4 sm:p-5 shadow-floating border-2 border-amber-400/60`}
          aria-labelledby="promo-card-title"
        >

          {/* Glow lights */}
          <div className="absolute -top-12 -right-12 size-44 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 size-44 bg-red-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* ── TOP ROW: Badge + Live viewers + Dismiss ── */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {/* Flash badge — animates when high intent */}
              <span className={`inline-flex items-center gap-1.5 ${ctx.badge} font-black px-3 py-1 rounded-full text-[11px] shadow-sm tracking-tight ${isHighIntent ? 'animate-bounce' : ''}`}>
                {ctx.icon}
                <span>{ctx.label}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping mr-0.5" />
                <span>{isHighIntent ? '7' : '4'} Orang Melihat Ini</span>
              </span>
            </div>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              className="shrink-0 size-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-warm-300 hover:text-white transition-colors"
              aria-label="Tutup promo"
            >
              <X className="size-3.5" />
            </button>
          </div>

          {/* ── URGENCY RIBBON — appears immediately ── */}
          <div className="flex items-center gap-1.5 bg-red-500/25 border border-red-400/40 rounded-xl px-2.5 py-1.5 mb-3 text-[11px]">
            <AlertCircle className="size-3.5 text-red-300 shrink-0 animate-pulse" />
            <span className="font-bold text-red-200">{ctx.urgency}</span>
            <span className="ml-auto font-black text-amber-300">HEMAT Rp76.000!</span>
          </div>

          {/* ── HEADLINE ── */}
          <h2 id="promo-card-title" className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
            {ctx.headline}
          </h2>
          <p className="text-xs text-warm-200/90 font-medium mt-0.5 flex items-start gap-1 leading-snug">
            <Heart className="size-3.5 text-red-400 fill-red-400 shrink-0 mt-0.5" />
            <span>{ctx.sub}</span>
          </p>

          {/* ── PRICE BLOCK ── */}
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

          {/* ── COUNTDOWN TIMER ── */}
          <div className="mt-3 p-2.5 bg-black/40 rounded-2xl border border-amber-400/30">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-1.5 px-1">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>PROMO BERAKHIR DALAM:</span>
              </span>
              <span className="text-[10px] text-warm-300">Waktu Terbatas</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center">
              {[
                { val: timeLeft.days, label: 'Hari', red: false },
                { val: timeLeft.hours, label: 'Jam', red: false },
                { val: timeLeft.minutes, label: 'Menit', red: false },
                { val: timeLeft.seconds, label: 'Detik', red: true },
              ].map(({ val, label, red }) => (
                <div key={label} className={`bg-charcoal-900/90 py-1.5 px-1 rounded-xl border shadow-xs ${red ? 'border-red-500/40' : 'border-white/10'}`}>
                  <span className={`font-black text-base sm:text-lg block font-mono ${red ? 'text-red-400' : 'text-amber-300'}`}>
                    {fmt(val)}
                  </span>
                  <span className={`text-[9px] uppercase tracking-wider font-bold ${red ? 'text-red-300' : 'text-warm-300'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SLOT SCARCITY BAR ── */}
          <div className="mt-3 bg-charcoal-900/60 p-2.5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
              <span className="text-red-300 flex items-center gap-1">
                <AlertCircle className="size-3.5 text-red-400 shrink-0" />
                <span>Sisa {isHighIntent ? '2' : '3'} dari 15 Slot Promo!</span>
              </span>
              <span className="text-amber-300">{isHighIntent ? '87%' : '80%'} Terisi</span>
            </div>
            <div className="w-full bg-charcoal-800 h-2.5 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-700"
                style={{ width: isHighIntent ? '87%' : '80%' }}
              />
            </div>
            <p className="text-[10px] text-warm-300 mt-1">
              {isHighIntent
                ? 'Periode wisuda / musim kelulusan adalah waktu tersibuk. Booking sekarang sebelum slot habis!'
                : 'Studio ber-AC Tembalang & Sekaran sangat diminati akhir pekan. Jangan tunggu H-1!'}
            </p>
          </div>

          {/* ── BULLETS ── */}
          <div className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-warm-100">
            {[
              'Keluarga hingga 5 orang',
              '4 File Edit Premium',
              'GRATIS 4 Cetak 10R+',
              'All Softcopy Google Drive',
            ].map((b) => (
              <div key={b} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-amber-400 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          {/* Collapsible details */}
          {expanded && (
            <div className="mt-3 pt-3 border-t border-white/15 text-xs text-warm-100 space-y-1.5">
              <p className="font-bold text-amber-300 text-[11px]">Rincian Fasilitas Lengkap:</p>
              {PROMO_SPECIAL.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <Check className="size-3 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              <p className="text-[10px] text-warm-300 italic pt-1">
                Wisudawan bebas ganti 2 outfit • Asisten siap membantu menata pose & properti
              </p>
            </div>
          )}

          {/* ── CTA ROW ── */}
          <div className="mt-3.5 flex items-center gap-2 pt-1">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-bounce flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 text-white text-xs sm:text-sm font-black py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-900/40 ring-2 ring-white/20 transition-all min-h-[48px]"
              aria-label="Amankan Slot Promo Sekarang"
            >
              <MessageCircle className="size-4.5 shrink-0" />
              <span>Amankan Slot Promo Rp299k Sekarang</span>
            </a>
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-warm-100 flex items-center gap-1 min-h-[48px] transition-colors shrink-0"
              aria-expanded={expanded}
            >
              <span>{expanded ? 'Tutup' : 'Detail'}</span>
              <ChevronDown className={`size-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <p className="text-[10px] text-amber-200/80 text-center mt-2 font-medium">
            🔒 Bebas pilih jadwal & konsultasi konsep gratis bersama admin studio.
          </p>
        </section>
      </div>
    </div>
  );
}
