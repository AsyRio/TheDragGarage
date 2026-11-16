import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

// Kerangka halaman: konten + bottom nav + banner offline
export default function Layout() {
  const { pathname } = useLocation();
  const [online, setOnline] = useState(navigator.onLine);

  // Pantau status koneksi
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  // Kembali ke atas setiap pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      {!online && <div className="offline-banner" role="status">Mode offline: menampilkan data tersimpan</div>}
      <main className="page">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
