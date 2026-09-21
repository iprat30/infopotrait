import React, { useState } from 'react';
import {
  Printer, Check, Plus, Minus, MessageCircle, Sparkles,
  Zap, Clock, FileText, ArrowRight, Trash2, ShoppingCart, RefreshCw
} from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

export const PAS_FOTO_SETS = [
  {
    id: 'set-a',
    code: 'Set A',
    detail: '4x6 = 4 lembar',
    shortTitle: '4x6 (4 lbr)',
    desc: 'Standar ijazah, wisuda & paspor',
  },
  {
    id: 'set-b',
    code: 'Set B',
    detail: '4x6 = 2 lbr & 3x4 = 4 lbr',
    shortTitle: '4x6 (2 lbr) & 3x4 (4 lbr)',
    desc: 'Paling favorit untuk buku nikah & CPNS',
    popular: true,
  },
  {
    id: 'set-c',
    code: 'Set C',
    detail: '3x4 = 8 lembar',
    shortTitle: '3x4 (8 lbr)',
    desc: 'Standar registrasi kampus & berkas lamaran',
  },
  {
    id: 'set-d',
    code: 'Set D',
    detail: '3x4 = 4 lbr & 2x3 = 8 lbr',
    shortTitle: '3x4 (4 lbr) & 2x3 (8 lbr)',
    desc: 'Lengkap ukuran kecil untuk dokumen dinas',
  }
];

