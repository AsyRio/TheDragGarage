// Skrip sekali jalan: membuat ikon PWA (PNG) dan SVG placeholder sprite motor.
// Jalankan: node scripts/generate-assets.mjs
// Sprite yang sudah ada TIDAK ditimpa, jadi aman setelah kamu mengganti sprite asli.
import { deflateSync, crc32 } from 'node:zlib';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const publicDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(path.join(publicDir, 'icons'), { recursive: true });
mkdirSync(path.join(publicDir, 'motors'), { recursive: true });

/* ---------- Bagian 1: ikon PNG (dibuat tanpa library, murni kode) ---------- */

const BG = [15, 16, 20];
const ORANGE = [249, 115, 22];
const YELLOW = [251, 191, 36];

// Warna satu titik (u, v dalam 0..1): ikon speedometer oranye di latar gelap
function sample(u, v, rounded) {
  if (rounded) {
    // Sudut membulat (transparan di luar)
    const r = 0.22;
    const dx = Math.max(Math.abs(u - 0.5) - (0.5 - r), 0);
    const dy = Math.max(Math.abs(v - 0.5) - (0.5 - r), 0);
    if (Math.hypot(dx, dy) > r) return [0, 0, 0, 0];
  }
  const dx = u - 0.5;
  const dy = v - 0.5;
  const d = Math.hypot(dx, dy);

  // Latar dengan cahaya oranye tipis di tengah
  const glow = Math.max(0, 1 - d / 0.6) * 0.12;
  let c = BG.map((x, i) => x + (ORANGE[i] - x) * glow);

  // Busur speedometer: cincin dengan celah 90 derajat di bawah
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const delta = ((ang - 90 + 540) % 360) - 180;
  if (Math.abs(d - 0.3) < 0.027 && Math.abs(delta) >= 45) c = ORANGE;

  // Jarum penunjuk ke kanan atas
  const a = (-50 * Math.PI) / 180;
  const ex = Math.cos(a) * 0.24;
  const ey = Math.sin(a) * 0.24;
  const t = Math.max(0, Math.min(1, (dx * ex + dy * ey) / (ex * ex + ey * ey)));
  if (Math.hypot(dx - ex * t, dy - ey * t) < 0.022) c = YELLOW;
  if (d < 0.05) c = YELLOW;

  return [...c, 255];
}

// Render dengan anti-aliasing 3x3 per piksel
function render(size, rounded) {
  const buf = Buffer.alloc(size * size * 4);
  const N = 3;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < N; sy++) {
        for (let sx = 0; sx < N; sx++) {
          const [cr, cg, cb, ca] = sample((x + (sx + 0.5) / N) / size, (y + (sy + 0.5) / N) / size, rounded);
          r += cr * ca; g += cg * ca; b += cb * ca; a += ca;
        }
      }
      const i = (y * size + x) * 4;
      if (a > 0) {
        buf[i] = Math.round(r / a); buf[i + 1] = Math.round(g / a); buf[i + 2] = Math.round(b / a);
        buf[i + 3] = Math.round(a / (N * N));
      }
    }
  }
  return buf;
}

// Encoder PNG minimal (RGBA 8-bit)
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, rgba) {
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit, RGBA
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const icons = [
  ['icon-192.png', 192, true],
  ['icon-512.png', 512, true],
  ['maskable-512.png', 512, false], // maskable: latar penuh, OS yang memotong bentuknya
];
for (const [name, size, rounded] of icons) {
  writeFileSync(path.join(publicDir, 'icons', name), encodePng(size, render(size, rounded)));
  console.log('ikon  ->', name);
}

/* ---------- Bagian 2: SVG siluet motor generik (rasio 2:1) ---------- */

const silhouette = (accent) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" role="img" aria-label="Siluet motor">
  <g fill="none" stroke="#9ca3af" stroke-width="5">
    <circle cx="45" cy="68" r="20"/>
    <circle cx="155" cy="68" r="20"/>
  </g>
  <g fill="#9ca3af"><circle cx="45" cy="68" r="4"/><circle cx="155" cy="68" r="4"/></g>
  <g fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M45 68 L84 58"/>
    <path d="M155 68 L133 30"/>
    <path d="M127 27 L142 24"/>
  </g>
  <rect x="84" y="52" width="36" height="18" rx="5" fill="#4b5563"/>
  <path d="M84 45 Q96 34 114 36 Q126 38 131 46 L84 53 Z" fill="${accent}"/>
  <path d="M50 53 Q52 44 66 43 L84 45 L84 53 Z" fill="#e5e7eb"/>
  <circle cx="141" cy="37" r="4" fill="#fde68a"/>
</svg>
`;

// Hanya sprite cadangan. Sprite motor asli (PNG) berasal dari game dan ada di public/motors/
const sprites = [
  ['motor-fallback', '#f97316'], // cadangan jika gambar gagal dimuat
];
for (const [name, accent] of sprites) {
  const file = path.join(publicDir, 'motors', `${name}.svg`);
  if (existsSync(file)) {
    console.log('sprite (sudah ada, dilewati) ->', name);
    continue;
  }
  writeFileSync(file, silhouette(accent));
  console.log('sprite ->', name);
}
