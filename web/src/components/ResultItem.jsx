import { Link } from 'react-router-dom';
import MotorImage from './MotorImage';
import { formatET } from '../utils/format';

// Satu baris hasil balap (leaderboard / daftar hasil), bisa diklik ke detail.
// rank: nomor peringkat (opsional). showMotor=false dipakai di halaman detail motor.
export default function ResultItem({ result, rank, showMotor = true }) {
  const sub = showMotor
    ? `${result.motor_name} · ${result.track_name}`
    : `${result.track_name} · ${result.track_distance_m} m`;

  return (
    <Link to={`/results/${result.id}`} className="card result-item">
      {rank != null && <span className={`rank rank-${rank <= 3 ? rank : 'n'}`}>{rank}</span>}
      {showMotor && <MotorImage src={result.motor_image_url} alt={result.motor_name} className="motor-img--sm" />}
      <div className="result-main">
        <strong>{result.player_name}</strong>
        <span className="muted">{sub}</span>
      </div>
      <span className="et">{formatET(result.elapsed_time_s)}</span>
    </Link>
  );
}
