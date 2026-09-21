import React, { useState, useMemo } from 'react';
import { X, Calendar, MapPin, MessageCircle, Clock, Check, Info, User, Phone, Plus, Minus, Trash2, Layers } from 'lucide-react';
import { BRANCHES_DATA, MAIN_WHATSAPP } from '../data/branchesData';
import { PAS_FOTO_SETS, SPEED_OPTIONS, computeSheetsBreakdown } from './PasFotoPrintNavigator';

export default function BookingModal({ packageItem, onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const isSelfPhoto = packageItem?.id?.startsWith('selfi') || packageItem?.name?.toLowerCase().includes('self photo');
  const isPasFoto = packageItem?.id?.startsWith('pasfoto') || packageItem?.id?.includes('pasfoto') || packageItem?.name?.toLowerCase().includes('pas foto');
  const isPrintOnly = packageItem?.isPrintOnly || packageItem?.id === 'cetak-pasfoto-only';

  const [selectedBranchId, setSelectedBranchId] = useState(isSelfPhoto ? 'prof-soedarto' : 'bq-square');
  
  // For standard single pas foto package
  const [pasFotoSet, setPasFotoSet] = useState('Set A (4x6 = 4 lembar)');
  const [pasFotoColor, setPasFotoColor] = useState('Warna');
  const [printSpeed, setPrintSpeed] = useState('Express 30 Menit (Rp 10.000 / set)');

  // For multi-item custom print orders (passed from PasFotoPrintNavigator if available)
  const [customOrderItems, setCustomOrderItems] = useState(
    packageItem?.customOrderItems || [
      { id: 'item-1', setId: 'set-a', color: 'Warna', qty: 2 },
      { id: 'item-2', setId: 'set-b', color: 'Hitam Putih', qty: 1 },
      { id: 'item-3', setId: 'set-c', color: 'Warna', qty: 1 },
      { id: 'item-4', setId: 'set-d', color: 'Hitam Putih', qty: 1 },
    ]
  );

  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 WIB');
  const [totalPeople, setTotalPeople] = useState('');
  const [notes, setNotes] = useState('');

  if (!packageItem) return null;

  const currentBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || (isSelfPhoto ? BRANCHES_DATA[1] : BRANCHES_DATA[0]);

  // Unit price calculation
  const unitPrice = printSpeed.includes('8.000') ? 8000 : 10000;
  const totalSets = customOrderItems.reduce((acc, it) => acc + (it.qty || 0), 0);
  const printTotalBiaya = unitPrice * totalSets;
  const formatRupiah = (num) => `Rp ${num.toLocaleString('id-ID')}`;

  // Real-time sheets breakdown
  const sheetsSummary = useMemo(() => computeSheetsBreakdown(customOrderItems), [customOrderItems]);

  const handleUpdateItemQty = (id, delta) => {
    setCustomOrderItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter(Boolean)
    );
  };

  const handleUpdateItemColor = (id, color) => {
    setCustomOrderItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, color } : it))
    );
  };

  const handleUpdateItemSet = (id, setId) => {
    setCustomOrderItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, setId } : it))
    );
  };

  const handleRemoveItem = (id) => {
    if (customOrderItems.length > 1) {
      setCustomOrderItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  const handleAddItem = () => {
    setCustomOrderItems((prev) => [
      ...prev,
      { id: `item-${Date.now()}`, setId: 'set-a', color: 'Warna', qty: 1 }
    ]);
  };

  // Dynamic available time slots based on branch & day of week
  const availableTimeSlots = useMemo(() => {
    let closingHour = 20; // Default 20.00 WIB

    if (selectedBranchId === 'sekaran') {
      if (date) {
        const day = new Date(date).getDay(); // 0 is Sun, 6 is Sat
        const isWeekend = day === 0 || day === 6;
        closingHour = isWeekend ? 20 : 17; // Mon-Fri closes at 17.00
      } else {
        closingHour = 17; // Default to weekday hours for safety
      }
    }

    const slots = [];
    for (let h = 9; h < closingHour; h++) {
      const hourStr = h < 10 ? `0${h}` : `${h}`;
      slots.push(`${hourStr}:00 WIB`);
      if (h + 0.5 < closingHour) {
        slots.push(`${hourStr}:30 WIB`);
      }
    }
    return slots;
  }, [selectedBranchId, date]);

  const handleSendWa = (e) => {
    e.preventDefault();

    let text;
    if (isPrintOnly) {
      const itemsList = customOrderItems.map((it, idx) => {
        const s = PAS_FOTO_SETS.find((x) => x.id === it.setId) || PAS_FOTO_SETS[0];
        const sub = it.qty * unitPrice;
        return `${idx + 1}. ${s.code} (${s.detail}) [${it.color.toUpperCase()}] × ${it.qty} Set = ${formatRupiah(sub)}`;
      }).join('\n');

      const sheetsList = sheetsSummary.activeSizes.map((s) => {
        const parts = [];
        if (s.warna > 0) parts.push(`${s.warna} lembar Warna`);
        if (s.bw > 0) parts.push(`${s.bw} lembar Hitam Putih`);
        return `• Ukuran ${s.size}: ${parts.join(' & ')} (Total ${s.totalForSize} lbr)`;
      }).join('\n');

      text = [
        `*ORDER CETAK PAS FOTO (FILE SUDAH ADA)*`,
        customerName ? `Nama Pemesan: ${customerName}` : null,
        customerPhone ? `No. WhatsApp: ${customerPhone}` : null,
        `----------------------------------------`,
        `*Rincian Kombinasi Cetak:*`,
        itemsList,
        `----------------------------------------`,
        `*Total Lembar yang Didapat (${sheetsSummary.totalLembarAll} Lembar):*`,
        sheetsList,
        `----------------------------------------`,
        `Kecepatan Cetak: ${printSpeed}`,
        `Total Pesanan: ${totalSets} Set`,
        `*TOTAL BIAYA: ${formatRupiah(printTotalBiaya)}*`,
        `Cabang Pengambilan: ${currentBranch.name}`,
        date ? `Rencana Ambil Tanggal: ${date}` : null,
        notes ? `Catatan Tambahan: ${notes}` : null,
        ``,
        `Halo admin, saya ingin cetak pas foto dari file yang sudah saya miliki dengan rincian kombinasi dan total lembar di atas. File foto akan segera saya kirimkan via WhatsApp ini (sebagai Dokumen agar resolusi tidak pecah). Mohon segera diproses ya min, terima kasih!`
      ].filter(Boolean).join('\n');
    } else {
      text = [
        `*FORM BOOKING POTRAIT STUDIO SEMARANG*`,
        customerName ? `Nama Pemesan: ${customerName}` : null,
        customerPhone ? `No. WhatsApp: ${customerPhone}` : null,
        `Paket: ${packageItem.name} (${packageItem.price}${packageItem.priceSuffix || ''})`,
        isPasFoto ? `Pilihan Set Cetak: ${pasFotoSet}` : null,
        isPasFoto ? `Opsi Warna: Cetak ${pasFotoColor}` : null,
        `Cabang: ${currentBranch.name}`,
        date ? `Rencana Tanggal: ${date}` : `Tanggal: (Menyesuaikan)`,
        `Jam yang Diinginkan: ${selectedTime}`,
        totalPeople ? `Jumlah Orang: ${totalPeople}` : null,
        notes ? `Catatan Tambahan: ${notes}` : null,
        ``,
        `Halo admin, apakah jadwal sesi foto pada jam tersebut masih tersedia? Terima kasih.`
      ].filter(Boolean).join('\n');
    }

    const url = `https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-5 md:p-6 shadow-floating border border-warm-200 max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-warm-100">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-warm-800">
              {isPrintOnly ? 'Form Order Cetak Pas Foto (Kirim File WA)' : 'Form Reservasi Jadwal Sesi Foto'}
            </span>
            <h3 id="modal-title" className="text-base md:text-lg font-extrabold text-charcoal">
              {packageItem.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-full bg-warm-100 text-charcoal flex items-center justify-center hover:bg-warm-200 transition-colors"
            aria-label="Tutup form booking"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* Selected Package Summary Box */}
        <div className="mt-3 p-3 bg-warm-50 rounded-xl border border-warm-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-charcoal-700 font-semibold">
              {isPrintOnly ? 'Estimasi Total Biaya:' : 'Harga Paket:'}
            </p>
            <p className="text-lg font-black text-charcoal">
              {isPrintOnly ? formatRupiah(printTotalBiaya) : packageItem.price}
            </p>
          </div>
          <div className="text-right text-[11px] text-charcoal-700">
            <p>⏱ {packageItem.duration}</p>
            <p>👥 {isPrintOnly ? `${totalSets} Set (${sheetsSummary.totalLembarAll} Lembar)` : (packageItem.capacity || packageItem.people)}</p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSendWa} className="mt-3.5 space-y-3.5">
          {/* Identitas Pemesan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="customer-name" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                <User className="size-3 text-charcoal-600" />
                <span>Nama Pemesan:</span>
              </label>
              <input
                id="customer-name"
                type="text"
                placeholder="Nama Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label htmlFor="customer-phone" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                <Phone className="size-3 text-charcoal-600" />
                <span>Nomor WhatsApp:</span>
              </label>
              <input
                id="customer-phone"
                type="tel"
                placeholder="Contoh: 081234567890"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 1. Branch Picker */}
          <div>
            <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5 text-warm-800" aria-hidden="true" />
                <span>Pilih Cabang Pengambilan / Studio:</span>
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">{currentBranch.hours}</span>
            </label>

            {isSelfPhoto && (
              <div className="mb-2 p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950 flex items-center gap-1.5">
                <Info className="size-3.5 text-amber-600 shrink-0" />
                <span>Layanan Self Photo khusus tersedia di <strong>Cabang Prof. Soedarto</strong> & <strong>Cabang Sekaran</strong>.</span>
              </div>
            )}

            <div className="grid grid-cols-1 gap-1.5">
              {BRANCHES_DATA.map((b) => {
                const isUnavailableForSelf = isSelfPhoto && !b.hasSelfPhoto;
                const isSelected = selectedBranchId === b.id;

                return (
                  <button
                    type="button"
                    key={b.id}
                    disabled={isUnavailableForSelf}
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`tap-bounce flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                      isUnavailableForSelf
                        ? 'opacity-45 bg-warm-100/70 border-warm-200 text-charcoal-400 cursor-not-allowed'
                        : isSelected
                        ? 'border-charcoal bg-charcoal text-white font-bold'
                        : 'border-warm-200 bg-white text-charcoal hover:bg-warm-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`size-2 rounded-full ${isUnavailableForSelf ? 'bg-gray-300' : 'bg-emerald-400'}`}></span>
                      <span>{b.name}</span>
                    </div>
                    <span className={`text-[10px] ${isUnavailableForSelf ? 'text-red-500 font-semibold' : isSelected ? 'text-warm-200' : 'text-charcoal-700'}`}>
                      {isUnavailableForSelf ? 'Tidak Ada Self Photo' : isSelfPhoto && b.hasSelfPhoto ? 'Tersedia Self Photo ✓' : b.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Standard Single Pas Foto Selection (For studio session packages) */}
          {isPasFoto && !isPrintOnly && (
            <div className="p-3 bg-warm-50/90 rounded-2xl border border-warm-200 space-y-2.5">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center justify-between">
                  <span>Pilihan Paket Set Cetak Pas Foto:</span>
                  <span className="text-[10px] text-warm-800 font-bold">Bebas Pilih</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {PAS_FOTO_SETS.map((s) => {
                    const val = `${s.code}: ${s.detail}`;
                    const isSelected = pasFotoSet === val;
                    return (
                      <button
                        type="button"
                        key={s.code}
                        onClick={() => setPasFotoSet(val)}
                        className={`tap-bounce p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-charcoal text-white border-charcoal font-bold shadow-xs'
                            : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                        }`}
                      >
                        <span className="font-bold">{s.code}</span>
                        <span className={`text-[10.5px] ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>{s.detail}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Opsi Warna Cetak:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: '🌈 Cetak Berwarna', val: 'Warna' },
                    { label: '⚪⚫ Hitam Putih (B/W)', val: 'Hitam Putih' }
                  ].map((c) => {
                    const isSelected = pasFotoColor === c.val;
                    return (
                      <button
                        type="button"
                        key={c.val}
                        onClick={() => setPasFotoColor(c.val)}
                        className={`tap-bounce p-2 rounded-xl border text-center text-xs transition-all font-bold ${
                          isSelected
                            ? 'bg-charcoal text-white border-charcoal shadow-xs'
                            : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                        }`}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Custom Multi-Item Pas Foto Print Configurator (If isPrintOnly) */}
          {isPrintOnly && (
            <div className="space-y-3 pt-1">
              {/* WhatsApp Document Guide Box */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <Check className="size-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="leading-relaxed">
                  <p className="font-bold text-emerald-900">Cara Kirim File via WA:</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Nanti di chat WhatsApp, cukup <strong>lampirkan file foto Anda sebagai 'Dokumen'</strong> agar resolusi tetap tajam & tidak pecah.
                  </p>
                </div>
              </div>

              {/* Multi-Item Editor in Modal */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-charcoal">
                    Rincian Kombinasi Set & Warna:
                  </label>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Total {totalSets} Set
                  </span>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {customOrderItems.map((item, idx) => {
                    const setObj = PAS_FOTO_SETS.find((s) => s.id === item.setId) || PAS_FOTO_SETS[0];
                    return (
                      <div key={item.id} className="p-2.5 bg-warm-50 rounded-xl border border-warm-200 text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-charcoal">#{idx + 1}. {setObj.code} ({setObj.detail})</span>
                          {customOrderItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              aria-label="Hapus baris ini"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-12 gap-1.5 items-center">
                          {/* Set select */}
                          <div className="col-span-5">
                            <select
                              value={item.setId}
                              onChange={(e) => handleUpdateItemSet(item.id, e.target.value)}
                              className="w-full text-[11px] font-bold bg-white text-charcoal border border-warm-300 rounded-lg px-2 py-1"
                            >
                              {PAS_FOTO_SETS.map((s) => (
                                <option key={s.id} value={s.id}>{s.code} ({s.shortTitle})</option>
                              ))}
                            </select>
                          </div>

                          {/* Color select */}
                          <div className="col-span-4 flex gap-1">
                            {['Warna', 'Hitam Putih'].map((col) => (
                              <button
                                key={col}
                                type="button"
                                onClick={() => handleUpdateItemColor(item.id, col)}
                                className={`text-[10px] font-bold py-1 px-1.5 rounded-lg border flex-1 text-center transition-all ${
                                  item.color === col
                                    ? 'bg-charcoal text-white border-charcoal'
                                    : 'bg-white text-charcoal border-warm-200'
                                }`}
                              >
                                {col === 'Warna' ? 'Warna' : 'B/W'}
                              </button>
                            ))}
                          </div>

                          {/* Qty stepper */}
                          <div className="col-span-3 flex items-center justify-between bg-white border border-warm-300 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateItemQty(item.id, -1)}
                              disabled={item.qty <= 1}
                              className="size-5 rounded flex items-center justify-center bg-warm-100 hover:bg-warm-200 text-charcoal disabled:opacity-30"
                            >
                              <Minus className="size-2.5" />
                            </button>
                            <span className="font-mono font-bold text-[11px]">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateItemQty(item.id, 1)}
                              className="size-5 rounded flex items-center justify-center bg-warm-100 hover:bg-warm-200 text-charcoal"
                            >
                              <Plus className="size-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="mt-1.5 text-xs font-bold text-charcoal flex items-center gap-1 hover:underline"
                >
                  <Plus className="size-3.5" />
                  <span>+ Tambah Set Lainnya</span>
                </button>
              </div>

              {/* Real-time Lembar Breakdown in Modal */}
              {sheetsSummary.activeSizes.length > 0 && (
                <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-200 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11.5px] font-bold text-charcoal">
                    <span className="flex items-center gap-1">
                      <Layers className="size-3.5 text-amber-700" />
                      <span>Rincian Total Lembar Foto yang Didapat:</span>
                    </span>
                    <span className="text-amber-800 font-black">{sheetsSummary.totalLembarAll} Lembar</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                    {sheetsSummary.activeSizes.map((s) => {
                      const parts = [];
                      if (s.warna > 0) parts.push(`${s.warna} Warna`);
                      if (s.bw > 0) parts.push(`${s.bw} B/W`);
                      return (
                        <div key={s.size} className="bg-white p-1.5 rounded-lg border border-amber-200/80 text-[10.5px]">
                          <span className="font-black text-charcoal block">{s.size}</span>
                          <span className="text-amber-700 font-bold block">{s.totalForSize} lbr</span>
                          <span className="text-[9.5px] text-charcoal-500 block leading-tight">{parts.join(', ')}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Speed Option */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5">
                  Pilihan Kecepatan Cetak:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {SPEED_OPTIONS.map((sp) => {
                    const isSelected = printSpeed.includes(sp.id === 'express' ? '10.000' : '8.000');
                    return (
                      <button
                        type="button"
                        key={sp.id}
                        onClick={() => setPrintSpeed(`${sp.name} (${sp.priceStr} / set)`)}
                        className={`tap-bounce p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-charcoal text-white border-charcoal font-bold shadow-xs'
                            : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                        }`}
                      >
                        <div className="font-bold">{sp.name}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>{sp.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Total Biaya Box */}
              <div className="p-3.5 bg-gradient-to-br from-charcoal-900 to-charcoal text-white rounded-2xl flex items-center justify-between border-2 border-amber-400/50 shadow-soft">
                <div>
                  <span className="text-[10px] text-warm-300 font-bold uppercase tracking-wider block">
                    Total Biaya Keseluruhan:
                  </span>
                  <span className="text-xl font-black text-amber-300 font-mono tracking-tight">
                    {formatRupiah(printTotalBiaya)}
                  </span>
                </div>
                <div className="text-right text-[11px] text-warm-200">
                  <span className="font-bold text-white block">{totalSets} Set ({sheetsSummary.totalLembarAll} Lembar)</span>
                  <span>@ {formatRupiah(unitPrice)} / set</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Date Picker (Pengambilan / Sesi) */}
          <div>
            <label htmlFor="booking-date" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
              <Calendar className="size-3.5 text-warm-800" aria-hidden="true" />
              <span>{isPrintOnly ? 'Rencana Tanggal Ambil Hasil Cetak:' : 'Pilih Rencana Tanggal Foto:'}</span>
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:bg-white transition-all"
            />
          </div>

          {/* 3. Time Slots (Only for Studio Session Booking) */}
          {!isPrintOnly && (
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-warm-800" aria-hidden="true" />
                  <span>Pilih Jam Sesi yang Tersedia:</span>
                </span>
                <span className="text-[10px] text-charcoal-700">Interval 30 menit</span>
              </label>

              {/* Time Slot Chips Grid */}
              <div className="grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 bg-warm-50 rounded-xl border border-warm-200">
                {availableTimeSlots.map((slot, sIdx) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      type="button"
                      key={sIdx}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-1.5 px-1 rounded-lg text-[11px] font-bold text-center transition-all ${
                        isSelected
                          ? 'bg-charcoal text-white shadow-xs'
                          : 'bg-white text-charcoal border border-warm-200 hover:bg-warm-100'
                      }`}
                    >
                      {slot.replace(' WIB', '')}
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-charcoal-700 mt-1">
                Jam terpilih: <strong className="text-charcoal">{selectedTime}</strong> (sesuai jam operasional {currentBranch.name})
              </p>
            </div>
          )}

          {/* 4. People Count & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {!isPrintOnly && (
              <div>
                <label htmlFor="booking-people" className="block text-[11px] font-bold text-charcoal mb-1">
                  Estimasi Jumlah Orang:
                </label>
                <input
                  id="booking-people"
                  type="text"
                  placeholder="misal: 4 orang"
                  value={totalPeople}
                  onChange={(e) => setTotalPeople(e.target.value)}
                  className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
                />
              </div>
            )}
            <div className={isPrintOnly ? 'sm:col-span-2' : ''}>
              <label htmlFor="booking-notes" className="block text-[11px] font-bold text-charcoal mb-1">
                Catatan / Request Khusus:
              </label>
              <input
                id="booking-notes"
                type="text"
                placeholder={isPrintOnly ? "misal: tolong background ganti biru / merah, atau ada 2 foto berbeda" : "misal: wisuda UNDIP, bawa toga"}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
              />
            </div>
          </div>

          {/* Submit WhatsApp Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="tap-bounce w-full flex items-center justify-center gap-2 bg-wa hover:bg-wa-hover text-white font-bold py-3 px-4 rounded-xl shadow-md transition-colors min-h-[46px] text-xs md:text-sm"
            >
              <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
              <span>{isPrintOnly ? 'Kirim File via WhatsApp (Order Cetak)' : 'Konfirmasi Jadwal via WhatsApp'}</span>
            </button>
            <p className="text-[10px] text-center text-charcoal-700 mt-1.5">
              {isPrintOnly
                ? "Chat WhatsApp akan otomatis memuat rincian pesanan. Lampirkan file foto Anda di chat sebagai Dokumen."
                : "Pesan pra-isi akan otomatis memuat paket, cabang, tanggal, dan jam pilihan Anda."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
