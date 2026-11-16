import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getResult } from '../services/api';
import { formatET, formatMs, formatKmh } from '../utils/format';
import MotorImage from '../components/MotorImage';
import { Loading, ErrorMessage } from '../components/Status';

// Detail hasil balap: pemain, motor, trek, waktu reaksi, ET, top speed
export default function ResultDetail() {
  const { id } = useParams();
  const { data: r, loading, error, reload } = useFetch(() => getResult(id), [id]);

  const kembali = <Link to="/leaderboard" className="back-link">← Leaderboard</Link>;

  if (loading) return <>{kembali}<Loading /></>;
  if (error) return <>{kembali}<ErrorMessage message={error} onRetry={reload} /></>;

  return (
    <>
      {kembali}
      <h1 className="page-title">{r.player_name}</h1>
      <p className="page-sub">{r.track?.name} · {r.track?.distance_m} m</p>

      <div className="card big-et">
        <span>Elapsed time</span>
        <strong>{formatET(r.elapsed_time_s)}</strong>
      </div>

      <div className="stat-grid">
        <div className="card stat"><strong>{formatMs(r.reaction_time_ms)}</strong><span>Waktu reaksi</span></div>
        <div className="card stat"><strong>{formatKmh(r.top_speed_kmh)}</strong><span>Top speed</span></div>
      </div>

      {r.motor && (
        <Link to={`/motors/${r.motor.id}`} className="card detail-hero">
          <MotorImage src={r.motor.image_url} alt={r.motor.name} className="motor-img--lg" />
          <h2>{r.motor.name}</h2>
          <div className="badges">
            <span className={`badge tier-${r.motor.tier.toLowerCase()}`}>{r.motor.tier}</span>
            <span className="badge trans">{r.motor.transmission}</span>
            <span className="badge">{r.motor.cc} cc</span>
          </div>
          <span className="muted">Lihat detail motor →</span>
        </Link>
      )}

      <p className="muted small">
        Dicatat pada {new Date(r.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
      </p>
    </>
  );
}
