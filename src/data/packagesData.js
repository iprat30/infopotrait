export const SOCIAL_MEDIA = [
  { name: "Instagram", handle: "@potraiters", url: "https://instagram.com/potraiters", icon: "instagram" },
  { name: "TikTok", handle: "@potraiters", url: "https://tiktok.com/@potraiters", icon: "tiktok" },
  { name: "YouTube", handle: "@potraiters", url: "https://youtube.com/@potraiters", icon: "youtube" },
  { name: "X (Twitter)", handle: "@potraiters", url: "https://x.com/potraiters", icon: "x" }
];

export const CATEGORIES = [
  { id: "wisuda-indoor", label: "Wisuda Indoor", isHot: true },
  { id: "wisuda-outdoor", label: "Wisuda Outdoor", isHot: false },
  { id: "pasfoto", label: "Pas Foto & ID", isHot: true },
  { id: "selfi", label: "Self Photo", isHot: true },
  { id: "psn", label: "Couple", isHot: false },
  { id: "group", label: "Group & Friendship", isHot: false },
  { id: "frame-cetak", label: "Frame & Cetak", isHot: false },
];

export const PROMO_SPECIAL = {
  id: "wisuda-hemat",
  badge: "🔥 PROMO SPESIAL WISUDA — HEMAT Rp 76.000",
  title: "Wisuda Hemat (Family & Bestie)",
  subtitle: "Penawaran terpopuler untuk wisudawan UNDIP, UNNES, Polines, Udinus & se-Semarang",
  price: "Rp 299.000",
  normalPrice: "Rp 375.000",
  discountPercentage: "Hemat 20%",
  capacity: "Hingga 5 Orang",
  duration: "± 10 Menit",
  outfits: "Wisudawan bebas 2 outfit",
  urgencyNote: "⚡ Slot Terbatas — Segera amankan jadwal sebelum penuh!",
  deliverables: [
    "4 file edit premium beresolusi tinggi",
    "GRATIS 4 cetak 10R+ (20x30 cm)",
    "Seluruh file sesi foto via Google Drive",
    "Bebas 2x ganti outfit wisudawan",
    "Bebas bawa atribut & properti sendiri"
  ],
  whatsappText: "Halo Admin Potrait Studio, saya ingin klaim PROMO SPECIAL Wisuda Hemat Rp299.000. Mohon info ketersediaan slot tanggal & jam..."
};

export const PORTFOLIO_ITEMS = [
  {
    id: "port-1",
    category: "wisuda-indoor",
    title: "Wisuda Keluarga & Sahabat",
    location: "Studio Indoor Tembalang",
    image: "/potrait-foto-keluarga-eksklusif-676x845.jpg"
  },
  {
    id: "port-2",
    category: "pasfoto",
    title: "Pas Foto Resmi CPNS & Buku Nikah",
    location: "Edit Bebas Jerawat 30 Menit",
    image: "/pasfoto-1-472x709.jpg"
  },
  {
    id: "port-3",
    category: "wisuda-indoor",
    title: "Wisuda Solo Platinum",
    location: "Studio Tembalang / Sekaran",
    image: "/potrait-foto-eksklusif-platinum-676x451.jpg"
  },
  {
    id: "port-4",
    category: "wisuda-outdoor",
    title: "Wisuda Outdoor Kampus",
    location: "Spot Kampus UNDIP & UNNES",
    image: "/tips-foto-wisuda-semarang-meta.jpeg"
  },
  {
    id: "port-5",
    category: "psn",
    title: "Couple Studio Photo",
    location: "Sesi Hangat Berdua",
    image: "/rifa-r-8952-1944x1296-800x533.jpg"
  },
  {
    id: "port-6",
    category: "selfi",
    title: "Self Photo Studio",
    location: "Bebas Bergaya Remote Shutter",
    image: "/lala-r-3996-2000x1333.jpg"
  },
  {
    id: "port-7",
    category: "group",
    title: "Friendship & Geng Kuliah",
    location: "Foto Angkatan & Sahabat",
    image: "/rahmatia-r-4577-1944x1296-800x533.jpg"
  },
  {
    id: "port-8",
    category: "frame-cetak",
    title: "Pigura Kayu & Cetak Lab",
    location: "Ukuran 10RSS s.d 24R",
    image: "/lulu-novi-al-8766-10rss-1-1328x1992-800x1200.jpg"
  },
  {
    id: "port-9",
    category: "pasfoto",
    title: "Photo ID Personal & CV",
    location: "Standar Kedutaan & Instansi",
    image: "/pasfoto-4-472x709.jpg"
  }
];