export const SPEED_OPTIONS = [
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
  // Items array: each item is { id, setId, color: 'Warna' | 'Hitam Putih', qty: number }
  const [orderItems, setOrderItems] = useState([
    { id: 'item-1', setId: 'set-a', color: 'Warna', qty: 2 },
    { id: 'item-2', setId: 'set-b', color: 'Hitam Putih', qty: 1 },
    { id: 'item-3', setId: 'set-c', color: 'Warna', qty: 1 },
    { id: 'item-4', setId: 'set-d', color: 'Hitam Putih', qty: 1 },
  ]);

  const [selectedSpeed, setSelectedSpeed] = useState(SPEED_OPTIONS[0]); // Default Express

  const unitPrice = selectedSpeed.price;
  const totalSets = orderItems.reduce((acc, it) => acc + (it.qty || 0), 0);
  const totalBiaya = unitPrice * totalSets;

  const formatRupiah = (num) => `Rp ${num.toLocaleString('id-ID')}`;

  // Item manipulation functions
  const handleUpdateQty = (itemId, delta) => {
    setOrderItems((prev) =>
      prev
        .map((it) => {
          if (it.id === itemId) {
            const nextQty = it.qty + delta;
            return nextQty > 0 ? { ...it, qty: nextQty } : null;
          }
          return it;
        })
        .filter(Boolean)
    );
  };

  const handleUpdateColor = (itemId, color) => {
    setOrderItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, color } : it))
    );
  };

  const handleUpdateSet = (itemId, setId) => {
    setOrderItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, setId } : it))
    );
  };

  const handleRemoveItem = (itemId) => {
    setOrderItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const handleAddNewItem = (presetSetId = 'set-a', presetColor = 'Warna') => {
    const newId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setOrderItems((prev) => [
      ...prev,
      { id: newId, setId: presetSetId, color: presetColor, qty: 1 }
    ]);
  };

  // Quick preset from the user's prompt:
  // "Set A - 2 set warna, Set B 1x hitam putih, Set C 1 kali warna, D 1x kali hitam putih"
  const handleApplyExampleMix = () => {
    setOrderItems([
      { id: 'mix-1', setId: 'set-a', color: 'Warna', qty: 2 },
      { id: 'mix-2', setId: 'set-b', color: 'Hitam Putih', qty: 1 },
      { id: 'mix-3', setId: 'set-c', color: 'Warna', qty: 1 },
      { id: 'mix-4', setId: 'set-d', color: 'Hitam Putih', qty: 1 },
    ]);
  };

  // Quick preset: reset to single set
  const handleResetSingle = () => {
    setOrderItems([
      { id: 'single-1', setId: 'set-a', color: 'Warna', qty: 1 }
    ]);
  };

  // WhatsApp Order Generation
  const handleDirectWa = () => {
    if (orderItems.length === 0) return;

    const itemsSummary = orderItems.map((it, idx) => {
      const setObj = PAS_FOTO_SETS.find((s) => s.id === it.setId) || PAS_FOTO_SETS[0];
      const subtotal = it.qty * unitPrice;
      return `${idx + 1}. ${setObj.code} (${setObj.detail}) [${it.color.toUpperCase()}] × ${it.qty} Set = ${formatRupiah(subtotal)}`;
    }).join('\n');

    const text = [
      `*ORDER CETAK PAS FOTO (FILE SUDAH ADA)*`,
      `----------------------------------------`,
      `*Rincian Pesanan Cetak:*`,
      itemsSummary,
      `----------------------------------------`,
      `Kecepatan Cetak: ${selectedSpeed.name} (@ ${selectedSpeed.priceStr} / set)`,
      `Total Jumlah: ${totalSets} Set`,
      `*TOTAL BIAYA: ${formatRupiah(totalBiaya)}*`,
      ``,
      `Halo admin Potrait Studio, saya ingin cetak pas foto dari file yang sudah saya punya dengan rincian kombinasi di atas.`,
      `File foto akan segera saya kirimkan ke chat WA ini (dikirim sebagai Dokumen agar tidak terkompres). Mohon segera diproses ya min, terima kasih!`
    ].join('\n');

    const url = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleOpenModal = () => {
    if (onOpenBookingModal && orderItems.length > 0) {
      const briefItems = orderItems
        .map((it) => {
          const s = PAS_FOTO_SETS.find((x) => x.id === it.setId) || PAS_FOTO_SETS[0];
          return `${s.code} ${it.color} (${it.qty}x)`;
        })
        .join(', ');

      onOpenBookingModal({
        id: 'cetak-pasfoto-only',
        name: `Cetak Pas Foto Custom: ${briefItems}`,
        price: formatRupiah(totalBiaya),
        priceSuffix: ` (${totalSets} Set Total)`,
        isPrintOnly: true,
        duration: selectedSpeed.name,
        capacity: 'File Milik Sendiri',
        customOrderItems: orderItems,
        totalBiaya,
        totalSets,
        selectedSpeed
      });
    }
  };

  return (
    <section
      className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-warm-300/80 shadow-soft space-y-4 my-2"
      aria-label="Kalkulator Navigasi Cetak Pas Foto Multi-Set"
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-warm-100 pb-3">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[10.5px] font-black px-2.5 py-0.5 rounded-full border border-amber-200">
              <Printer className="size-3 text-amber-700" />
              <span>Cetak Pas Foto Sendiri</span>
            </span>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Bisa Campur Set & Varian Warna
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-charcoal tracking-tight">
            Kombinasi Cetak Pas Foto (Multi-Set)
          </h3>
          <p className="text-xs text-charcoal-700 mt-0.5">
            Bebas pilih kombinasi Set A, B, C, D dengan varian Warna / Hitam Putih dan jumlah set berbeda
          </p>
        </div>

        {/* Quick presets buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-center flex-wrap">
          <button
            type="button"
            onClick={handleApplyExampleMix}
            className="tap-bounce text-[10.5px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xl flex items-center gap-1 transition-colors"
            title="Kombinasi: Set A (2x Warna), Set B (1x B/W), Set C (1x Warna), Set D (1x B/W)"
          >
            <Sparkles className="size-3 text-amber-600" />
            <span>Contoh Kombinasi</span>
          </button>
          <button
            type="button"
            onClick={handleResetSingle}
            className="tap-bounce text-[10.5px] font-medium bg-warm-100 hover:bg-warm-200 text-charcoal-700 px-2 py-1 rounded-xl flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="size-3 text-charcoal-600" />
            <span>Reset 1 Set</span>
          </button>
        </div>
      </div>

      {/* Guide Card: Ukuran & Penjelasan Paket Set */}
      <div className="p-3 bg-warm-50/80 rounded-2xl border border-warm-200">
        <span className="text-[11px] font-black text-charcoal uppercase tracking-wider block mb-1.5">
          Referensi Pilihan Set Cetak:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {PAS_FOTO_SETS.map((s) => (
            <div key={s.id} className="bg-white p-2 rounded-xl border border-warm-200/80 shadow-2xs">
              <span className="font-black text-charcoal block text-[11.5px]">{s.code}</span>
              <span className="font-extrabold text-amber-700 block text-[11px]">{s.detail}</span>
              <span className="text-[10px] text-charcoal-500 block leading-tight mt-0.5">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── LIST OF CUSTOM ORDER ITEMS ── */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
            <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
              1
            </span>
            <span>Rincian Set & Varian yang Dipesan:</span>
          </label>
          <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
            {orderItems.length} Pilihan • Total {totalSets} Set
          </span>
        </div>

        {orderItems.length === 0 ? (
          <div className="p-6 text-center bg-warm-50 rounded-2xl border border-dashed border-warm-300">
            <p className="text-xs text-charcoal-600 font-bold mb-2">Belum ada set cetak yang dipilih</p>
            <button
              type="button"
              onClick={() => handleAddNewItem('set-a', 'Warna')}
              className="tap-bounce inline-flex items-center gap-1.5 bg-charcoal text-white text-xs font-bold px-3 py-2 rounded-xl"
            >
              <Plus className="size-3.5" />
              <span>Tambah Set Cetak Pertama</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {orderItems.map((item, index) => {
              const currentSetObj = PAS_FOTO_SETS.find((s) => s.id === item.setId) || PAS_FOTO_SETS[0];
              const subtotal = item.qty * unitPrice;

              return (
                <div
                  key={item.id}
                  className="bg-warm-50/70 hover:bg-warm-50 rounded-2xl p-3 border border-warm-200/90 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-full bg-charcoal/10 text-charcoal text-[11px] font-black flex items-center justify-center">
                        #{index + 1}
                      </span>
                      <div>
                        <span className="font-black text-sm text-charcoal">
                          {currentSetObj.code}
                        </span>
                        <span className="text-xs font-bold text-charcoal-700 ml-1.5">
                          ({currentSetObj.detail})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-charcoal">
                        {formatRupiah(subtotal)}
                      </span>
                      {orderItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="size-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors tap-bounce"
                          title="Hapus set ini"
                          aria-label="Hapus set ini"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Config Controls for This Item */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-warm-200/60 items-center">
                    {/* Select Set */}
                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-charcoal-600 block mb-1">
                        Pilih Set Ukuran:
                      </label>
                      <select
                        value={item.setId}
                        onChange={(e) => handleUpdateSet(item.id, e.target.value)}
                        className="w-full text-xs font-bold bg-white text-charcoal border border-warm-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-charcoal"
                      >
                        {PAS_FOTO_SETS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.code} - {s.shortTitle}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Select Color Variant */}
                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-charcoal-600 block mb-1">
                        Varian Warna:
                      </label>
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          type="button"
                          onClick={() => handleUpdateColor(item.id, 'Warna')}
                          className={`tap-bounce py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                            item.color === 'Warna'
                              ? 'bg-charcoal text-white border-charcoal shadow-2xs'
                              : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                          }`}
                        >
                          🌈 Warna
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateColor(item.id, 'Hitam Putih')}
                          className={`tap-bounce py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                            item.color === 'Hitam Putih'
                              ? 'bg-charcoal text-white border-charcoal shadow-2xs'
                              : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                          }`}
                        >
                          ⚪⚫ B/W
                        </button>
                      </div>
                    </div>

                    {/* Quantity Stepper for This Item */}
                    <div className="sm:col-span-4">
                      <label className="text-[10px] font-bold text-charcoal-600 block mb-1">
                        Jumlah Set:
                      </label>
                      <div className="flex items-center gap-1.5 bg-white rounded-xl border border-warm-300 p-1 justify-between">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, -1)}
                          disabled={item.qty <= 1 && orderItems.length <= 1}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal disabled:opacity-30 disabled:cursor-not-allowed tap-bounce transition-colors"
                          aria-label="Kurangi jumlah"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="font-black text-xs text-charcoal font-mono px-2">
                          {item.qty} <span className="text-[10px] font-semibold text-charcoal-600">Set</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item.id, 1)}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal tap-bounce transition-colors"
                          aria-label="Tambah jumlah"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Button to Add More Sets */}
        <div className="pt-1 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handleAddNewItem('set-a', 'Warna')}
            className="tap-bounce flex items-center gap-1.5 text-xs font-bold bg-white text-charcoal border-2 border-dashed border-warm-300 hover:border-charcoal hover:bg-warm-50 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
          >
            <Plus className="size-3.5 text-charcoal" />
            <span>+ Tambah Pilihan Set Lain</span>
          </button>
          <span className="text-[10.5px] text-charcoal-500 font-medium">
            (Bisa tambah Set A, B, C, atau D sesuka Anda)
          </span>
        </div>
      </div>

      {/* ── STEP 2: KECEPATAN CETAK ── */}
      <div>
        <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-2">
          <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">
            2
          </span>
          <span>Pilih Kecepatan Pengerjaan:</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SPEED_OPTIONS.map((sp) => {
            const isSelected = selectedSpeed.id === sp.id;
            return (
              <button
                type="button"
                key={sp.id}
                onClick={() => setSelectedSpeed(sp)}
                className={`tap-bounce p-3 rounded-2xl border text-left text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-charcoal bg-charcoal text-white font-bold shadow-soft ring-2 ring-warm-400/40'
                    : 'border-warm-200 bg-warm-50/70 text-charcoal hover:bg-warm-100'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs">{sp.name}</span>
                    <span className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-amber-400 text-charcoal' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    }`}>
                      {sp.badge}
                    </span>
                  </div>
                  <span className={`block text-[10.5px] mt-0.5 ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>
                    {sp.desc}
                  </span>
                </div>
                <span className={`font-mono font-black text-sm ml-2 shrink-0 ${isSelected ? 'text-amber-300' : 'text-charcoal'}`}>
                  {sp.priceStr}
                  <span className="text-[10px] font-normal block text-right opacity-80">/ set</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── STEP 3: TOTAL BIAYA & ORDER ACTIONS ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal text-white border-2 border-amber-400/50 shadow-elevated space-y-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-warm-300 font-bold flex items-center gap-1.5">
            <ShoppingCart className="size-3.5 text-amber-300" />
            <span>Rincian Total Pesanan ({orderItems.length} Varian):</span>
          </span>
          <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2 py-0.5 rounded-md font-bold">
            Total {totalSets} Set × {formatRupiah(unitPrice)}
          </span>
        </div>

        {/* Itemized List in Summary */}
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 max-h-40 overflow-y-auto">
          {orderItems.map((it, idx) => {
            const s = PAS_FOTO_SETS.find((x) => x.id === it.setId) || PAS_FOTO_SETS[0];
            return (
              <div key={it.id} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-amber-400 font-bold font-mono">#{idx + 1}</span>
                  <span className="font-bold text-white">{s.code}</span>
                  <span className="text-warm-300">({it.color})</span>
                  <span className="text-warm-400 font-mono">× {it.qty} set</span>
                </div>
                <span className="font-mono font-bold text-amber-200 shrink-0 ml-2">
                  {formatRupiah(it.qty * unitPrice)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Grand Total */}
        <div className="flex items-baseline justify-between border-t border-white/15 pt-2">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-warm-300 font-bold block">
              TOTAL BIAYA KESELURUHAN:
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
              {formatRupiah(totalBiaya)}
            </span>
          </div>

          <div className="text-right text-[11px] text-warm-200">
            <span className="font-bold text-white block">{totalSets} Set Total</span>
            <span className="text-[10px] opacity-80">{selectedSpeed.name}</span>
          </div>
        </div>

        {/* WhatsApp Document Guide Reminder */}
        <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-warm-200 flex items-start gap-2">
          <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
          <span className="leading-snug">
            Kirim file foto Anda ke WhatsApp sebagai <strong>'Dokumen'</strong> agar resolusi tetap tajam, jernih & tidak terkompres.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            disabled={orderItems.length === 0}
            onClick={handleDirectWa}
            className="tap-bounce w-full flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black py-3 px-4 rounded-xl shadow-md min-h-[46px]"
          >
            <MessageCircle className="size-4 shrink-0" />
            <span>Kirim File & Pesan via WA</span>
          </button>

          {onOpenBookingModal && (
            <button
              type="button"
              disabled={orderItems.length === 0}
              onClick={handleOpenModal}
              className="tap-bounce w-full flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 disabled:opacity-50 text-white text-xs font-bold py-3 px-4 rounded-xl border border-white/20 min-h-[46px] transition-colors"
            >
              <FileText className="size-3.5" />
              <span>Atur Cabang & Jadwal Ambil</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
