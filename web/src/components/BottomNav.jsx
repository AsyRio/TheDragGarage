import { Link, useLocation } from 'react-router-dom';

// Ikon inline sederhana (stroke), mengikuti warna teks
const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const items = [
  {
    to: '/', label: 'Beranda', match: (p) => p === '/',
    icon: <Icon><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Icon>,
  },
  {
    to: '/motors', label: 'Motor', match: (p) => p.startsWith('/motors'),
    icon: <Icon><circle cx="6" cy="16" r="3.5" /><circle cx="18" cy="16" r="3.5" /><path d="M6 16l4-6h5l3 6M10 10 9 7H7M15 10l2-3h2" /></Icon>,
  },
  {
    // Detail hasil (/results/:id) termasuk bagian Leaderboard
    to: '/leaderboard', label: 'Leaderboard', match: (p) => p.startsWith('/leaderboard') || p.startsWith('/results'),
    icon: <Icon><path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8M10 17h4" /></Icon>,
  },
  {
    to: '/profile', label: 'Profil', match: (p) => p.startsWith('/profile'),
    icon: <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>,
  },
];

// Navigasi bawah: tetap di bawah layar, 4 menu
export default function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      {items.map((it) => {
        const aktif = it.match(pathname);
        return (
          <Link key={it.to} to={it.to} className={`nav-item ${aktif ? 'active' : ''}`} aria-current={aktif ? 'page' : undefined}>
            {it.icon}
            <span>{it.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