export const PACKAGES_DATA = {
  // 1. WISUDA INDOOR
  "wisuda-indoor": {
    categoryTitle: "Paket Wisuda Indoor (Studio)",
    description: "Sesi foto wisuda di studio dengan pencahayaan profesional, ruang ber-AC, dan backdrop elegan",
    items: [
      {
        id: "wisuda-hemat",
        name: "Wisuda Hemat (Special Offer)",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: true,
        price: "Rp 299.000",
        normalPrice: "Rp 375.000",
        capacity: "Hingga 5 Orang",
        duration: "± 10 Menit",
        outfits: "Wisudawan bebas 2 outfit",
        facilities: [
          "Cocok untuk wisuda bersama keluarga (hingga 5 orang)",
          "Durasi ± 10 menit pemotretan",
          "Wisudawan bebas 2 outfit"
        ],
        deliverables: [
          "4 file edit premium",
          "Gratis 4 cetak 10R+ (20x30 cm)",
          "Seluruh file sesi foto via Google Drive"
        ],
        note: "Hemat Rp76.000 dari harga normal"
      },
      {
        id: "family-favorit",
        name: "Family Graduation: Paket Favorit",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 447.000",
        normalPrice: null,
        capacity: "Hingga 10 Orang",
        duration: "± 20 Menit",
        outfits: "Wisudawan bebas 2 outfit",
        facilities: [
          "Cocok untuk keluarga besar hingga 10 orang",
          "Durasi ± 20 menit (sesi lebih puas & fleksibel)",
          "Wisudawan bebas 2 outfit bergantian"
        ],
        deliverables: [
          "5 file edit premium",
          "4 cetak 10R+ (20x30 cm)",
          "1 cetak 12R + PIGURA PREMIUM",
          "Semua file sesi foto via Google Drive"
        ],
        note: "Paling direkomendasikan & paling sering dibooking wisudawan"
      },
      {
        id: "family-simple",
        name: "Family Graduation: Paket Simple",
        badge: "Ekonomis",
        badgeType: "default",
        isPopular: false,
        price: "Rp 197.000",
        normalPrice: null,
        capacity: "Hingga 5 Orang",
        duration: "± 10 Menit",
        outfits: "1 outfit",
        facilities: [
          "Cocok untuk keluarga kecil hingga 5 orang",
          "Durasi ± 10 menit",
          "Banyak pilihan pose terbaik"
        ],
        deliverables: [
          "2 file edit premium",
          "2 cetak 10R+ (20x30 cm)",
          "File dikirim via WhatsApp"
        ],
        note: "Pilihan cepat & praktis untuk keluarga inti"
      },
      {
        id: "family-eksklusif",
        name: "Family Graduation: Paket Eksklusif",
        badge: "Sultan Premium",
        badgeType: "luxury",
        isPopular: false,
        price: "Rp 1.200.000",
        normalPrice: null,
        capacity: "Hingga 10 Orang",
        duration: "± 40 Menit",
        outfits: "Bebas 3 outfit (wisudawan & keluarga)",
        facilities: [
          "Sesi lebih private & nyaman untuk keluarga besar hingga 10 orang",
          "Wisudawan & keluarga bebas 3 outfit bergantian",
          "Lebih banyak variasi pose dan konsep"
        ],
        deliverables: [
          "6 file edit premium",
          "4 cetak 10R+",
          "1 cetak 12R+",
          "1 cetak 20R+ (50x75 cm) + DOUBLE FRAME PREMIUM",
          "Semua file sesi foto via Google Drive"
        ],
        note: "Hasil super megah siap pajang di ruang tamu"
      }
    ],
    addOns: [
      { name: "Tambah Anggota Keluarga", price: "Rp 10.000 / orang" },
      { name: "Tambah File Edit", price: "Rp 25.000 / file" },
      { name: "Ganti Outfit / Baju Tambahan", price: "Rp 100.000" },
      { name: "All File Non-Edit", price: "Rp 100.000" }
    ]
  },

  // 2. WISUDA OUTDOOR
  "wisuda-outdoor": {
    categoryTitle: "Paket Wisuda Outdoor (Area Kampus)",
    description: "Sesi foto wisuda di luar ruangan area kampus UNDIP, UNNES, atau spot pilihan di Semarang",
    items: [
      {
        id: "wisuda-outdoor-maxi",
        name: "Wisuda Outdoor: Maxi (60 Menit)",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 650.000",
        normalPrice: null,
        capacity: "1 - 5 Orang",
        duration: "60 Menit",
        outfits: "Konsep Bebas",
        facilities: [
          "1-5 orang (1 wisudawan + 4 pendamping)",
          "Durasi 60 menit sesi pemotretan",
          "Unlimited shoot sepuasnya"
        ],
        deliverables: [
          "All file foto on Google Drive / Foto"
        ],
        note: "Waktu lebih leluasa mengeksplor berbagai spot estetik kampus"
      },
      {
        id: "wisuda-outdoor-medium",
        name: "Wisuda Outdoor: Medium (30 Menit)",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: false,
        price: "Rp 475.000",
        normalPrice: null,
        capacity: "1 - 3 Orang",
        duration: "30 Menit",
        outfits: "Konsep Bebas",
        facilities: [
          "1-3 orang (1 wisudawan + 2 pendamping)",
          "Durasi 30 menit sesi pemotretan",
          "Unlimited shoot di area kampus/outdoor"
        ],
        deliverables: [
          "All file foto on Google Drive / Foto"
        ],
        note: "Spot favorit sekitar kampus UNDIP Tembalang atau UNNES Sekaran"
      }
    ],
    addOns: [
      { name: "Tambah Wisudawan Outdoor", price: "Rp 100.000 / orang" },
      { name: "Tambah Non-Wisudawan Outdoor", price: "Rp 50.000 / orang" },
      { name: "Extra Time Outdoor", price: "Rp 200.000 / 30 menit" },
      { name: "Tambah File Edit", price: "Rp 25.000 / file" }
    ]
  },

  // 3. PAS FOTO & ID
  pasfoto: {
    categoryTitle: "Pas Foto & Photo ID Personal",
    description: "Foto rapi standar instansi untuk Ijazah, CPNS, BUMN, Visa, Paspor, & Buku Nikah",
    items: [
      {
        id: "pasfoto-express",
        name: "Pas Foto Bebas Jerawat: Express",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: true,
        price: "Rp 35.000",
        normalPrice: null,
        capacity: "1 Orang",
        duration: "± 30 Menit",
        outfits: "1 Baju",
        facilities: [
          "1x pose terbaik dengan pencahayaan studio profesional",
          "Edit halus bebas jerawat, noda wajah & perataan warna kulit",
          "Pilihan Background: Gelap, Abu-abu, Putih, Merah, Biru"
        ],
        deliverables: [
          "File master dikirim via WhatsApp (Format Document tanpa kompres)",
          "Bebas pilih Paket Cetak: Set A / B / C / D"
        ],
        note: "Estimasi ± 30 menit langsung jadi, siap dipakai daftar resmi"
      },
      {
        id: "photo-id-2",
        name: "Photo ID Personal: ID 2 (3 Pose)",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 120.000",
        normalPrice: null,
        capacity: "1 Orang",
        duration: "20 Menit",
        outfits: "1 Baju",
        facilities: [
          "3 variasi pilihan pose profesional",
          "Pilihan Background: Merah atau Putih",
          "3 file edit profesional"
        ],
        deliverables: [
          "3 cetak 4R",
          "3 file kirim via WhatsApp"
        ],
        note: "Paling direkomendasikan untuk portofolio CV, LinkedIn, dan karir"
      },
      {
        id: "pasfoto-reguler",
        name: "Pas Foto Bebas Jerawat: Reguler",
        badge: "Ekonomis",
        badgeType: "default",
        isPopular: false,
        price: "Rp 30.000",
        normalPrice: null,
        capacity: "1 Orang",
        duration: "Sesi Cepat",
        outfits: "1 Baju",
        facilities: [
          "1x pose studio profesional",
          "Edit bebas jerawat & kerapian pakaian/rambut",
          "Pilihan background standar instansi"
        ],
        deliverables: [
          "Pilihan Set Cetak (A/B/C/D)",
          "File master digital via WhatsApp"
        ],
        note: "Hasil rapi dan jernih sesuai standar resmi"
      },
      {
        id: "photo-id-1",
        name: "Photo ID Personal: ID 1",
        badge: "Personal",
        badgeType: "default",
        isPopular: false,
        price: "Rp 50.000",
        normalPrice: null,
        capacity: "1 Orang",
        duration: "10 Menit",
        outfits: "1 Baju",
        facilities: [
          "1 pose, 1 baju",
          "Pilihan Background: Merah atau Putih",
          "1 file edit profesional"
        ],
        deliverables: [
          "1 cetak 4R premium",
          "1 file master kirim via WhatsApp"
        ],
        note: "Sangat bagus untuk profil CV atau kartu pengenal"
      }
    ],
    addOns: [
      { name: "Cetak Pas Foto Standar (Express 30 Menit)", price: "Rp 10.000 / set" },
      { name: "Cetak Pas Foto Standar (Reguler H+1)", price: "Rp 8.000 / set" },
      { name: "File Edit ID Tambahan", price: "Rp 35.000 / file" },
      { name: "File Non-Edit ID", price: "Rp 20.000 / file" },
      { name: "Ganti Baju ID Personal", price: "Rp 50.000 / baju" }
    ],
    setOptions: [
      "Set A: 4 pcs ukuran 4x6 cm",
      "Set B: 2 pcs 4x6 cm + 4 pcs 3x4 cm",
      "Set C: 8 pcs ukuran 3x4 cm",
      "Set D: 4 pcs 3x4 cm + 8 pcs 2x3 cm"
    ]
  },

  // 4. SELF PHOTO
  selfi: {
    categoryTitle: "Potrait Self Photo Studio",
    description: "Foto bebas tanpa fotografer menggunakan remote shutter nirkabel di studio privat ber-AC",
    items: [
      {
        id: "selfi-maximal",
        name: "Self Photo Maximal (Hingga 8 Orang)",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 150.000",
        normalPrice: null,
        capacity: "Hingga 8 Orang",
        duration: "15 Menit",
        outfits: "Bebas",
        facilities: [
          "15 menit sesi foto (unlimited shoot)",
          "Kapasitas hingga 8 orang",
          "Bebas gunakan aksesoris lucu di studio"
        ],
        deliverables: [
          "Mendapatkan 4 pcs cetak foto",
          "All softcopy digital langsung didapat"
        ],
        note: "Paling puas & lega untuk rame-rame bareng sahabat"
      },
      {
        id: "selfi-standard",
        name: "Self Photo Standard (Hingga 4 Orang)",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: true,
        price: "Rp 130.000",
        normalPrice: null,
        capacity: "Hingga 4 Orang",
        duration: "10 Menit",
        outfits: "Bebas",
        facilities: [
          "10 menit sesi foto (unlimited shoot)",
          "Kapasitas hingga 4 orang",
          "Bebas gaya & pose sesuka hati"
        ],
        deliverables: [
          "Mendapatkan 2 pcs cetak foto",
          "All softcopy digital"
        ],
        note: "Ideal untuk berdua / berempat"
      },
      {
        id: "selfi-instan",
        name: "Self Photo Instan (5 Menit)",
        badge: "Kilat",
        badgeType: "default",
        isPopular: false,
        price: "Rp 75.000",
        normalPrice: null,
        capacity: "Hingga 4 Orang",
        duration: "5 Menit",
        outfits: "Bebas",
        facilities: [
          "5 menit sesi foto (unlimited shoot)",
          "Kapasitas hingga 4 orang",
          "Private studio box"
        ],
        deliverables: [
          "Mendapatkan 1 pcs cetak foto",
          "All softcopy digital"
        ],
        note: "Sesi kilat untuk foto profil atau konten instan"
      }
    ],
    addOns: [
      { name: "Extra Time 5 Menit", price: "Rp 50.000" },
      { name: "Tambah Orang", price: "Rp 10.000 / orang" },
      { name: "Tambah Cetak Foto", price: "Rp 10.000 / lembar" }
    ]
  },

  // 5. COUPLE
  psn: {
    categoryTitle: "Paket Couple Studio",
    description: "Khusus pasangan untuk pra-nikah, buku nikah, engagement, anniversary, atau momen berdua",
    items: [
      {
        id: "psn-sayang",
        name: "Couple: Sayang",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 499.000",
        normalPrice: "Rp 700.000",
        capacity: "2 Orang (Couple)",
        duration: "30x Shoots",
        outfits: "2x Baju",
        facilities: [
          "30x shoot pemotretan terarah",
          "5x edit foto gaya estetik",
          "Bebas 2x ganti baju",
          "GRATIS 2 paket pasfoto buku nikah"
        ],
        deliverables: [
          "4x cetak 4R",
          "1x cetak 16RSS + FRAME 16RSS",
          "All File via Google Drive"
        ],
        note: "Paling recommended, sudah termasuk bingkai besar 16RSS & pasfoto nikah"
      },
      {
        id: "psn-cinta",
        name: "Couple: Cinta",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: false,
        price: "Rp 449.000",
        normalPrice: "Rp 500.000",
        capacity: "2 Orang (Couple)",
        duration: "20x Shoots",
        outfits: "1x Baju",
        facilities: [
          "20x shoot pemotretan",
          "5x edit foto gaya",
          "1x baju",
          "GRATIS 2 paket pasfoto buku nikah"
        ],
        deliverables: [
          "4x cetak 4R",
          "1x cetak 12RSS + FRAME 12RSS",
          "All File via Google Drive"
        ],
        note: "Termasuk frame elegan 12RSS"
      },
      {
        id: "psn-si-dia",
        name: "Couple: Si Dia",
        badge: "Hemat",
        badgeType: "default",
        isPopular: false,
        price: "Rp 249.000",
        normalPrice: "Rp 300.000",
        capacity: "2 Orang (Couple)",
        duration: "15x Shoots",
        outfits: "1x Baju",
        facilities: [
          "15x shoot pemotretan",
          "3x edit foto gaya",
          "1x baju",
          "GRATIS 2 paket pasfoto buku nikah"
        ],
        deliverables: [
          "3x cetak 4R",
          "All File via Google Drive"
        ],
        note: "Praktis untuk kebutuhan syarat nikah & foto couple"
      }
    ],
    addOns: [
      { name: "File Edit Tambahan", price: "Rp 25.000 / file" },
      { name: "Tambah Baju (Termasuk ekstra 10x shoot)", price: "Rp 100.000" },
      { name: "Atribut Wisuda", price: "Rp 75.000 / orang" }
    ]
  },

  // 6. GROUP & FRIENDSHIP
  group: {
    categoryTitle: "Paket Group & Friendship (Minimal 10 Orang)",
    description: "Sesi foto geng kampus, kosan, organisasi, atau angkatan",
    items: [
      {
        id: "frenship-1",
        name: "Frenship 1",
        badge: "Paling Direkomendasikan",
        badgeType: "recommended",
        isPopular: true,
        price: "Rp 30.000",
        priceSuffix: "/ orang",
        normalPrice: null,
        capacity: "Min. 10 Orang",
        duration: "30x Shoots (Maks 30 Menit)",
        outfits: "2x Baju",
        facilities: [
          "30x shoot pemotretan (maks 30 menit)",
          "Bebas 2x ganti baju",
          "5x edit file master"
        ],
        deliverables: [
          "5x cetak 4R per orang",
          "Semua file + 5 file edit via Google Drive",
          "BONUS: 1x cetak 12R (30x40 cm)"
        ],
        note: "Masing-masing dapat cetakan 4R + bonus cetak 12R untuk grup"
      },
      {
        id: "frenship-2",
        name: "Frenship 2",
        badge: "Paling Laris",
        badgeType: "bestseller",
        isPopular: false,
        price: "Rp 25.000",
        priceSuffix: "/ orang",
        normalPrice: null,
        capacity: "Min. 10 Orang",
        duration: "20x Shoots (Maks 20 Menit)",
        outfits: "1x Baju",
        facilities: [
          "20x shoot pemotretan (maks 20 menit)",
          "1x baju",
          "3x edit file"
        ],
        deliverables: [
          "3x cetak 4R per orang",
          "Semua file + 3 file edit via Google Drive",
          "BONUS: 1x cetak 10RSS (20x30 cm)"
        ],
        note: "Sangat pas untuk kenangan satu angkatan/divisi"
      },
      {
        id: "frenship-3",
        name: "Frenship 3",
        badge: "Super Hemat",
        badgeType: "default",
        isPopular: false,
        price: "Rp 15.000",
        priceSuffix: "/ orang",
        normalPrice: null,
        capacity: "Min. 10 Orang",
        duration: "15x Shoots (Maks 10 Menit)",
        outfits: "1x Baju",
        facilities: [
          "15x shoot pemotretan (maks 10 menit)",
          "1x baju",
          "1x edit file"
        ],
        deliverables: [
          "1x cetak 10RSS untuk grup",
          "Semua file + 1 file edit via Google Drive"
        ],
        note: "Paling murah, hanya Rp15k/orang!"
      }
    ],
    addOns: [
      { name: "Ganti Baju (Extra 10 shoots)", price: "Rp 100.000" },
      { name: "File Edit Tambahan", price: "Rp 25.000 / file" }
    ]
  },

  // 7. FRAME & CETAK
  "frame-cetak": {
    categoryTitle: "Pricelist Frame & Cetak Foto",
    description: "Kualitas lab foto dengan kertas doff tahan lama & pilihan pigura eksklusif",
    frameCategories: [
      {
        type: "Frame LDB (Premium Block Frame)",
        sizes: [
          { size: "16RSS (40x60 cm)", price: "Rp 450.000" },
          { size: "20R (50x60 cm)", price: "Rp 495.000" },
          { size: "20RSS (50x75 cm)", price: "Rp 520.000" },
          { size: "24R (60x90 cm)", price: "Rp 715.000" },
        ]
      },
      {
        type: "Frame Mocca (Elegan & Hangat)",
        sizes: [
          { size: "16RSS (40x60 cm)", price: "Rp 380.000" },
          { size: "20R (50x60 cm)", price: "Rp 425.000" },
          { size: "20RSS (50x75 cm)", price: "Rp 460.000" },
          { size: "24R (60x90 cm)", price: "Rp 675.000" },
        ]
      },
      {
        type: "Frame 4040 KT / 645 CK (Minimalis Modern)",
        sizes: [
          { size: "16RSS (40x60 cm)", price: "Rp 355.000" },
          { size: "20R (50x60 cm)", price: "Rp 380.000" },
          { size: "20RSS (50x75 cm)", price: "Rp 435.000" },
          { size: "24R (60x90 cm)", price: "Rp 650.000" },
        ]
      }
    ],
    printOnlyList: [
      { size: "Polaroid", doff: "Rp 3.500", laminated: "-" },
      { size: "2R (6x9 cm)*", doff: "Rp 5.000", laminated: "Rp 7.000" },
      { size: "3R (9x13 cm)*", doff: "Rp 2.500", laminated: "Rp 5.000" },
      { size: "4R (10x15 cm)*", doff: "Rp 2.500", laminated: "Rp 5.000" },
      { size: "5R (13x18 cm)*", doff: "Rp 5.500", laminated: "Rp 9.000" },
      { size: "6R (15x20 cm)*", doff: "Rp 7.500", laminated: "Rp 12.000" },
      { size: "10R (20x25 cm)", doff: "Rp 12.500", laminated: "Rp 20.000" },
      { size: "10RS (20x30 cm)", doff: "Rp 15.000", laminated: "Rp 23.000" },
      { size: "12R (30x40 cm)", doff: "Rp 50.000", laminated: "Rp 65.000" },
      { size: "12RS (30x45 cm)", doff: "Rp 65.000", laminated: "Rp 85.000" },
      { size: "16R (40x50 cm)", doff: "Rp 90.000", laminated: "Rp 120.000" },
      { size: "16RS (40x60 cm)", doff: "Rp 110.000", laminated: "Rp 145.000" },
      { size: "20R (50x60 cm)", doff: "Rp 120.000", laminated: "Rp 165.000" },
      { size: "20RS (50x75 cm)", doff: "Rp 160.000", laminated: "Rp 215.000" },
      { size: "24R (60x90 cm)", doff: "Rp 210.000", laminated: "Rp 295.000" },
    ],
    printNote: "*Catatan: Cetak ukuran 2R sampai 6R minimal pemesanan 2 lembar."
  }
};

