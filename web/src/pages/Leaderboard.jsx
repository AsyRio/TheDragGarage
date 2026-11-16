import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getMotors, getTracks, getResults } from '../services/api';
import { trackUtama } from '../utils/format';
import ResultItem from '../components/ResultItem';
import ResultForm from '../components/ResultForm';
import { Loading, ErrorMessage, Empty } from '../components/Status';

// LIST #2: leaderboard per trek, urut ET tercepat, plus form tambah hasil
export default function Leaderboard() {
  const tracksQ = useFetch(getTracks);
  const motorsQ = useFetch(() => getMotors());
  const [trackId, setTrackId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('');

  const tracks = tracksQ.data || [];
  // Trek aktif: pilihan user, atau trek utama (402 m) sebagai default
  const activeId = trackId ?? trackUtama(tracks)?.id ?? null;
  const activeTrack = tracks.find((t) => t.id === activeId);

  const resultsQ = useFetch(
    () => (activeId ? getResults({ track_id: activeId }) : Promise.resolve([])),
    [activeId]
  );

  // Setelah hasil tersimpan: tutup form, tampilkan trek hasil itu, muat ulang daftar
  const setelahSimpan = (created) => {
    setShowForm(false);
    setNotice('Hasil balap berhasil ditambahkan.');
    if (created.track_id === activeId) resultsQ.reload();
    else setTrackId(created.track_id);
  };

  if (tracksQ.error) return <ErrorMessage message={tracksQ.error} onRetry={tracksQ.reload} />;
  if (tracksQ.loading) return <Loading />;

  return (
    <>
      <h1 className="page-title">Leaderboard</h1>
      <p className="page-sub">Peringkat berdasarkan elapsed time (ET) tercepat di setiap trek.</p>

      {tracks.length === 0 ? (
        <Empty title="Belum ada trek" />
      ) : (
        <>
          <div className="chips" role="group" aria-label="Pilih trek">
            {tracks.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`chip ${t.id === activeId ? 'active' : ''}`}
                onClick={() => { setTrackId(t.id); setNotice(''); }}
              >
                {t.distance_m} m
              </button>
            ))}
          </div>
          {activeTrack && (
            <p className="track-info"><strong>{activeTrack.name}</strong> · {activeTrack.difficulty}</p>
          )}

          {notice && <p className="notice" role="status">{notice}</p>}

          {showForm ? (
            <ResultForm
              motors={motorsQ.data || []}
              tracks={tracks}
              defaultTrackId={activeId}
              onSaved={setelahSimpan}
              onCancel={() => setShowForm(false)}
            />
          ) : (
            <button
              type="button"
              className="btn btn-block"
              disabled={!motorsQ.data?.length}
              onClick={() => { setShowForm(true); setNotice(''); }}
            >
              + Tambah Hasil
            </button>
          )}
          {motorsQ.error && <p className="form-error">Daftar motor gagal dimuat: {motorsQ.error}</p>}

          {resultsQ.error ? (
            <ErrorMessage message={resultsQ.error} onRetry={resultsQ.reload} />
          ) : resultsQ.loading && !resultsQ.data ? (
            <Loading />
          ) : resultsQ.data.length === 0 ? (
            <Empty title="Belum ada hasil di trek ini" text="Jadilah yang pertama mencatat waktu." />
          ) : (
            <div className={`list ${resultsQ.loading ? 'is-loading' : ''}`}>
              {resultsQ.data.map((r, i) => <ResultItem key={r.id} result={r} rank={i + 1} />)}
            </div>
          )}
        </>
      )}
    </>
  );
}
