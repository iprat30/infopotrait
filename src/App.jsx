import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import NavigationSwitcher from './components/NavigationSwitcher';
import PortfolioTicker from './components/PortfolioTicker';
import CategoryTabs from './components/CategoryTabs';
import PackageCard from './components/PackageCard';
import PortfolioGallery from './components/PortfolioGallery';
import FrameAndPrintSection from './components/FrameAndPrintSection';
import BranchLocator from './components/BranchLocator';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingCta from './components/FloatingCta';
import BookingModal from './components/BookingModal';
import PromoHookModal from './components/PromoHookModal';
import PromoDetailModal from './components/PromoDetailModal';
import { PACKAGES_DATA } from './data/packagesData';
import { PlusCircle, CheckCircle2, Flame, Printer } from 'lucide-react';
import { checkIsCetakRequested } from './utils/urlHelpers';

// Categories that trigger faster promo reveal (high-intent visitors)
const HIGH_INTENT_CATEGORIES = ['promo', 'wisuda-indoor', 'wisuda-outdoor', 'group'];
const DEFAULT_REVEAL_DELAY = 30_000;  // 30 sec for normal browsing
const INTENT_REVEAL_DELAY  = 12_000;  // 12 sec for wisuda/family viewers

export default function App() {
  const isCetakInitial = checkIsCetakRequested();
  const [activeTab, setActiveTab] = useState('packages');
  const [selectedCategory, setSelectedCategory] = useState(
    isCetakInitial ? 'pasfoto' : 'wisuda-indoor'
  );
  const [isCetakAutoOpen, setIsCetakAutoOpen] = useState(isCetakInitial);
  const [bookingPackage, setBookingPackage] = useState(null);
  const [showAddOns, setShowAddOns] = useState(false);

  // Pop-up Promo Funnel:
  // Step 1: Hook Pop-up on top of current page
  // Step 2: Full Detail Promo Modal after clicking CTA
  const [showPromoHook, setShowPromoHook] = useState(false);
  const [showPromoDetail, setShowPromoDetail] = useState(false);
  const [promoDismissed, setPromoDismissed] = useState(false);
  const promoTimerRef = useRef(null);
  const promoTriggeredRef = useRef(false);

  // Smart reveal: pops up after visitor browses for a while
  useEffect(() => {
    if (promoTriggeredRef.current || promoDismissed) return;

    clearTimeout(promoTimerRef.current);

    const delay = HIGH_INTENT_CATEGORIES.includes(selectedCategory)
      ? INTENT_REVEAL_DELAY
      : DEFAULT_REVEAL_DELAY;

    promoTimerRef.current = setTimeout(() => {
      if (!promoTriggeredRef.current) {
        promoTriggeredRef.current = true;
        setShowPromoHook(true);
      }
    }, delay);

    return () => clearTimeout(promoTimerRef.current);
  }, [selectedCategory, promoDismissed]);

  const handleClosePromoHook = () => {
    setShowPromoHook(false);
    setPromoDismissed(true);
  };

  const handleClaimPromoCta = () => {
    setShowPromoHook(false);
    setShowPromoDetail(true);
  };



  const currentCategoryData = PACKAGES_DATA[selectedCategory];
  const packagesSectionRef = useRef(null);

  // Jika dibuka via subdomain atau link cetak, otomatis scroll ke paket cetak
  useEffect(() => {
    if (isCetakInitial) {
      const timer = setTimeout(() => {
        if (packagesSectionRef.current) {
          packagesSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isCetakInitial]);

  const handleSelectCategory = (catId) => {
    if (!catId) return;
    if (activeTab !== 'packages') {
      setActiveTab('packages');
    }
    setSelectedCategory(catId);
    setShowAddOns(false);

    // Bawa tampilan layar langsung ke paket yang tersedia secara smooth
    setTimeout(() => {
      if (packagesSectionRef.current) {
        packagesSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-warm-50 text-charcoal flex flex-col antialiased selection:bg-warm-200">
      
      {/* Top Header with Typography Wordmark & Social Media Links */}
      <Header />

      {/* Main Segmented Switcher (Pricelist, Portofolio, 3 Cabang, FAQ) */}
      <NavigationSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {/* VIEW 1: PRICELIST (KARTU & KATEGORI TANPA FOTO, SIMPLE & TERLIHAT SEMUANYA) */}
      {activeTab === 'packages' && (
        <div className="flex-1 flex flex-col">
          {/* Continuous Auto-Running Portfolio Ticker (Hooking visual portfolio right below header, above promo) */}
          <PortfolioTicker
            onSelectCategory={(catId) => {
              if (catId && PACKAGES_DATA[catId]) {
                handleSelectCategory(catId);
              }
            }}
          />


          {/* Simple Category Tabs (All Visible at Once, No Photos) */}
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* Package Content Area */}
          <main
            ref={packagesSectionRef}
            id="packages-section"
            className="flex-1 max-w-xl mx-auto px-4 py-2 w-full space-y-3 scroll-mt-3"
          >
            
            {/* Category Description Banner */}
            {currentCategoryData && (
              <div className="p-3 bg-white rounded-2xl border border-warm-200 shadow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-emerald-500"></span>
                    <h2 className="text-sm font-extrabold text-charcoal tracking-tight">
                      {currentCategoryData.categoryTitle}
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold bg-warm-100 text-charcoal px-2 py-0.5 rounded-full">
                    {selectedCategory === 'frame-cetak' ? 'Koleksi Lab' : `${currentCategoryData.items?.length || 0} Pilihan`}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-700 mt-1 leading-relaxed">
                  {currentCategoryData.description}
                </p>
              </div>
            )}

            {/* Special Frame & Cetak View */}
            {selectedCategory === 'frame-cetak' ? (
              <FrameAndPrintSection />
            ) : (
              /* Standard Packages List (Clean Typography, No Photos on Cards, with Booking Hours) */
              <div className="space-y-3">
                {/* Banner Akses Langsung jika dibuka via Link / Subdomain Cetak */}
                {selectedCategory === 'pasfoto' && isCetakInitial && (
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-300 text-xs shadow-soft flex items-center justify-between animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="relative flex size-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full size-2 bg-amber-500"></span>
                      </span>
                      <span className="font-bold text-amber-950">
                        Akses Langsung: Order Cetak Pas Foto (Kirim File via WA)
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      Aktif
                    </span>
                  </div>
                )}

                {currentCategoryData?.items?.map((item) => (
                  <PackageCard
                    key={item.id}
                    item={item}
                    onOpenBookingModal={(pkg) => setBookingPackage(pkg)}
                    isCetakAutoOpen={isCetakAutoOpen}
                  />
                ))}

                {/* Special Pas Foto Set Options & Color Options */}
                {selectedCategory === 'pasfoto' && currentCategoryData?.setOptions && (
                  <div className="bg-white rounded-2xl p-4 border border-warm-200 text-xs shadow-soft space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-extrabold text-charcoal flex items-center gap-1.5">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0" aria-hidden="true" />
                        <span>Pilihan Paket Cetak Pas Foto (Bebas Pilih):</span>
                      </p>
                      <span className="text-[10px] font-bold bg-warm-100 text-charcoal px-2 py-0.5 rounded-full">
                        Set A - D
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentCategoryData.setOptions.map((opt, oIdx) => (
                        <div key={oIdx} className="bg-warm-50/80 p-2.5 rounded-xl border border-warm-200 flex items-center justify-between">
                          <span className="font-black text-xs text-charcoal bg-white px-2 py-0.5 rounded-md border border-warm-200 shadow-2xs">
                            {opt.code}
                          </span>
                          <span className="font-bold text-[11px] text-charcoal-700">
                            {opt.detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Color Options Highlight */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex items-center gap-2 text-[11px] text-amber-950 font-medium">
                      <span className="size-2 rounded-full bg-amber-500 shrink-0" />
                      <span>
                        <strong>Opsi Cetak:</strong> Bebas pilih <strong>Cetak Warna</strong> atau <strong>Cetak Hitam Putih (B/W)</strong> sesuai kebutuhan resmi instansi/buku nikah/ijazah.
                      </span>
                    </div>
                  </div>
                )}

                {/* Collapsible Add-Ons Section for Current Category */}
                {currentCategoryData?.addOns && currentCategoryData.addOns.length > 0 && (
                  <div className="bg-white rounded-2xl border border-warm-200 overflow-hidden shadow-soft">
                    <button
                      type="button"
                      onClick={() => setShowAddOns(!showAddOns)}
                      className="w-full flex items-center justify-between p-3 text-left text-xs font-bold text-charcoal hover:bg-warm-50 transition-colors"
                      aria-expanded={showAddOns}
                    >
                      <div className="flex items-center gap-1.5">
                        <PlusCircle className="size-3.5 text-warm-800" aria-hidden="true" />
                        <span>Opsi Tambahan (Add-On)</span>
                      </div>
                      <span className="text-[11px] text-warm-800 font-semibold">
                        {showAddOns ? 'Tutup ▲' : 'Buka Rincian ▼'}
                      </span>
                    </button>

                    {showAddOns && (
                      <div className="px-3 pb-3 pt-1 border-t border-warm-100 text-xs divide-y divide-warm-100 animate-fadeIn">
                        {currentCategoryData.addOns.map((addon, aIdx) => (
                          <div key={aIdx} className="py-1.5 flex items-center justify-between text-[11px]">
                            <span className="text-charcoal-700">{addon.name}</span>
                            <span className="font-bold text-charcoal shrink-0 ml-2">{addon.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      )}

      {/* VIEW 2: GALERI DINAMIS PORTOFOLIO */}
      {activeTab === 'portfolio' && (
        <main className="flex-1 w-full animate-fadeIn">
          <PortfolioGallery />
        </main>
      )}

      {/* VIEW 3: LOKASI 3 CABANG STUDIO */}
      {activeTab === 'branches' && (
        <main className="flex-1 w-full animate-fadeIn">
          <BranchLocator />
        </main>
      )}

      {/* VIEW 4: INFO & FAQ */}
      {activeTab === 'faq' && (
        <main className="flex-1 w-full animate-fadeIn">
          <FaqSection />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Fixed Sticky Floating WhatsApp CTA Bar */}
      <FloatingCta />

      {/* Interactive Booking Modal Assistant with Branch Operational Hours */}
      {bookingPackage && (
        <BookingModal
          packageItem={bookingPackage}
          onClose={() => setBookingPackage(null)}
        />
      )}

      {/* Pop-up Promo Step 1: Hook Pop-up on top of the current page */}
      <PromoHookModal
        isOpen={showPromoHook}
        selectedCategory={selectedCategory}
        onClose={handleClosePromoHook}
        onClaimPromo={handleClaimPromoCta}
      />

      {/* Pop-up Promo Step 2: Full Detail Promo Modal */}
      <PromoDetailModal
        isOpen={showPromoDetail}
        onClose={() => setShowPromoDetail(false)}
        onBookWithSchedule={(promoPkg) => setBookingPackage(promoPkg)}
      />

      {/* Subtle Floating Promo Chip (accessible if dismissed or after viewing) */}
      {promoDismissed && !showPromoHook && !showPromoDetail && (
        <button
          type="button"
          onClick={() => setShowPromoDetail(true)}
          className="fixed bottom-[5.5rem] right-3.5 z-50 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-charcoal text-[11px] font-black py-2 px-3.5 rounded-full shadow-elevated border-2 border-white/60 flex items-center gap-1.5 animate-bounce tap-bounce cursor-pointer"
          aria-label="Buka Promo Wisuda Hemat Rp299k"
        >
          <Flame className="size-3.5 fill-charcoal text-charcoal" />
          <span>Promo Rp299k</span>
        </button>
      )}
    </div>

  );
}
