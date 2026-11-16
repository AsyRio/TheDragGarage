import { Link } from 'react-router-dom';

// Halaman untuk alamat yang tidak dikenal
export default function NotFound() {
  return (
    <div className="state">
      <p className="state-title">Halaman tidak ditemukan</p>
      <Link to="/" className="btn">Ke beranda</Link>
    </div>
  );
}
