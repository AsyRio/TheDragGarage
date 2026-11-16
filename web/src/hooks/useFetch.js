import { useEffect, useState } from 'react';

// Hook pengambilan data: mengelola data, loading, dan error.
// Data diambil ulang setiap kali isi `deps` berubah atau reload() dipanggil.
export default function useFetch(fetcher, deps = []) {
  const [tick, setTick] = useState(0);
  const [state, setState] = useState({ key: null, data: null, error: null });
  const key = JSON.stringify([...deps, tick]);

  useEffect(() => {
    let batal = false; // cegah set state jika komponen sudah berganti/unmount
    fetcher()
      .then((data) => !batal && setState({ key, data, error: null }))
      .catch((err) => !batal && setState({ key, data: null, error: err.message }));
    return () => {
      batal = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Loading = hasil yang tersimpan belum untuk key saat ini
  const loading = state.key !== key;
  return {
    data: state.data,
    error: loading ? null : state.error,
    loading,
    reload: () => setTick((t) => t + 1),
  };
}
