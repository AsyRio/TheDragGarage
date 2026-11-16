// Konfigurasi koneksi ke Supabase (dibuat sekali, dipakai semua model)
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('[config] SUPABASE_URL / SUPABASE_KEY belum diisi di file .env');
}

// Placeholder dipakai agar server tetap bisa start (health check tetap jalan)
// walaupun .env belum diisi; query ke database akan gagal dengan pesan jelas.
const supabase = createClient(
  SUPABASE_URL || 'http://localhost:54321',
  SUPABASE_KEY || 'belum-diisi'
);

module.exports = supabase;
