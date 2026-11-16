import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import { getMotors } from '../services/api';
import MotorCard from '../components/MotorCard';
import { Loading, ErrorMessage, Empty } from '../components/Status';

const FILTER = [
  { value: '', label: 'Semua' },
  { value: 'matic', label: 'Matic' },
  { value: 'manual', label: 'Manual' },
];

// LIST #1: daftar motor dengan pencarian dan filter transmisi
export default function Motors() {
  const [search, setSearch] = useState('');
  const [transmission, setTransmission] = useState('');
  const keyword = useDebounce(search.trim(), 300); // tunggu user selesai mengetik

  const { data, loading, error, reload } = useFetch(
    () => getMotors({ search: keyword, transmission }),
    [keyword, transmission]
  );

  return (
    <>
      <h1 className="page-title">Motor</h1>
      <p className="page-sub">Katalog motor dari game Indonesian Drag Race.</p>

      <input
        type="search"
        className="search"
        placeholder="Cari nama motor..."
        aria-label="Cari motor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="chips" role="group" aria-label="Filter transmisi">
        {FILTER.map((f) => (
          <button
            key={f.value}
            type="button"
            className={`chip ${transmission === f.value ? 'active' : ''}`}
            onClick={() => setTransmission(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={reload} />
      ) : loading && !data ? (
        <Loading />
      ) : data.length === 0 ? (
        <Empty title="Motor tidak ditemukan" text="Coba kata kunci atau filter lain." />
      ) : (
        <div className={`list ${loading ? 'is-loading' : ''}`}>
          {data.map((m) => <MotorCard key={m.id} motor={m} />)}
        </div>
      )}
    </>
  );
}
