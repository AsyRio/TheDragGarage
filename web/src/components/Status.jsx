// Tiga tampilan status yang dipakai semua halaman data: loading, error, kosong

export function Loading({ text = 'Memuat data...' }) {
  return (
    <div className="state" role="status">
      <div className="spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <p className="state-title">Gagal memuat data</p>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Coba lagi
        </button>
      )}
    </div>
  );
}

export function Empty({ title = 'Belum ada data', text }) {
  return (
    <div className="state">
      <p className="state-title">{title}</p>
      {text && <p>{text}</p>}
    </div>
  );
}
