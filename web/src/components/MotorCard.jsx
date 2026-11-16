import { Link } from 'react-router-dom';
import MotorImage from './MotorImage';
import { formatKmh } from '../utils/format';

// Kartu motor yang bisa diklik ke halaman detail
export default function MotorCard({ motor, featured = false }) {
  return (
    <Link to={`/motors/${motor.id}`} className={`card motor-card ${featured ? 'featured' : ''}`}>
      <MotorImage src={motor.image_url} alt={motor.name} />
      <div className="motor-card-body">
        <h3>{motor.name}</h3>
        <div className="badges">
          <span className={`badge tier-${motor.tier.toLowerCase()}`}>{motor.tier}</span>
          <span className="badge trans">{motor.transmission}</span>
        </div>
        <dl className="mini-stats">
          <div><dt>CC</dt><dd>{motor.cc}</dd></div>
          <div><dt>HP</dt><dd>{motor.horsepower}</dd></div>
          <div><dt>Top speed</dt><dd>{formatKmh(motor.top_speed_kmh)}</dd></div>
        </dl>
      </div>
    </Link>
  );
}
