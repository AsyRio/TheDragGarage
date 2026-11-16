// Bar spesifikasi: nilai dibandingkan dengan batas maksimum acuan (max)
export default function SpecBar({ label, value, unit, max }) {
  const persen = Math.min(100, Math.round((Number(value) / max) * 100));
  return (
    <div className="spec">
      <div className="spec-head">
        <span>{label}</span>
        <strong>{value} {unit}</strong>
      </div>
      <div className="spec-track">
        <div className="spec-fill" style={{ width: `${persen}%` }} />
      </div>
    </div>
  );
}
