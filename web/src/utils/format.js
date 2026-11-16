// Fungsi pemformat tampilan
export const formatET = (n) => `${Number(n).toFixed(2)} s`;
export const formatMs = (n) => `${n} ms`;
export const formatKmh = (n) => `${n} km/j`;
export const formatPrice = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

// Trek utama untuk ringkasan: 402 m (seperempat mil) jika ada, jika tidak trek pertama.
// Dipakai karena ET antar-trek tidak bisa dibandingkan langsung.
export const trackUtama = (tracks = []) => tracks.find((t) => t.distance_m === 402) || tracks[0] || null;

// Sapaan sesuai jam
export function sapaan(date = new Date()) {
  const j = date.getHours();
  if (j < 11) return 'Selamat pagi';
  if (j < 15) return 'Selamat siang';
  if (j < 18) return 'Selamat sore';
  return 'Selamat malam';
}
