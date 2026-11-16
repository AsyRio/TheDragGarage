import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMotors, getTracks, getResults } from '../services/api';
import { trackUtama, sapaan } from '../utils/format';
import MotorCard from '../components/MotorCard';
import ResultItem from '../components/ResultItem';
import { Loading, ErrorMessage, Empty } from '../components/Status';

// Beranda: sapaan, ringkasan, top 3 leaderboard, motor unggulan
export default function Home() {
  const { data, loading, error, reload } = useFetch(async () => {
    const [motors, tracks] = await Promise.all([getMotors(), getTracks()]);
    const track = trackUtama(tracks);
    const results = track ? await getResults({ track_id: track.id }) : [];
    return { motors, tracks, track, results };
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const { motors, tracks, track, results } = data;
  // Motor unggulan = tenaga (HP) terbesar
  const unggulan = [...motors].sort((a, b) => b.horsepower - a.horsepower)[0];

  return (
    <>
      <header className="hero">
        <p className="hero-greet">{sapaan()}, Pembalap!</p>
        <h1 className="page-title">DragGarage</h1>
        <p className="page-sub">Katalog motor dan leaderboard balap pendamping game Indonesian Drag Race.</p>
      </header>

      <section className="stat-grid" aria-label="Ringkasan">
        <div className="card stat"><strong>{motors.length}</strong><span>Motor</span></div>
        <div className="card stat"><strong>{tracks.length}</strong><span>Trek</span></div>
      </section>

      <section>
        <div className="section-head">
          <h2>Top 3 {track ? `· ${track.name}` : ''}</h2>
          <Link to="/leaderboard">Lihat semua</Link>
        </div>
        {results.length === 0 ? (
          <Empty title="Belum ada hasil balap" text="Tambahkan hasil pertama di halaman Leaderboard." />
        ) : (
          <div className="list">
            {results.slice(0, 3).map((r, i) => <ResultItem key={r.id} result={r} rank={i + 1} />)}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <h2>Motor unggulan</h2>
          <Link to="/motors">Semua motor</Link>
        </div>
        {unggulan ? <MotorCard motor={unggulan} featured /> : <Empty title="Belum ada motor" />}
      </section>
    </>
  );
}
