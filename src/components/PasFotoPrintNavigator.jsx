import React, { useState, useMemo } from 'react';
import {
  Printer, Check, Plus, Minus, MessageCircle, Sparkles,
  Zap, Clock, FileText, ArrowRight, Trash2, ShoppingCart,
  RefreshCw, Layers, ChevronDown, HelpCircle, AlertCircle,
  CheckCircle2, Package
} from 'lucide-react';
import { MAIN_WHATSAPP } from '../data/branchesData';

// ── SET DEFINITIONS ─────────────────────────────────────────────────────────
export const PAS_FOTO_SETS = [
  {
    id: 'set-a',
    code: 'Set A',
    detail: '4x6 = 4 lembar',
    shortTitle: '4x6 (4 lbr)',
    desc: 'Standar ijazah, wisuda & paspor',
    popular: false,
    sheets: { '4x6': 4, '3x4': 0, '2x3': 0 }
  },
  {
    id: 'set-b',
    code: 'Set B',
    detail: '4x6 = 2 lbr & 3x4 = 4 lbr',
    shortTitle: '4x6 (2 lbr) & 3x4 (4 lbr)',
    desc: 'Paling favorit untuk buku nikah & CPNS',
    popular: true,
    sheets: { '4x6': 2, '3x4': 4, '2x3': 0 }
  },
  {
    id: 'set-c',
    code: 'Set C',
    detail: '3x4 = 8 lembar',
    shortTitle: '3x4 (8 lbr)',
    desc: 'Standar registrasi kampus & berkas lamaran',
    popular: false,
    sheets: { '4x6': 0, '3x4': 8, '2x3': 0 }
  },
  {
    id: 'set-d',
    code: 'Set D',
    detail: '3x4 = 4 lbr & 2x3 = 8 lbr',
    shortTitle: '3x4 (4 lbr) & 2x3 (8 lbr)',
    desc: 'Lengkap ukuran kecil untuk dokumen dinas',
    popular: false,
    sheets: { '4x6': 0, '3x4': 4, '2x3': 8 }
  }
];

// Ukuran yang tersedia dalam set standar
const STANDARD_SIZES = ['4x6', '3x4', '2x3'];

// Ukuran custom (di luar set) → langsung WA
const CUSTOM_SIZES = [
  { id: '2x3', label: '2×3 cm', hint: 'Sangat kecil — KTP lama, kartu pelajar' },
  { id: '3x4', label: '3×4 cm', hint: 'Paling umum — KTP, ijazah, berkas' },
  { id: '4x6', label: '4×6 cm', hint: 'Sering untuk wisuda & paspor' },
  { id: 'custom', label: 'Ukuran Lain', hint: '5×5, 4×4, atau ukuran khusus lainnya' },
];

// ── SPEED OPTIONS ────────────────────────────────────────────────────────────
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

// ── HELPERS ──────────────────────────────────────────────────────────────────

/**
 * Smart set-matching algorithm.
 *
 * Rules:
 * 1. One set order = all Warna OR all Hitam Putih (no mixing within a set).
 * 2. Process each color independently.
 * 3. Match set type to what sizes are actually needed:
 *    - Need ONLY 4x6         → Set A (4x6 × 4)
 *    - Need ONLY 3x4         → Set C (3x4 × 8)
 *    - Need 4x6 + 3x4        → Set B (4x6 × 2 + 3x4 × 4), top up with A or C
 *    - Need 2x3 (with/without 3x4) → Set D (3x4 × 4 + 2x3 × 8), top up with C/B/A
 *    - Need 4x6 + 2x3        → Set D + Set A
 * 4. Minimize total sets used. When tied, prefer fewer surplus prints.
 */
function computeOptimalSets(needs) {
  const assignments = [];
  const colors = ['Warna', 'Hitam Putih'];

  for (const color of colors) {
    let n4 = needs['4x6']?.[color] || 0; // need 4x6
    let n3 = needs['3x4']?.[color] || 0; // need 3x4
    let n2 = needs['2x3']?.[color] || 0; // need 2x3

    if (n4 === 0 && n3 === 0 && n2 === 0) continue;

    let qty_A = 0, qty_B = 0, qty_C = 0, qty_D = 0;

    // ── Step 1: Handle 2x3 → only Set D covers it ───────────────────────
    if (n2 > 0) {
      qty_D = Math.ceil(n2 / 8);
      // Set D also gives 3x4 as a side effect (4 lbr per set)
      n3 = Math.max(0, n3 - qty_D * 4);
    }

    // ── Step 2: Handle remaining 3x4 + 4x6 ─────────────────────────────
    if (n4 > 0 && n3 > 0) {
      // Both 4x6 and 3x4 needed → Set B covers both
      // Try two options and pick the one with fewer total sets

      // Option A: use enough Set B to cover all 3x4, top up 4x6 with Set A
      const b_opt1  = Math.ceil(n3 / 4);
      const a_opt1  = Math.max(0, Math.ceil((n4 - b_opt1 * 2) / 4));
      const tot_opt1 = b_opt1 + a_opt1;
      // surplus for option 1
      const sur_opt1 = (b_opt1 * 4 - n3) + (b_opt1 * 2 + a_opt1 * 4 - n4);

      // Option B: use enough Set B to cover all 4x6, top up 3x4 with Set C
      const b_opt2  = Math.ceil(n4 / 2);
      const c_opt2  = Math.max(0, Math.ceil((n3 - b_opt2 * 4) / 8));
      const tot_opt2 = b_opt2 + c_opt2;
      // surplus for option 2
      const sur_opt2 = (b_opt2 * 2 - n4) + (b_opt2 * 4 + c_opt2 * 8 - n3);

      // Pick option with fewer sets; break ties by fewer surplus prints
      if (tot_opt1 < tot_opt2 || (tot_opt1 === tot_opt2 && sur_opt1 <= sur_opt2)) {
        qty_B = b_opt1;
        qty_A = a_opt1;
      } else {
        qty_B = b_opt2;
        qty_C = c_opt2;
      }

    } else if (n4 > 0 && n3 === 0) {
      // Only 4x6 needed → Set A
      qty_A = Math.ceil(n4 / 4);

    } else if (n3 > 0 && n4 === 0) {
      // Only 3x4 needed → Set C
      qty_C = Math.ceil(n3 / 8);
    }
    // n4=0, n3=0 (all covered by Set D already) → nothing more needed

    // Build assignment entries (filter zero qty)
    if (qty_D > 0) assignments.push({ setId: 'set-d', color, qty: qty_D });
    if (qty_B > 0) assignments.push({ setId: 'set-b', color, qty: qty_B });
    if (qty_A > 0) assignments.push({ setId: 'set-a', color, qty: qty_A });
    if (qty_C > 0) assignments.push({ setId: 'set-c', color, qty: qty_C });
  }

  // ── Calculate total printed & surplus ───────────────────────────────────
  const totalPrinted = {
    '4x6': { Warna: 0, 'Hitam Putih': 0 },
    '3x4': { Warna: 0, 'Hitam Putih': 0 },
    '2x3': { Warna: 0, 'Hitam Putih': 0 },
  };
  for (const a of assignments) {
    const s = PAS_FOTO_SETS.find(x => x.id === a.setId);
    for (const sz of ['4x6', '3x4', '2x3']) {
      totalPrinted[sz][a.color] = (totalPrinted[sz][a.color] || 0) + (s.sheets[sz] || 0) * a.qty;
    }
  }

  const surplus = {};
  for (const sz of ['4x6', '3x4', '2x3']) {
    for (const color of colors) {
      const wanted  = needs[sz]?.[color] || 0;
      const printed = totalPrinted[sz][color] || 0;
      const extra   = printed - wanted;
      if (extra > 0) {
        if (!surplus[sz]) surplus[sz] = {};
        surplus[sz][color] = extra;
      }
    }
  }

  const totalSets = assignments.reduce((acc, a) => acc + a.qty, 0);
  return { assignments, totalSets, totalPrinted, surplus };
}


