// Semua panggilan ke API DragGarage dikumpulkan di sini.
// URL dasar dibaca dari env VITE_API_URL (lihat .env.example).
const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');

// Susun query string dan buang parameter yang kosong
function qs(params = {}) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
}

// Fungsi dasar: kirim request, kembalikan field "data" atau lempar Error berpesan jelas
async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      // Header JSON hanya dikirim saat ada body (menghindari preflight CORS pada GET)
      ...(body ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet kamu.');
  }

  let json = null;
  try {
    json = await res.json();
  } catch {
    /* respons bukan JSON */
  }

  if (!res.ok || !json?.success) {
    const detail = Array.isArray(json?.data) ? `: ${json.data.join(', ')}` : '';
    throw new Error((json?.message || `Permintaan gagal (${res.status})`) + detail);
  }
  return json.data;
}

// Motor
export const getMotors = (params) => request(`/api/motors${qs(params)}`);
export const getMotor = (id) => request(`/api/motors/${id}`);
export const createMotor = (payload) => request('/api/motors', { method: 'POST', body: payload });

// Trek
export const getTracks = () => request('/api/tracks');

// Hasil balap / leaderboard
export const getResults = (params) => request(`/api/results${qs(params)}`);
export const getResult = (id) => request(`/api/results/${id}`);
export const createResult = (payload) => request('/api/results', { method: 'POST', body: payload });
