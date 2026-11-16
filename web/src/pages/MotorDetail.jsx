import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getMotor, getResults } from '../services/api';
import { formatPrice } from '../utils/format';
import MotorImage from '../components/MotorImage';
import SpecBar from '../components/SpecBar';
import ResultItem from '../components/ResultItem';
import { Loading, ErrorMessage, Empty } from '../components/Status';

// Hasil terbaik per trek (hasil dari API sudah urut ET tercepat)
function terbaikPerTrek(results) {
  const terlihat = new Set();
  return results
    .filter((r) => !terlihat.has(r.track_id) && terlihat.add(r.track_id))
    .sort((a, b) => a.track_distance_m - b.track_distance_m);
}

// Detail motor: sprite besar, bar spesifikasi, harga, deskripsi, hasil terbaik
export default function MotorDetail() {
  const { id } = useParams();
  const { data, loading, error, reload } = useFetch(async () => {
    const [motor, results] = await Promise.all([getMotor(id), getResults({ motor_id: id })]);
    return { motor, results };
  }, [id]);

  const kembali = <Link to="/motors" className="back-link">← Daftar motor</Link>;

  if (loading) return <>{kembali}<Loading /></>;
  if (error) return <>{kembali}<ErrorMessage message={error} onRetry={reload} /></>;

  const { motor, results } = data;
  const terbaik = terbaikPerTrek(results);

  return (
    <>
      {kembali}
      <div className="card detail-hero">
        <MotorImage src={motor.image_url} alt={motor.name} className="motor-img--lg" />
        <h1>{motor.name}</h1>
        <div className="badges">
          <span className={`badge tier-${motor.tier.toLowerCase()}`}>{motor.tier}</span>
          <span className="badge trans">{motor.transmission}</span>
          <span className="badge">{motor.cc} cc</span>
        </div>
      </div>

      <section className="card">
        <h2>Spesifikasi</h2>
        <SpecBar label="Tenaga" value={motor.horsepower} unit="HP" max={40} />
        <SpecBar label="Bobot" value={motor.weight_kg} unit="kg" max={150} />
        <SpecBar label="Top speed" value={motor.top_speed_kmh} unit="km/j" max={200} />
      </section>

      <section className="card">
        <div className="price-row">
          <span>Harga di game</span>
          <strong className="price">{formatPrice(motor.price)}</strong>
        </div>
        <p className="desc">{motor.description || 'Belum ada deskripsi.'}</p>
      </section>

      <section>
        <div className="section-head"><h2>Hasil balap terbaik</h2></div>
        {terbaik.length === 0 ? (
          <Empty title="Belum ada hasil balap" text="Belum ada pemain yang mencatat waktu dengan motor ini." />
        ) : (
          <div className="list">
            {terbaik.map((r) => <ResultItem key={r.id} result={r} showMotor={false} />)}
          </div>
        )}
      </section>
    </>
  );
}
