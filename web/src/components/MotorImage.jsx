import { useEffect, useState } from 'react';

// SVG siluet generik, dipakai jika sprite motor tidak ada / gagal dimuat
export const FALLBACK_SRC = '/motors/motor-fallback.svg';

// Gambar motor: rasio tetap 2:1, object-fit contain, lazy loading, fallback otomatis
export default function MotorImage({ src, alt = '', className = '' }) {
  const [gagal, setGagal] = useState(false);

  // Reset status gagal jika src berganti (komponen dipakai ulang)
  useEffect(() => setGagal(false), [src]);

  return (
    <div className={`motor-img ${className}`}>
      <img
        src={!src || gagal ? FALLBACK_SRC : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setGagal(true)}
      />
    </div>
  );
}
