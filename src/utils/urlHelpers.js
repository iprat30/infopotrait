/**
 * URL & Subdomain Helper for Potrait Studio
 * Mendeteksi apakah pengunjung mengakses via subdomain cetak atau link khusus cetak pasfoto
 */

export function checkIsCetakRequested() {
  if (typeof window === 'undefined') return false;

  try {
    const hostname = (window.location.hostname || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    const pathname = (window.location.pathname || '').toLowerCase();

    // 1. Deteksi Subdomain: misal cetak.potrait.id, cetak.potraitstudio.com, cetak.localhost
    if (
      hostname.startsWith('cetak.') ||
      hostname.includes('.cetak.') ||
      hostname.includes('cetak-pasfoto')
    ) {
      return true;
    }

    // 2. Deteksi Query Parameter: ?layanan=cetak, ?kategori=pasfoto, ?cetak=true, ?cetak
    const params = new URLSearchParams(window.location.search);
    if (
      params.get('layanan') === 'cetak' ||
      params.get('layanan') === 'pasfoto' ||
      params.get('kategori') === 'pasfoto' ||
      params.get('kategori') === 'cetak' ||
      params.get('menu') === 'cetak' ||
      params.has('cetak')
    ) {
      return true;
    }

    // 3. Deteksi Pathname & Hash: /cetak, /#cetak, #cetak-pasfoto
    if (
      pathname === '/cetak' ||
      pathname === '/cetak-pasfoto' ||
      hash === '#cetak' ||
      hash === '#cetak-pasfoto'
    ) {
      return true;
    }
  } catch (err) {
    console.error('Gagal membaca URL subdomain/param:', err);
  }

  return false;
}

/**
 * Menghasilkan link langsung ke Cetak Pas Foto yang siap dibagikan ke klien
 */
export function getCetakShareUrl() {
  if (typeof window === 'undefined') return 'https://potrait.id/?layanan=cetak';

  const origin = window.location.origin;
  const hostname = window.location.hostname;

  // Jika sudah berada di subdomain cetak.*
  if (hostname.startsWith('cetak.')) {
    return `${origin}/`;
  }

  // Standar universal: link dengan query parameter yang bisa langsung dibuka di browser manapun
  return `${origin}/?layanan=cetak`;
}
