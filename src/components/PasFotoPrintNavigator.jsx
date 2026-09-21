import React, { useState } from 'react';
import {
  Printer, Check, Plus, Minus, MessageCircle, Sparkles,
  Zap, Clock, FileText, ArrowRight, ShieldCheck
} from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

const SET_OPTIONS = [
  {
    id: 'set-a',
    code: 'Set A',
    detail: '4x6 = 4 lembar',
    desc: 'Standar ijazah, wisuda & paspor',
  },
  {
    id: 'set-b',
    code: 'Set B',
    detail: '4x6 = 2 lbr & 3x4 = 4 lbr',
    desc: 'Paling favorit untuk buku nikah & CPNS',
    popular: true,
  },
  {
    id: 'set-c',
    code: 'Set C',
    detail: '3x4 = 8 lembar',
    desc: 'Standar registrasi kampus & lamaran',
  },
  {
    id: 'set-d',
    code: 'Set D',
    detail: '3x4 = 4 lbr & 2x3 = 8 lbr',
    desc: 'Lengkap ukuran kecil untuk dokumen instansi',
  }
];

const SPEED_OPTIONS = [
  {
    id: 'express',
    name: 'Express (± 30 Menit)',
    price: 10000,
    priceStr: 'Rp 10.000',
    desc: 'Langsung jadi & siap ambil',
    badge: 'Langsung Jadi',
  },
  {
    id: 'reguler',
    name: 'Reguler (H+1 Selesai)',
    price: 8000,
    priceStr: 'Rp 8.000',
    desc: 'Bisa diambil keesokan hari',
    badge: 'Hemat',
  }
];

