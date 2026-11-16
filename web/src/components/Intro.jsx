import { useEffect, useState } from 'react';

const INTRO_KEY = 'draggarage-intro-seen';
const SPRITE = '/motors/crb1000xxx.png';
const FALLBACK = '/motors/motor-fallback.svg';

// Intro perlu tampil? Sekali per sesi, dan tidak untuk pengguna yang mematikan animasi
export function perluIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(INTRO_KEY);
  } catch {
    return true; // storage diblokir: tampilkan saja
  }
}

// Intro: judul DragGarage, motor wheelie, lalu melaju keluar layar -> beranda
export default function Intro({ onDone }) {
  const [siap, setSiap] = useState(false); // animasi mulai setelah gambar termuat
  const [src, setSrc] = useState(SPRITE);

  const selesai = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* abaikan */
    }
    onDone();
  };

  // Pengaman: tutup otomatis jika animasi tidak berjalan sebagaimana mestinya
  useEffect(() => {
    const t = setTimeout(selesai, 9000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`intro ${siap ? 'jalan' : ''}`}
      role="img"
      aria-label="Intro DragGarage"
      // Tutup saat animasi overlay (fade out) selesai, bukan animasi anak-anaknya
      onAnimationEnd={(e) => e.target === e.currentTarget && selesai()}
    >
      <div className="intro-title">
        <h1>Drag<span>Garage</span></h1>
        <p>Katalog motor &amp; leaderboard balap</p>
      </div>

      <div className="intro-stage">
        <div className="intro-lines" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        <div className="intro-road" aria-hidden="true" />
        <div className="intro-bike">
          <img
            src={src}
            alt=""
            onLoad={() => setSiap(true)}
            onError={() => {
              if (src !== FALLBACK) setSrc(FALLBACK);
              else setSiap(true);
            }}
          />
        </div>
      </div>

      <button type="button" className="btn btn-ghost intro-skip" onClick={selesai}>
        Lewati
      </button>
    </div>
  );
}