export function computeSheetsBreakdown(items) {
  const breakdown = {
    '4x6': { 'Warna': 0, 'Hitam Putih': 0 },
    '3x4': { 'Warna': 0, 'Hitam Putih': 0 },
    '2x3': { 'Warna': 0, 'Hitam Putih': 0 },
  };
  let totalLembarAll = 0;
  items.forEach((it) => {
    const s = PAS_FOTO_SETS.find((x) => x.id === it.setId) || PAS_FOTO_SETS[0];
    const qty = it.qty || 0;
    const colorKey = it.color === 'Hitam Putih' ? 'Hitam Putih' : 'Warna';
    for (const sz of ['4x6', '3x4', '2x3']) {
      if (s.sheets[sz]) {
        const count = s.sheets[sz] * qty;
        breakdown[sz][colorKey] += count;
        totalLembarAll += count;
      }
    }
  });
  const activeSizes = Object.entries(breakdown)
    .filter(([_, colors]) => colors['Warna'] > 0 || colors['Hitam Putih'] > 0)
    .map(([size, colors]) => {
      const parts = [];
      if (colors['Warna'] > 0) parts.push(`${colors['Warna']} lbr Warna`);
      if (colors['Hitam Putih'] > 0) parts.push(`${colors['Hitam Putih']} lbr B/W`);
      return {
        size,
        warna: colors['Warna'],
        bw: colors['Hitam Putih'],
        totalForSize: colors['Warna'] + colors['Hitam Putih'],
        label: `${size}: ${parts.join(', ')}`
      };
    });
  return { breakdown, activeSizes, totalLembarAll };
}

// ── SIZE ICONS ───────────────────────────────────────────────────────────────
const SIZE_ICONS = {
  '2x3': '🪪',
  '3x4': '📋',
  '4x6': '🎓',
  'custom': '✨',
};

const SIZE_HINT = {
  '2x3': 'KTP, Kartu Pelajar',
  '3x4': 'Ijazah, CPNS, Berkas',
  '4x6': 'Wisuda, Paspor, Nikah',
};

