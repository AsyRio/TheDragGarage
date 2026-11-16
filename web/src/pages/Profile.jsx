import { profile } from '../config/profile';

// Teknologi yang dipakai (ditampilkan sebagai chip)
const TEKNOLOGI = [
  'React', 'Vite', 'React Router', 'vite-plugin-pwa', 'Workbox',
  'Node.js', 'Express', 'Supabase (PostgreSQL)', 'Vercel',
];

// Profil / About: tentang aplikasi, teknologi, info pembuat
export default function Profile() {
  return (
    <>
      <h1 className="page-title">Profil</h1>
      <p className="page-sub">Tentang aplikasi dan pembuatnya.</p>

      <section className="card">
        <h2>Tentang DragGarage</h2>
        <p className="desc">
          DragGarage adalah aplikasi pendamping untuk game drag race motor 2D buatan saya,
          <em> Indonesian Drag Race</em>, yang dibuat dengan Godot. Aplikasi ini menampilkan katalog
          motor dan leaderboard hasil balap.
        </p>
        <p className="desc">
          Game-nya belum dipublikasikan, jadi aplikasi ini berdiri sendiri dan datanya berasal dari
          data contoh (seed) yang diekspor dari game. Motor dan sprite berasal dari game, sedangkan angka
          cc, tenaga, bobot, dan top speed adalah estimasi dari stat di game.
        </p>
      </section>

      <section className="card">
        <h2>Teknologi</h2>
        <div className="badges">
          {TEKNOLOGI.map((t) => <span key={t} className="badge">{t}</span>)}
        </div>
      </section>

      <section className="card">
        <h2>Info pembuat</h2>
        <dl className="info-list">
          <div><dt>Nama</dt><dd>{profile.nama}</dd></div>
          <div><dt>NIM</dt><dd>{profile.nim}</dd></div>
          <div><dt>Kampus</dt><dd>{profile.kampus}</dd></div>
          <div><dt>Mata kuliah</dt><dd>{profile.mataKuliah}</dd></div>
          <div><dt>Email</dt><dd>{profile.email}</dd></div>
          <div><dt>GitHub</dt><dd><a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></dd></div>
        </dl>
      </section>

      <p className="muted small center">DragGarage v1.0 · Tugas Akhir Praktikum PPB 2026</p>
    </>
  );
}
