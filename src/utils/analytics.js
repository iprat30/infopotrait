/**
 * Google Analytics 4 (GA4) Tracking Utility
 * Membantu pencatatan event konversi seperti klik WhatsApp, pemilihan paket, dan booking.
 */

export const GA_MEASUREMENT_ID = 'G-1XQFJ4TH34';

/**
 * Mengirim event kustom ke Google Analytics
 * @param {string} action Nama event (misal: 'click_whatsapp', 'view_package')
 * @param {object} params Parameter tambahan untuk event
 */
export function trackEvent(action, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/**
 * Mencatat konversi klik WhatsApp
 * @param {object} options
 * @param {string} options.source Asal tombol (misal: 'floating_cta', 'package_card', 'booking_modal', 'branch_locator')
 * @param {string} [options.packageName] Nama paket yang dipilih jika ada
 * @param {string|number} [options.price] Harga paket jika ada
 * @param {string} [options.branch] Nama cabang jika ada
 */
export function trackWhatsAppClick({ source, packageName = '', price = null, branch = '' } = {}) {
  trackEvent('click_whatsapp', {
    event_category: 'Conversion',
    event_label: packageName ? `${source} - ${packageName}` : source,
    source,
    package_name: packageName,
    value: typeof price === 'number' ? price : undefined,
    currency: 'IDR',
    branch
  });
}