export const FAQS = [
  {
    question: "Bagaimana cara booking sesi foto di Potrait Studio?",
    answer: "Sangat mudah! Pilih paket yang Anda inginkan di tab 'Pricelist', lalu ketuk tombol 'Pesan WA' atau 'Pilih Jam'. Pesan otomatis akan terisi dengan nama paket, cabang, dan jam yang dipilih."
  },
  {
    question: "Apakah bisa langsung datang (walk-in) tanpa booking?",
    answer: "Bisa untuk Pas Foto dan Self Photo jika slot sedang kosong. Namun untuk Paket Wisuda, Couple, dan Group, kami sangat menyarankan reservasi terlebih dahulu agar jam pemotretan Anda terjamin."
  },
  {
    question: "Kapan file softcopy dan hasil cetak selesai?",
    answer: "Seluruh file original (all unedited softcopy) dikirimkan di HARI YANG SAMA setelah sesi pemotretan via Google Drive. Untuk foto edit, estimasi pengerjaan 2–4 hari kerja, dan cetak frame selesai 2–3 hari setelah acc file."
  },
  {
    question: "Di mana saja 3 cabang Potrait Studio di Semarang?",
    answer: "Cabang kami berada di: (1) Ruko BQ Square Tembalang (dekat UNDIP), (2) Ruko Dahlia Jl. Prof. Soedarto Tembalang, dan (3) Jl. Taman Siswa Sekaran Gunungpati (dekat UNNES)."
  },
  {
    question: "Apakah boleh membawa pakaian / outfit ganti dan properti sendiri?",
    answer: "Tentu boleh! Sesuai paket yang dipilih, Anda bisa membawa kostum ganti, selempang wisuda, bunga, atau balon sendiri. Asisten studio siap membantu mengarahkan pose terbaik Anda."
  }
];