export default function PasFotoPrintNavigator({ onOpenBookingModal }) {
  const [selectedSet, setSelectedSet] = useState(SET_OPTIONS[1]); // Default Set B
  const [colorVariant, setColorVariant] = useState('Warna'); // 'Warna' | 'Hitam Putih'
  const [selectedSpeed, setSelectedSpeed] = useState(SPEED_OPTIONS[0]); // Default Express
  const [quantity, setQuantity] = useState(1);

  const pricePerSet = selectedSpeed.price;
  const totalBiaya = pricePerSet * quantity;
  const formatRupiah = (num) => `Rp ${num.toLocaleString('id-ID')}`;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDirectWa = () => {
    const text = [
      `*ORDER CETAK PAS FOTO (FILE SUDAH ADA)*`,
      `Pilihan Paket: ${selectedSet.code} (${selectedSet.detail})`,
      `Varian: Cetak ${colorVariant}`,
      `Layanan: ${selectedSpeed.name} (@ ${selectedSpeed.priceStr} / set)`,
      `Jumlah Pesanan: ${quantity} Set`,
      `*TOTAL BIAYA: ${formatRupiah(totalBiaya)}*`,
      ``,
      `Halo admin Potrait Studio, saya ingin cetak pas foto dari file yang sudah saya punya. File foto akan segera saya kirimkan ke chat WA ini (sebagai Dokumen agar tidak terkompres). Mohon diproses ya min, terima kasih!`
    ].join('\n');

    const url = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = () => {
    if (onOpenBookingModal) {
      onOpenBookingModal({
        id: 'cetak-pasfoto-only',
        name: `Cetak Pas Foto: ${selectedSet.code} (${colorVariant})`,
        price: formatRupiah(totalBiaya),
        priceSuffix: ` (${quantity} Set)`,
        isPrintOnly: true,
        duration: selectedSpeed.name,
        capacity: 'File Milik Sendiri',
      });
    }
  };

  return (
    <section
      className="bg-white rounded-3xl p-5 md:p-6 border-2 border-warm-300/80 shadow-soft space-y-4 my-2"
      aria-label="Kalkulator Navigasi Cetak Pas Foto"
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 border-b border-warm-100 pb-3">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10.5px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
              <Printer className="size-3 text-amber-700" />
              <span>Punya File Sendiri? Langsung Cetak</span>
            </span>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Kertas Lab Doff Premium
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-charcoal tracking-tight">
            Navigasi & Kalkulator Cetak Pas Foto
          </h3>
          <p className="text-xs text-charcoal-700 mt-0.5">
            Pilih set ukuran, varian warna, jumlah set, dan total biaya otomatis terhitung
          </p>
        </div>
      </div>

      {/* ── STEP 1: PILIH SET CETAK ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
              1
            </span>
            <span>Pilih Paket Set Cetak:</span>
          </label>
          <span className="text-[10px] text-charcoal-500 font-bold">Pilih salah satu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SET_OPTIONS.map((set) => {
            const isSelected = selectedSet.id === set.id;
            return (
              <button
                type="button"
                key={set.id}
                onClick={() => setSelectedSet(set)}
                className={`tap-bounce p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-charcoal bg-charcoal text-white shadow-soft ring-2 ring-warm-400/40'
                    : 'border-warm-200 bg-warm-50/70 text-charcoal hover:bg-warm-100'
                }`}
              >
                {set.popular && (
                  <span className={`absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-400 text-charcoal' : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    Terfavorit
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-sm">{set.code}</span>
                  <span className={`text-xs font-extrabold ${isSelected ? 'text-amber-300' : 'text-charcoal'}`}>
                    {set.detail}
                  </span>
                </div>
                <p className={`text-[10.5px] mt-1 leading-snug ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>
                  {set.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 2: VARIAN WARNA / HITAM PUTIH ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
              2
            </span>
            <span>Pilih Varian Warna:</span>
          </label>
          <span className="text-[10px] text-charcoal-500 font-bold">Sesuai kebutuhan instansi</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: '🌈 Cetak Berwarna (Color)', val: 'Warna', desc: 'Standar umum instansi & ijazah' },
            { label: '⚪⚫ Hitam Putih (B/W)', val: 'Hitam Putih', desc: 'Buku nikah / berkas kedinasan' }
          ].map((item) => {
            const isSelected = colorVariant === item.val;
            return (
              <button
                type="button"
                key={item.val}
                onClick={() => setColorVariant(item.val)}
                className={`tap-bounce p-3 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'border-charcoal bg-charcoal text-white shadow-soft ring-2 ring-warm-400/40'
                    : 'border-warm-200 bg-warm-50/70 text-charcoal hover:bg-warm-100'
                }`}
              >
                <div className="font-black text-xs">{item.label}</div>
                <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-warm-200' : 'text-charcoal-500'}`}>
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3: KECEPATAN & JUMLAH SET ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Kecepatan Cetak */}
        <div>
          <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
              3
            </span>
            <span>Kecepatan Cetak:</span>
          </label>
          <div className="space-y-1.5">
            {SPEED_OPTIONS.map((sp) => {
              const isSelected = selectedSpeed.id === sp.id;
              return (
                <button
                  type="button"
                  key={sp.id}
                  onClick={() => setSelectedSpeed(sp)}
                  className={`tap-bounce w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-charcoal bg-charcoal text-white font-bold shadow-xs'
                      : 'border-warm-200 bg-white text-charcoal hover:bg-warm-50'
                  }`}
                >
                  <div>
                    <span className="font-bold">{sp.name}</span>
                    <span className={`block text-[10px] ${isSelected ? 'text-warm-200' : 'text-charcoal-500'}`}>
                      {sp.desc}
                    </span>
                  </div>
                  <span className={`font-black ${isSelected ? 'text-amber-300' : 'text-charcoal'}`}>
                    {sp.priceStr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Jumlah Set (Stepper) */}
        <div>
          <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
            <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
              4
            </span>
            <span>Jumlah Set:</span>
          </label>

          <div className="bg-warm-50/90 rounded-2xl border border-warm-200 p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className="size-9 rounded-xl bg-white border border-warm-300 hover:bg-warm-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-charcoal shadow-2xs tap-bounce transition-colors"
                aria-label="Kurangi jumlah set"
              >
                <Minus className="size-4" />
              </button>

              <div className="text-center">
                <span className="text-xl font-black text-charcoal font-mono block">
                  {quantity} <span className="text-xs font-bold text-charcoal-600">Set</span>
                </span>
                <span className="text-[10px] text-charcoal-500 font-medium">
                  {selectedSet.code} ({colorVariant})
                </span>
              </div>

              <button
                type="button"
                onClick={handleIncrease}
                className="size-9 rounded-xl bg-white border border-warm-300 hover:bg-warm-100 flex items-center justify-center text-charcoal shadow-2xs tap-bounce transition-colors"
                aria-label="Tambah jumlah set"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center justify-center gap-1.5 pt-0.5">
              {[1, 2, 3, 5, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setQuantity(num)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                    quantity === num
                      ? 'bg-charcoal text-white border-charcoal'
                      : 'bg-white text-charcoal-700 border-warm-200 hover:bg-warm-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STEP 5: TOTAL BIAYA (LIVE CALCULATION BOX) ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal text-white border-2 border-amber-400/50 shadow-elevated space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-warm-300 font-bold">Ringkasan Pesanan Anda:</span>
          <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2 py-0.5 rounded-md">
            {quantity} Set × {formatRupiah(pricePerSet)}
          </span>
        </div>

        <div className="flex items-baseline justify-between border-t border-white/15 pt-2.5">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warm-300 font-bold block">
              TOTAL BIAYA:
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
              {formatRupiah(totalBiaya)}
            </span>
          </div>

          <div className="text-right text-[11px] text-warm-200">
            <span className="font-bold text-white block">{selectedSet.code} ({selectedSet.detail})</span>
            <span>Varian: {colorVariant} • {selectedSpeed.badge}</span>
          </div>
        </div>

        {/* WhatsApp Document Reminder */}
        <div className="p-2 rounded-xl bg-white/10 text-[10.5px] text-warm-200 flex items-start gap-1.5">
          <Check className="size-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Kirim file pas foto Anda via WhatsApp menggunakan opsi <strong>'Kirim Dokumen'</strong> agar resolusi tajam & tidak terkompres.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleDirectWa}
            className="tap-bounce w-full flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 text-white text-xs sm:text-sm font-black py-3 px-4 rounded-xl shadow-md min-h-[46px]"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>Kirim File via WA (Pesan)</span>
          </button>

          {onOpenBookingModal && (
            <button
              type="button"
              onClick={handleOpenModal}
              className="tap-bounce w-full flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold py-3 px-4 rounded-xl border border-white/20 min-h-[46px] transition-colors"
            >
              <FileText className="size-3.5" />
              <span>Atur Detail & Pilih Cabang</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