// ── QUICK PRESET TEMPLATES ────────────────────────────────────────────────────
const QUICK_PRESETS = [
  {
    id: 'cpns',
    label: '🏛️ CPNS / Berkas',
    hint: '3x4 (8 lbr B/W)',
    needs: { '4x6': { Warna: 0, 'Hitam Putih': 0 }, '3x4': { Warna: 0, 'Hitam Putih': 8 }, '2x3': { Warna: 0, 'Hitam Putih': 0 } },
  },
  {
    id: 'wisuda',
    label: '🎓 Wisuda',
    hint: '4x6 (4 lbr Warna)',
    needs: { '4x6': { Warna: 4, 'Hitam Putih': 0 }, '3x4': { Warna: 0, 'Hitam Putih': 0 }, '2x3': { Warna: 0, 'Hitam Putih': 0 } },
  },
  {
    id: 'nikah',
    label: '💍 Buku Nikah',
    hint: '4x6 (2 lbr) + 3x4 (4 lbr)',
    needs: { '4x6': { Warna: 2, 'Hitam Putih': 0 }, '3x4': { Warna: 0, 'Hitam Putih': 4 }, '2x3': { Warna: 0, 'Hitam Putih': 0 } },
  },
  {
    id: 'kampus',
    label: '🏫 Daftar Kampus',
    hint: '3x4 (8 lbr Warna)',
    needs: { '4x6': { Warna: 0, 'Hitam Putih': 0 }, '3x4': { Warna: 8, 'Hitam Putih': 0 }, '2x3': { Warna: 0, 'Hitam Putih': 0 } },
  },
  {
    id: 'lengkap',
    label: '📦 Paket Lengkap',
    hint: '4x6 (4) + 3x4 (8) + 2x3 (8)',
    needs: { '4x6': { Warna: 4, 'Hitam Putih': 0 }, '3x4': { Warna: 8, 'Hitam Putih': 0 }, '2x3': { Warna: 8, 'Hitam Putih': 0 } },
  },
];

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function PasFotoPrintNavigator({ onOpenBookingModal, isEmbedded = false, onClose = null }) {
  // ── Mode state: 'easy' (new simplified UX) or 'advanced' (legacy set picker)
  const [mode, setMode] = useState('easy');

  // ── Active preset tracking
  const [activePreset, setActivePreset] = useState(null);

  // ── Easy Mode state: user fills needs per size+color
  // needs = { '4x6': { Warna: 0, 'Hitam Putih': 0 }, '3x4': {...}, '2x3': {...} }
  const [needs, setNeeds] = useState({
    '4x6': { Warna: 0, 'Hitam Putih': 0 },
    '3x4': { Warna: 0, 'Hitam Putih': 0 },
    '2x3': { Warna: 0, 'Hitam Putih': 0 },
  });
  const [wantsCustomSize, setWantsCustomSize] = useState(false);
  const [customSizeNote, setCustomSizeNote] = useState('');

  // ── Advanced mode state (legacy)
  const [orderItems, setOrderItems] = useState([
    { id: 'item-1', setId: 'set-a', color: 'Warna', qty: 1 },
  ]);

  const [selectedSpeed, setSelectedSpeed] = useState(SPEED_OPTIONS[0]);

  const unitPrice = selectedSpeed.price;
  const formatRupiah = (num) => `Rp ${num.toLocaleString('id-ID')}`;

  // ── Computed from easy mode ──────────────────────────────────────────────
  const easyResult = useMemo(() => computeOptimalSets(needs), [needs]);
  const totalEasySets = easyResult.totalSets;
  const totalEasyCost = totalEasySets * unitPrice;

  const hasAnyNeed = useMemo(() => {
    for (const sz of STANDARD_SIZES) {
      if ((needs[sz]?.Warna || 0) > 0 || (needs[sz]?.['Hitam Putih'] || 0) > 0) return true;
    }
    return false;
  }, [needs]);

  // ── Advanced mode computations ───────────────────────────────────────────
  const totalSetsAdv = orderItems.reduce((acc, it) => acc + (it.qty || 0), 0);
  const totalBiayaAdv = unitPrice * totalSetsAdv;
  const sheetsSummaryAdv = useMemo(() => computeSheetsBreakdown(orderItems), [orderItems]);

  // ── Setters for Easy Mode ────────────────────────────────────────────────
  const setNeed = (size, color, delta) => {
    setActivePreset(null); // clear preset on manual edit
    setNeeds(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        [color]: Math.max(0, (prev[size][color] || 0) + delta),
      }
    }));
  };

  const setNeedValue = (size, color, val) => {
    setActivePreset(null); // clear preset on manual edit
    const v = parseInt(val, 10);
    setNeeds(prev => ({
      ...prev,
      [size]: {
        ...prev[size],
        [color]: isNaN(v) || v < 0 ? 0 : v,
      }
    }));
  };

  const resetNeeds = () => {
    setNeeds({
      '4x6': { Warna: 0, 'Hitam Putih': 0 },
      '3x4': { Warna: 0, 'Hitam Putih': 0 },
      '2x3': { Warna: 0, 'Hitam Putih': 0 },
    });
    setWantsCustomSize(false);
    setCustomSizeNote('');
    setActivePreset(null);
  };

  const applyPreset = (preset) => {
    setNeeds(JSON.parse(JSON.stringify(preset.needs))); // deep clone
    setActivePreset(preset.id);
    setWantsCustomSize(false);
    setCustomSizeNote('');
  };

  // ── WA Message Builder ───────────────────────────────────────────────────
  const handleWaEasy = () => {
    if (wantsCustomSize) {
      const text = [
        `*CETAK PAS FOTO – UKURAN CUSTOM*`,
        `-----------------------------------`,
        `Halo admin Potrait Studio! Saya butuh cetak pas foto dengan ukuran khusus:`,
        `📐 Ukuran: ${customSizeNote || 'belum diisi — akan saya jelaskan'}`,
        ``,
        `Mohon info harga & ketersediaannya ya, terima kasih! 🙏`,
      ].join('\n');
      window.open(`https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`, '_blank');
      return;
    }

    if (!hasAnyNeed || totalEasySets === 0) return;

    // Build needs summary
    const needsLines = STANDARD_SIZES.flatMap(sz => {
      const parts = [];
      if ((needs[sz]?.Warna || 0) > 0) parts.push(`  • Ukuran ${sz}: ${needs[sz].Warna} lembar WARNA`);
      if ((needs[sz]?.['Hitam Putih'] || 0) > 0) parts.push(`  • Ukuran ${sz}: ${needs[sz]['Hitam Putih']} lembar HITAM PUTIH`);
      return parts;
    }).join('\n');

    // Build set assignments
    const assignLines = easyResult.assignments.map((a) => {
      const s = PAS_FOTO_SETS.find(x => x.id === a.setId);
      return `  • ${s.code} (${s.detail}) [${a.color.toUpperCase()}] × ${a.qty} set`;
    }).join('\n');

    // Build printed summary
    const printedLines = STANDARD_SIZES.flatMap(sz => {
      const parts = [];
      const w = easyResult.totalPrinted[sz]?.Warna || 0;
      const bw = easyResult.totalPrinted[sz]?.['Hitam Putih'] || 0;
      if (w > 0) parts.push(`  • ${sz}: ${w} lembar Warna`);
      if (bw > 0) parts.push(`  • ${sz}: ${bw} lembar Hitam Putih`);
      return parts;
    }).join('\n');

    const hasSurplus = Object.keys(easyResult.surplus).length > 0;
    const surplusLines = hasSurplus
      ? Object.entries(easyResult.surplus).flatMap(([sz, colors]) =>
          Object.entries(colors).map(([cl, q]) => `  • ${sz} ${cl}: +${q} lbr bonus`)
        ).join('\n')
      : '';

    const text = [
      `*ORDER CETAK PAS FOTO – FILE SUDAH ADA*`,
      `========================================`,
      `*Kebutuhan Saya:*`,
      needsLines,
      ``,
      `*Komposisi Set yang Diusulkan Sistem:*`,
      assignLines,
      ``,
      `*Total Cetak yang Akan Diterima:*`,
      printedLines,
      hasSurplus ? `\n*Bonus Lembar (dari sistem):*\n${surplusLines}` : '',
      ``,
      `Kecepatan: ${selectedSpeed.name} (${selectedSpeed.priceStr}/set)`,
      `Total Set: ${totalEasySets} set`,
      `*TOTAL BIAYA: ${formatRupiah(totalEasyCost)}*`,
      ``,
      `Halo admin Potrait Studio! Saya mau cetak pas foto dari file yang sudah saya punya, sesuai rincian di atas. File akan saya kirim sebagai *Dokumen* ya supaya tidak terkompres. Mohon diproses, terima kasih! 🙏`,
    ].filter(l => l !== null && l !== undefined).join('\n');

    window.open(`https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Advanced mode item handlers
  const handleUpdateQty = (itemId, delta) => {
    setOrderItems(prev =>
      prev.map(it => {
        if (it.id === itemId) {
          const nextQty = it.qty + delta;
          return nextQty > 0 ? { ...it, qty: nextQty } : null;
        }
        return it;
      }).filter(Boolean)
    );
  };
  const handleUpdateColor = (itemId, color) =>
    setOrderItems(prev => prev.map(it => (it.id === itemId ? { ...it, color } : it)));
  const handleUpdateSet = (itemId, setId) =>
    setOrderItems(prev => prev.map(it => (it.id === itemId ? { ...it, setId } : it)));
  const handleRemoveItem = (itemId) =>
    setOrderItems(prev => prev.filter(it => it.id !== itemId));
  const handleAddNewItem = (presetSetId = 'set-a', presetColor = 'Warna') => {
    const newId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setOrderItems(prev => [...prev, { id: newId, setId: presetSetId, color: presetColor, qty: 1 }]);
  };

  const handleWaAdv = () => {
    if (orderItems.length === 0) return;
    const itemsSummary = orderItems.map((it, idx) => {
      const setObj = PAS_FOTO_SETS.find(s => s.id === it.setId) || PAS_FOTO_SETS[0];
      const subtotal = it.qty * unitPrice;
      return `${idx + 1}. ${setObj.code} (${setObj.detail}) [${it.color.toUpperCase()}] × ${it.qty} Set = ${formatRupiah(subtotal)}`;
    }).join('\n');
    const { activeSizes, totalLembarAll } = sheetsSummaryAdv;
    const sheetsLines = activeSizes.map(s => {
      const parts = [];
      if (s.warna > 0) parts.push(`${s.warna} lembar Warna`);
      if (s.bw > 0) parts.push(`${s.bw} lembar Hitam Putih`);
      return `• Ukuran ${s.size}: ${parts.join(' & ')} (Total ${s.totalForSize} lbr)`;
    }).join('\n');
    const text = [
      `*ORDER CETAK PAS FOTO (FILE SUDAH ADA)*`,
      `----------------------------------------`,
      `*Rincian Pesanan Set:*`,
      itemsSummary,
      `----------------------------------------`,
      `*Total Lembar Foto (${totalLembarAll} Lembar):*`,
      sheetsLines,
      `----------------------------------------`,
      `Kecepatan: ${selectedSpeed.name} (@ ${selectedSpeed.priceStr}/set)`,
      `Total: ${totalSetsAdv} Set`,
      `*TOTAL BIAYA: ${formatRupiah(totalBiayaAdv)}*`,
      ``,
      `Halo admin Potrait Studio, saya ingin cetak pas foto dari file yang sudah saya punya. File akan saya kirim sebagai Dokumen agar tidak terkompres. Terima kasih!`,
    ].join('\n');
    window.open(`https://wa.me/${MAIN_WHATSAPP.number}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleOpenModal = () => {
    if (!onOpenBookingModal) return;
    if (mode === 'easy') {
      if (!hasAnyNeed) return;
      const briefItems = easyResult.assignments.map(a => {
        const s = PAS_FOTO_SETS.find(x => x.id === a.setId);
        return `${s.code} ${a.color} (${a.qty}x)`;
      }).join(', ');
      onOpenBookingModal({
        id: 'cetak-pasfoto-only',
        name: `Cetak Pas Foto: ${briefItems}`,
        price: formatRupiah(totalEasyCost),
        priceSuffix: ` (${totalEasySets} Set Total)`,
        isPrintOnly: true,
        duration: selectedSpeed.name,
        capacity: 'File Milik Sendiri',
        customOrderItems: easyResult.assignments,
        totalBiaya: totalEasyCost,
        totalSets: totalEasySets,
        selectedSpeed
      });
    } else {
      if (orderItems.length === 0) return;
      const briefItems = orderItems.map(it => {
        const s = PAS_FOTO_SETS.find(x => x.id === it.setId) || PAS_FOTO_SETS[0];
        return `${s.code} ${it.color} (${it.qty}x)`;
      }).join(', ');
      onOpenBookingModal({
        id: 'cetak-pasfoto-only',
        name: `Cetak Pas Foto Custom: ${briefItems}`,
        price: formatRupiah(totalBiayaAdv),
        priceSuffix: ` (${totalSetsAdv} Set Total)`,
        isPrintOnly: true,
        duration: selectedSpeed.name,
        capacity: 'File Milik Sendiri',
        customOrderItems: orderItems,
        totalBiaya: totalBiayaAdv,
        totalSets: totalSetsAdv,
        selectedSpeed
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────

  return (
    <section
      className={
        isEmbedded
          ? "space-y-4 pt-3 border-t border-warm-200 animate-fadeIn"
          : "bg-white rounded-3xl p-4 sm:p-6 border-2 border-warm-300/80 shadow-soft space-y-5 my-2"
      }
      aria-label="Kalkulator Cetak Pas Foto"
    >
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-2 border-b border-warm-100 pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[10.5px] font-black px-2.5 py-1 rounded-full border border-amber-200">
              <Printer className="size-3 text-amber-700" />
              <span>Cetak Pas Foto – File Sendiri</span>
            </span>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ✅ Hitung Otomatis Real-time
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="tap-bounce text-[11px] font-bold text-charcoal-700 hover:text-charcoal bg-warm-100 hover:bg-warm-200 px-2.5 py-1 rounded-lg border border-warm-200 transition-colors flex items-center gap-1"
            >
              <span>▲ Tutup Kalkulator</span>
            </button>
          )}
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-black text-charcoal tracking-tight">
            Mau cetak berapa lembar ukuran apa?
          </h3>
          <p className="text-xs text-charcoal-600 mt-0.5 leading-relaxed">
            Pilih ukuran, jumlah lembar, dan warna — sistem kami otomatis cari kombinasi set terbaik & hitung total biaya. Praktis!
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-1.5 self-start bg-warm-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => setMode('easy')}
            className={`tap-bounce text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
              mode === 'easy'
                ? 'bg-charcoal text-white shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal'
            }`}
          >
            ✨ Mudah (Rekomendasi)
          </button>
          <button
            type="button"
            onClick={() => setMode('advanced')}
            className={`tap-bounce text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
              mode === 'advanced'
                ? 'bg-charcoal text-white shadow-sm'
                : 'text-charcoal-600 hover:text-charcoal'
            }`}
          >
            ⚙️ Pilih Set Manual
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── EASY MODE ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {mode === 'easy' && (
        <div className="space-y-4">

          {/* STEP 1: Pilih Kebutuhan Per Ukuran */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">1</span>
                <span>Isi Kebutuhan Lembar Foto:</span>
              </label>
              <button
                type="button"
                onClick={resetNeeds}
                className="tap-bounce text-[10px] font-bold text-charcoal-500 hover:text-charcoal bg-warm-100 hover:bg-warm-200 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="size-3" /> Reset
              </button>
            </div>

            {/* Quick Preset Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-wider">Pilih cepat berdasarkan kebutuhan:</span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className={`tap-bounce text-[11px] font-bold px-3 py-1.5 rounded-xl border transition-all flex flex-col items-start ${
                      activePreset === preset.id
                        ? 'bg-charcoal text-white border-charcoal shadow-sm'
                        : 'bg-white text-charcoal border-warm-300 hover:border-charcoal hover:bg-warm-50'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className={`text-[9.5px] font-medium ${activePreset === preset.id ? 'text-warm-300' : 'text-charcoal-500'}`}>
                      {preset.hint}
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-charcoal-400">💡 Klik preset untuk otomatis isi — bisa diedit manual sesudahnya</p>
            </div>

            {/* Per-size input rows — compact */}
            {STANDARD_SIZES.map(sz => {
              const warna = needs[sz]?.Warna || 0;
              const bw    = needs[sz]?.['Hitam Putih'] || 0;
              const hasAny = warna > 0 || bw > 0;
              return (
                <div
                  key={sz}
                  className={`rounded-2xl border p-3 transition-all ${
                    hasAny
                      ? 'bg-white border-charcoal/20 shadow-sm'
                      : 'bg-warm-50 border-warm-200'
                  }`}
                >
                  {/* Size label */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-lg leading-none">{SIZE_ICONS[sz]}</span>
                    <div className="flex-1">
                      <span className="font-black text-sm text-charcoal">Ukuran {sz} cm</span>
                      <span className="text-[10px] text-charcoal-500 block leading-tight">{SIZE_HINT[sz]}</span>
                    </div>
                    {hasAny && (
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {warna + bw} lbr
                      </span>
                    )}
                  </div>

                  {/* Two color steppers side by side */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Warna */}
                    <div className={`flex flex-col gap-1 rounded-xl border px-2.5 py-2 ${
                      warna > 0 ? 'bg-blue-50 border-blue-200' : 'bg-white border-warm-200'
                    }`}>
                      <span className="text-[10px] font-bold text-charcoal-600 flex items-center gap-1">
                        🌈 <span>Warna</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setNeed(sz, 'Warna', -1)}
                          disabled={warna <= 0}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal disabled:opacity-30 tap-bounce transition-colors shrink-0"
                          aria-label={`Kurangi ${sz} warna`}
                        >
                          <Minus className="size-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={warna}
                          onChange={e => setNeedValue(sz, 'Warna', e.target.value)}
                          className="flex-1 min-w-0 text-center text-sm font-black text-charcoal bg-transparent border-none outline-none font-mono"
                          aria-label={`Jumlah lembar ${sz} warna`}
                        />
                        <button
                          type="button"
                          onClick={() => setNeed(sz, 'Warna', 1)}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal tap-bounce transition-colors shrink-0"
                          aria-label={`Tambah ${sz} warna`}
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-[9.5px] text-charcoal-400 text-center font-medium">lembar</span>
                    </div>

                    {/* Hitam Putih */}
                    <div className={`flex flex-col gap-1 rounded-xl border px-2.5 py-2 ${
                      bw > 0 ? 'bg-gray-50 border-gray-300' : 'bg-white border-warm-200'
                    }`}>
                      <span className="text-[10px] font-bold text-charcoal-600 flex items-center gap-1">
                        ⚫ <span>Hitam Putih</span>
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setNeed(sz, 'Hitam Putih', -1)}
                          disabled={bw <= 0}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal disabled:opacity-30 tap-bounce transition-colors shrink-0"
                          aria-label={`Kurangi ${sz} B/W`}
                        >
                          <Minus className="size-3" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={bw}
                          onChange={e => setNeedValue(sz, 'Hitam Putih', e.target.value)}
                          className="flex-1 min-w-0 text-center text-sm font-black text-charcoal bg-transparent border-none outline-none font-mono"
                          aria-label={`Jumlah lembar ${sz} B/W`}
                        />
                        <button
                          type="button"
                          onClick={() => setNeed(sz, 'Hitam Putih', 1)}
                          className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal tap-bounce transition-colors shrink-0"
                          aria-label={`Tambah ${sz} B/W`}
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-[9.5px] text-charcoal-400 text-center font-medium">lembar</span>
                    </div>
                  </div>
                </div>
              );
            })}


            {/* Custom size row */}
            <div
              className={`rounded-2xl border-2 border-dashed p-3 transition-all cursor-pointer ${
                wantsCustomSize
                  ? 'bg-amber-50 border-amber-400'
                  : 'bg-warm-50/60 border-warm-300 hover:border-amber-300'
              }`}
              onClick={() => setWantsCustomSize(v => !v)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{SIZE_ICONS.custom}</span>
                  <div>
                    <span className="font-black text-sm text-charcoal">Ukuran Lain / Custom</span>
                    <span className="text-[10px] text-charcoal-500 block">5×5, 4×4, atau ukuran khusus lainnya</span>
                  </div>
                </div>
                <div className={`size-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  wantsCustomSize ? 'bg-amber-500 border-amber-500' : 'border-warm-300'
                }`}>
                  {wantsCustomSize && <Check className="size-3 text-white" />}
                </div>
              </div>

              {wantsCustomSize && (
                <div className="mt-3 space-y-2" onClick={e => e.stopPropagation()}>
                  <p className="text-[11px] text-amber-800 font-bold bg-amber-100 px-2.5 py-1.5 rounded-lg">
                    💬 Ukuran ini tidak ada di Set standar kami — admin akan bantu langsung via WhatsApp!
                  </p>
                  <input
                    type="text"
                    placeholder="Tulis ukuran & jumlah lembar yang dibutuhkan, misal: 5x5 = 4 lembar warna"
                    value={customSizeNote}
                    onChange={e => setCustomSizeNote(e.target.value)}
                    className="w-full text-xs font-medium text-charcoal bg-white border border-amber-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-charcoal-400"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ── LIVE RESULT CARD ── */}
          {(hasAnyNeed || wantsCustomSize) && (
            <div className={`rounded-2xl border-2 p-4 space-y-3 transition-all ${
              wantsCustomSize
                ? 'bg-amber-50 border-amber-400'
                : 'bg-gradient-to-br from-emerald-50 to-warm-50 border-emerald-300'
            }`}>
              {wantsCustomSize ? (
                <div className="flex items-start gap-2">
                  <MessageCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-sm text-amber-900 block">Tanya Langsung ke Admin WA</span>
                    <span className="text-[11px] text-amber-700 leading-relaxed block mt-0.5">
                      Ceritakan ukuran & jumlah lembar yang Anda butuhkan — admin kami akan langsung bantu hitung harganya. Respon cepat!
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Package className="size-3" />
                      </span>
                      <span className="text-xs font-black text-charcoal uppercase tracking-wider">
                        Rekomendasi Sistem:
                      </span>
                    </div>
                    <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg">
                      {totalEasySets} Set Total
                    </span>
                  </div>

                  {/* Set assignments */}
                  <div className="space-y-1.5">
                    {easyResult.assignments.map((a, i) => {
                      const s = PAS_FOTO_SETS.find(x => x.id === a.setId);
                      return (
                        <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-warm-200">
                          <span className="size-6 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black flex items-center justify-center shrink-0">
                            {s.code.replace('Set ', '')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-black text-[11.5px] text-charcoal">{s.code}</span>
                              <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md ${
                                a.color === 'Warna'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-gray-100 text-gray-600 border border-gray-200'
                              }`}>
                                {a.color === 'Warna' ? '🌈' : '⚫'} {a.color}
                              </span>
                            </div>
                            <span className="text-[10px] text-charcoal-500">{s.detail}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-[11px] font-black text-charcoal font-mono block">×{a.qty} set</span>
                            <span className="text-[10px] text-amber-700 font-bold">{formatRupiah(a.qty * unitPrice)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Per-size Butuh vs Dapat breakdown */}
                  <div className="space-y-1 pt-0.5">
                    <span className="text-[10px] font-black text-charcoal-500 uppercase tracking-wider">
                      Rincian lembar yang akan Anda terima:
                    </span>
                    <div className="space-y-1">
                      {['Warna', 'Hitam Putih'].map(cl => {
                        const rows = STANDARD_SIZES.map(sz => {
                          const butuh  = needs[sz]?.[cl] || 0;
                          const dapat  = easyResult.totalPrinted[sz]?.[cl] || 0;
                          if (butuh === 0 && dapat === 0) return null;
                          const bonus  = dapat - butuh;
                          return { sz, butuh, dapat, bonus };
                        }).filter(Boolean);
                        if (rows.length === 0) return null;
                        return (
                          <div key={cl} className={`rounded-xl border p-2.5 space-y-1 ${
                            cl === 'Warna' ? 'bg-blue-50/60 border-blue-200' : 'bg-gray-50 border-gray-200'
                          }`}>
                            <span className="text-[10px] font-black text-charcoal-600 block">
                              {cl === 'Warna' ? '🌈 Cetak Warna' : '⚫ Cetak Hitam Putih'}
                            </span>
                            {rows.map(({ sz, butuh, dapat, bonus }) => (
                              <div key={sz} className="flex items-center justify-between text-[11px]">
                                <span className="font-bold text-charcoal">Ukuran {sz}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-charcoal-500">Butuh {butuh} lbr</span>
                                  <ArrowRight className="size-3 text-charcoal-400" />
                                  <span className="font-black text-emerald-700">Dapat {dapat} lbr</span>
                                  {bonus > 0 && (
                                    <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                                      +{bonus} bonus
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {Object.keys(easyResult.surplus).length > 0 && (
                    <div className="text-[10.5px] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1.5 flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Bonus lembar:</strong>{' '}
                        {Object.entries(easyResult.surplus).flatMap(([sz, colors]) =>
                          Object.entries(colors).map(([cl, q]) => `${sz} ${cl} +${q} lbr`)
                        ).join(', ')} — hasil pembulatan set. Tetap milik Anda!
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* STEP 2: Speed */}
          <div>
            <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">2</span>
              <span>Kecepatan Pengerjaan:</span>
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

          {/* STEP 3: Total & CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal text-white border-2 border-amber-400/50 shadow-elevated space-y-3.5">

            {/* Total cost display (or custom CTA) */}
            {wantsCustomSize ? (
              <div className="text-center space-y-1.5 py-1">
                <span className="text-warm-300 text-[11px] font-bold block">Harga dihitung manual oleh admin</span>
                <span className="text-2xl font-black text-amber-300">Tanya via WhatsApp →</span>
                <span className="text-[10px] text-warm-400 block">Respon cepat & ramah 09.00–21.00 WIB</span>
              </div>
            ) : hasAnyNeed ? (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-warm-300 font-bold flex items-center gap-1.5">
                    <ShoppingCart className="size-3.5 text-amber-300" />
                    <span>Rincian ({easyResult.assignments.length} jenis set):</span>
                  </span>
                  <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2 py-0.5 rounded-md font-bold">
                    {totalEasySets} set × {formatRupiah(unitPrice)}
                  </span>
                </div>

                {/* Items in summary */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  {easyResult.assignments.map((a, idx) => {
                    const s = PAS_FOTO_SETS.find(x => x.id === a.setId);
                    return (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-amber-400 font-bold font-mono">#{idx + 1}</span>
                          <span className="font-bold text-white">{s.code}</span>
                          <span className="text-warm-300">({a.color})</span>
                          <span className="text-warm-400 font-mono">× {a.qty} set</span>
                        </div>
                        <span className="font-mono font-bold text-amber-200 shrink-0 ml-2">
                          {formatRupiah(a.qty * unitPrice)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-baseline justify-between border-t border-white/15 pt-2">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-warm-300 font-bold block">TOTAL BIAYA:</span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
                      {formatRupiah(totalEasyCost)}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-warm-200">
                    <span className="font-bold text-white block">{totalEasySets} Set Total</span>
                    <span className="text-[10px] opacity-80">{selectedSpeed.name}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-3 space-y-1">
                <span className="text-warm-300 text-xs font-bold block">Isi jumlah lembar di atas untuk melihat harga</span>
                <span className="text-warm-400 text-[10px]">Kalkulasi otomatis & real-time ✨</span>
              </div>
            )}

            {/* WA guide */}
            {(hasAnyNeed || wantsCustomSize) && (
              <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-warm-200 flex items-start gap-2">
                <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {wantsCustomSize
                    ? 'Admin kami siap bantu hitung harga & ketersediaan ukuran khusus Anda!'
                    : <>Kirim file foto sebagai <strong>'Dokumen'</strong> di WhatsApp agar resolusi tetap tajam & tidak terkompres.</>
                  }
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={!hasAnyNeed && !wantsCustomSize}
                onClick={handleWaEasy}
                className="tap-bounce w-full flex items-center justify-center gap-2 bg-gradient-to-r from-wa to-emerald-600 hover:from-wa-hover hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-black py-3 px-4 rounded-xl shadow-md min-h-[46px] transition-all"
              >
                <MessageCircle className="size-4 shrink-0" />
                <span>
                  {wantsCustomSize ? 'Tanya Harga Custom via WA' : 'Order via WhatsApp'}
                </span>
              </button>

              {onOpenBookingModal && !wantsCustomSize && (
                <button
                  type="button"
                  disabled={!hasAnyNeed}
                  onClick={handleOpenModal}
                  className="tap-bounce w-full flex items-center justify-center gap-1.5 bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold py-3 px-4 rounded-xl border border-white/20 min-h-[46px] transition-colors"
                >
                  <FileText className="size-3.5" />
                  <span>Atur Cabang & Jadwal Ambil</span>
                </button>
              )}
            </div>
          </div>

          {/* Info Set Reference (collapsible) */}
          <details className="group">
            <summary className="cursor-pointer text-[11px] font-bold text-charcoal-500 hover:text-charcoal flex items-center gap-1.5 select-none list-none">
              <HelpCircle className="size-3.5" />
              <span>Lihat referensi Set A/B/C/D (untuk yang ingin tahu lebih lanjut)</span>
              <ChevronDown className="size-3.5 transition-transform group-open:rotate-180 ml-auto" />
            </summary>
            <div className="mt-2 p-3 bg-warm-50/80 rounded-2xl border border-warm-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {PAS_FOTO_SETS.map((s) => (
                  <div key={s.id} className="bg-white p-2 rounded-xl border border-warm-200/80 shadow-2xs">
                    <span className="font-black text-charcoal block text-[11.5px]">{s.code}</span>
                    <span className="font-extrabold text-amber-700 block text-[11px]">{s.detail}</span>
                    <span className="text-[10px] text-charcoal-500 block leading-tight mt-0.5">{s.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-charcoal-500 mt-2">
                💡 Di mode mudah, Anda tidak perlu hafal set ini — sistem otomatis pilihkan yang paling efisien.
              </p>
            </div>
          </details>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* ── ADVANCED MODE (legacy set picker) ── */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {mode === 'advanced' && (
        <div className="space-y-4">
          {/* Guide Card */}
          <div className="p-3 bg-warm-50/80 rounded-2xl border border-warm-200">
            <span className="text-[11px] font-black text-charcoal uppercase tracking-wider block mb-1.5">
              Referensi Standar Lembar Per Set:
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

          {/* Items list */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">1</span>
                <span>Atur Pilihan Set & Varian:</span>
              </label>
              <span className="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                {orderItems.length} Pilihan • {totalSetsAdv} Set
              </span>
            </div>

            {orderItems.length === 0 ? (
              <div className="p-6 text-center bg-warm-50 rounded-2xl border border-dashed border-warm-300">
                <p className="text-xs text-charcoal-600 font-bold mb-2">Belum ada set yang dipilih</p>
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
                  const currentSetObj = PAS_FOTO_SETS.find(s => s.id === item.setId) || PAS_FOTO_SETS[0];
                  const subtotal = item.qty * unitPrice;
                  const rowSheets4x6 = (currentSetObj.sheets['4x6'] || 0) * item.qty;
                  const rowSheets3x4 = (currentSetObj.sheets['3x4'] || 0) * item.qty;
                  const rowSheets2x3 = (currentSetObj.sheets['2x3'] || 0) * item.qty;
                  const rowSheetParts = [];
                  if (rowSheets4x6 > 0) rowSheetParts.push(`4x6: ${rowSheets4x6} lbr`);
                  if (rowSheets3x4 > 0) rowSheetParts.push(`3x4: ${rowSheets3x4} lbr`);
                  if (rowSheets2x3 > 0) rowSheetParts.push(`2x3: ${rowSheets2x3} lbr`);

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
                            <span className="font-black text-sm text-charcoal">{currentSetObj.code}</span>
                            <span className="text-xs font-bold text-charcoal-700 ml-1.5">({currentSetObj.detail})</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-charcoal">{formatRupiah(subtotal)}</span>
                          {orderItems.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="size-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors tap-bounce"
                              aria-label="Hapus set ini"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1 border-t border-warm-200/60 items-center">
                        <div className="sm:col-span-4">
                          <label className="text-[10px] font-bold text-charcoal-600 block mb-1">Pilih Set Ukuran:</label>
                          <select
                            value={item.setId}
                            onChange={e => handleUpdateSet(item.id, e.target.value)}
                            className="w-full text-xs font-bold bg-white text-charcoal border border-warm-300 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-charcoal"
                          >
                            {PAS_FOTO_SETS.map(s => (
                              <option key={s.id} value={s.id}>{s.code} - {s.shortTitle}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-4">
                          <label className="text-[10px] font-bold text-charcoal-600 block mb-1">Varian Warna:</label>
                          <div className="grid grid-cols-2 gap-1">
                            {['Warna', 'Hitam Putih'].map(c => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => handleUpdateColor(item.id, c)}
                                className={`tap-bounce py-1.5 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                                  item.color === c
                                    ? 'bg-charcoal text-white border-charcoal shadow-2xs'
                                    : 'bg-white text-charcoal border-warm-200 hover:bg-warm-100'
                                }`}
                              >
                                {c === 'Warna' ? '🌈 Warna' : '⚪⚫ B/W'}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label className="text-[10px] font-bold text-charcoal-600 block mb-1">Jumlah Set:</label>
                          <div className="flex items-center gap-1.5 bg-white rounded-xl border border-warm-300 p-1 justify-between">
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(item.id, -1)}
                              disabled={item.qty <= 1 && orderItems.length <= 1}
                              className="size-6 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-charcoal disabled:opacity-30 tap-bounce transition-colors"
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
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-warm-200/50 text-charcoal-600">
                        <span className="flex items-center gap-1">
                          <Layers className="size-3 text-warm-800" />
                          <span>Didapat dari baris ini:</span>
                        </span>
                        <span className="font-bold text-charcoal bg-white px-2 py-0.5 rounded-md border border-warm-200">
                          {rowSheetParts.join(' • ')} ({item.color})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-1 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => handleAddNewItem('set-a', 'Warna')}
                className="tap-bounce flex items-center gap-1.5 text-xs font-bold bg-white text-charcoal border-2 border-dashed border-warm-300 hover:border-charcoal hover:bg-warm-50 px-3.5 py-2 rounded-xl transition-all shadow-2xs"
              >
                <Plus className="size-3.5 text-charcoal" />
                <span>+ Tambah Pilihan Set Lain</span>
              </button>
            </div>
          </div>

          {/* Live Breakdown */}
          {sheetsSummaryAdv.activeSizes.length > 0 && (
            <div className="p-3.5 bg-gradient-to-r from-amber-50 via-warm-50 to-emerald-50 rounded-2xl border-2 border-amber-300/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="size-5 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Layers className="size-3" />
                  </span>
                  <span className="text-xs font-black text-charcoal uppercase tracking-wider">Total Lembar Foto:</span>
                </div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-lg">
                  {sheetsSummaryAdv.totalLembarAll} Lembar Total
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {['4x6', '3x4', '2x3'].map(sizeKey => {
                  const data = sheetsSummaryAdv.activeSizes.find(s => s.size === sizeKey);
                  if (!data) return null;
                  return (
                    <div key={sizeKey} className="bg-white rounded-xl p-2.5 border border-warm-200 shadow-2xs space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-black text-sm text-charcoal">Ukuran {sizeKey}</span>
                        <span className="text-xs font-black text-amber-700 font-mono">{data.totalForSize} Lembar</span>
                      </div>
                      <div className="text-[11px] space-y-0.5 border-t border-warm-100 pt-1">
                        {data.warna > 0 && (
                          <div className="flex items-center justify-between text-charcoal-700">
                            <span>🌈 Cetak Warna:</span>
                            <span className="font-bold font-mono text-emerald-700">{data.warna} lbr</span>
                          </div>
                        )}
                        {data.bw > 0 && (
                          <div className="flex items-center justify-between text-charcoal-700">
                            <span>⚪⚫ Hitam Putih:</span>
                            <span className="font-bold font-mono text-charcoal-900">{data.bw} lbr</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Speed */}
          <div>
            <label className="text-xs font-black text-charcoal uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <span className="size-5 rounded-full bg-charcoal text-white text-[11px] font-black flex items-center justify-center">2</span>
              <span>Pilih Kecepatan Pengerjaan:</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPEED_OPTIONS.map(sp => {
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

          {/* Total & CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal to-charcoal text-white border-2 border-amber-400/50 shadow-elevated space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-warm-300 font-bold flex items-center gap-1.5">
                <ShoppingCart className="size-3.5 text-amber-300" />
                <span>Rincian Total ({orderItems.length} Varian):</span>
              </span>
              <span className="text-[11px] font-mono text-amber-300 bg-white/10 px-2 py-0.5 rounded-md font-bold">
                Total {totalSetsAdv} Set × {formatRupiah(unitPrice)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 max-h-40 overflow-y-auto">
              {orderItems.map((it, idx) => {
                const s = PAS_FOTO_SETS.find(x => x.id === it.setId) || PAS_FOTO_SETS[0];
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

            <div className="flex items-baseline justify-between border-t border-white/15 pt-2">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-warm-300 font-bold block">TOTAL BIAYA:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono tracking-tight">
                  {formatRupiah(totalBiayaAdv)}
                </span>
              </div>
              <div className="text-right text-[11px] text-warm-200">
                <span className="font-bold text-white block">{totalSetsAdv} Set Total</span>
                <span className="text-[10px] opacity-80">{selectedSpeed.name}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 text-[11px] text-warm-200 flex items-start gap-2">
              <Check className="size-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Kirim file foto sebagai <strong>'Dokumen'</strong> di WA agar resolusi tetap tajam & tidak terkompres.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                disabled={orderItems.length === 0}
                onClick={handleWaAdv}
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
        </div>
      )}
    </section>
  );
}
