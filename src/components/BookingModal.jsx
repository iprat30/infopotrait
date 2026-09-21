import React, { useState, useMemo } from 'react';
import { X, Calendar, MapPin, MessageCircle, Clock, Check, Info, User, Phone } from 'lucide-react';
import { BRANCHES_DATA, MAIN_WHATSAPP } from '../data/branchesData';

export default function BookingModal({ packageItem, onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const isSelfPhoto = packageItem?.id?.startsWith('selfi') || packageItem?.name?.toLowerCase().includes('self photo');
  const isPasFoto = packageItem?.id?.startsWith('pasfoto') || packageItem?.id?.includes('pasfoto') || packageItem?.name?.toLowerCase().includes('pas foto');
  const isPrintOnly = packageItem?.isPrintOnly || packageItem?.id === 'cetak-pasfoto-only';

  const [selectedBranchId, setSelectedBranchId] = useState(isSelfPhoto ? 'prof-soedarto' : 'bq-square');
  const [pasFotoSet, setPasFotoSet] = useState('Set A (4x6 = 4 lembar)');
  const [pasFotoColor, setPasFotoColor] = useState('Warna');
  const [printSpeed, setPrintSpeed] = useState('Express 30 Menit (Rp 10.000 / set)');
  const [quantity, setQuantity] = useState('1 Set');
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00 WIB');
  const [totalPeople, setTotalPeople] = useState('');
  const [notes, setNotes] = useState('');

  if (!packageItem) return null;

  const currentBranch = BRANCHES_DATA.find((b) => b.id === selectedBranchId) || (isSelfPhoto ? BRANCHES_DATA[1] : BRANCHES_DATA[0]);

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

    const text = isPrintOnly ? [
      `*ORDER CETAK PAS FOTO (FILE SUDAH ADA)*`,
      customerName ? `Nama Pemesan: ${customerName}` : null,
      customerPhone ? `No. WhatsApp: ${customerPhone}` : null,
      `Layanan: ${packageItem.name}`,
      `Kecepatan Cetak: ${printSpeed}`,
      `Pilihan Set Cetak: ${pasFotoSet}`,
      `Opsi Warna: Cetak ${pasFotoColor}`,
      quantity ? `Jumlah Pesanan: ${quantity}` : `Jumlah: 1 Set`,
      `Cabang Pengambilan: ${currentBranch.name}`,
      date ? `Rencana Ambil Tanggal: ${date}` : null,
      notes ? `Catatan Tambahan: ${notes}` : null,
      ``,
      `Halo admin, saya ingin cetak pas foto dari file yang sudah saya miliki. File foto akan segera saya kirimkan via WhatsApp (sebagai Dokumen agar resolusi tidak pecah). Mohon segera diproses ya min, terima kasih!`
    ].filter(Boolean).join('\n') : [
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
            <p className="text-xs text-charcoal-700 font-semibold">Harga Paket:</p>
            <p className="text-lg font-black text-charcoal">{packageItem.price}</p>
          </div>
          <div className="text-right text-[11px] text-charcoal-700">
            <p>⏱ {packageItem.duration}</p>
            <p>👥 {packageItem.capacity || packageItem.people}</p>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSendWa} className="mt-3.5 space-y-3.5">
          
          {/* Customer Info (Name & WhatsApp) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label htmlFor="booking-name" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                <User className="size-3.5 text-warm-800" aria-hidden="true" />
                <span>Nama Lengkap:</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                required
                placeholder="Contoh: Rian Pratama"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal placeholder:text-charcoal-400 focus:outline-none focus:ring-2 focus:ring-charcoal/20 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label htmlFor="booking-phone" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
                <Phone className="size-3.5 text-warm-800" aria-hidden="true" />
                <span>No. WhatsApp:</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                required
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
                <span>Pilih Cabang Studio:</span>
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

          {/* Pas Foto Specific: Set Cetak & Opsi Warna */}
          {isPasFoto && (
            <div className="p-3 bg-warm-50/90 rounded-2xl border border-warm-200 space-y-2.5">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center justify-between">
                  <span>Pilihan Paket Set Cetak Pas Foto:</span>
                  <span className="text-[10px] text-warm-800 font-bold">Bebas Pilih</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { code: 'Set A', detail: '4x6 = 4 lembar' },
                    { code: 'Set B', detail: '4x6 = 2 lbr & 3x4 = 4 lbr' },
                    { code: 'Set C', detail: '3x4 = 8 lembar' },
                    { code: 'Set D', detail: '3x4 = 4 lbr & 2x3 = 8 lbr' }
                  ].map((s) => {
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

          {/* Print Only Specific: Speed & Quantity Options */}
          {isPrintOnly && (
            <div className="space-y-3 pt-1">
              {/* WhatsApp Document Guide Box */}
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                <Check className="size-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="leading-relaxed">
                  <p className="font-bold text-emerald-900">Cara Mudah Kirim File via WA:</p>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Setelah menekan tombol hijau di bawah, chat WhatsApp studio akan otomatis terbuka. Cukup <strong>lampirkan file foto Anda sebagai 'Dokumen'</strong> agar resolusi tetap tajam & tidak pecah.
                  </p>
                </div>
              </div>

              {/* Speed Option */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5">
                  Pilihan Kecepatan Cetak:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { label: '⚡ Express (± 30 Menit)', val: 'Express 30 Menit (Rp 10.000 / set)', desc: 'Langsung jadi di studio' },
                    { label: '🕒 Reguler (H+1 Selesai)', val: 'Reguler H+1 (Rp 8.000 / set)', desc: 'Selesai keesokan hari' }
                  ].map((sp) => {
                    const isSelected = printSpeed === sp.val;
                    return (
                      <button
                        type="button"
                        key={sp.label}
                        onClick={() => setPrintSpeed(sp.val)}
                        className={`tap-bounce p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-charcoal text-white border-charcoal font-bold shadow-xs'
                            : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                        }`}
                      >
                        <div className="font-bold">{sp.label}</div>
                        <div className={`text-[10px] ${isSelected ? 'text-warm-200' : 'text-charcoal-600'}`}>{sp.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  Jumlah Pesanan (Berapa Set):
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['1 Set', '2 Set', '3 Set', '4 Set', '5 Set', '10 Set'].map((q) => (
                    <button
                      type="button"
                      key={q}
                      onClick={() => setQuantity(q)}
                      className={`tap-bounce py-1.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        quantity === q
                          ? 'bg-charcoal text-white border-charcoal shadow-xs'
                          : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Date Picker (Pengambilan / Sesi) */}
          <div>
            <label htmlFor="booking-date" className="block text-xs font-bold text-charcoal mb-1 flex items-center gap-1">
              <Calendar className="size-3.5 text-warm-800" aria-hidden="true" />
              <span>{isPrintOnly ? 'Rencana Tanggal Pengambilan Foto:' : 'Rencana Tanggal Sesi Foto:'}</span>
            </label>
            <input
              id="booking-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-warm-50 border border-warm-200 rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-charcoal/20"
            />
          </div>

          {/* 3. DYNAMIC TIME SLOTS (Only for Photoshoot Sessions) */}
          {!isPrintOnly && (
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-warm-800" aria-hidden="true" />
                  <span>Pilih Jam Sesi ({currentBranch.name}):</span>
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
                placeholder={isPrintOnly ? "misal: tolong background ganti biru / merah" : "misal: wisuda UNDIP, bawa toga"}
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
