import { useState } from 'react';
import { createResult } from '../services/api';

// Form sederhana untuk menambah hasil balap (POST ke API)
export default function ResultForm({ motors, tracks, defaultTrackId, onSaved, onCancel }) {
  const [form, setForm] = useState({
    player_name: '',
    motor_id: motors[0]?.id || '',
    track_id: defaultTrackId || tracks[0]?.id || '',
    reaction_time_ms: '',
    elapsed_time_s: '',
    top_speed_kmh: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const ubah = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const kirim = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const created = await createResult({
        ...form,
        player_name: form.player_name.trim(),
        reaction_time_ms: Number(form.reaction_time_ms),
        elapsed_time_s: Number(form.elapsed_time_s),
        top_speed_kmh: Number(form.top_speed_kmh),
      });
      onSaved(created);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="card form" onSubmit={kirim}>
      <h2>Tambah Hasil</h2>

      <label className="field">
        <span>Nama pemain</span>
        <input name="player_name" value={form.player_name} onChange={ubah} maxLength={40} required />
      </label>

      <label className="field">
        <span>Motor</span>
        <select name="motor_id" value={form.motor_id} onChange={ubah} required>
          {motors.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Trek</span>
        <select name="track_id" value={form.track_id} onChange={ubah} required>
          {tracks.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.distance_m} m)</option>)}
        </select>
      </label>

      <div className="field-row">
        <label className="field">
          <span>Reaksi (ms)</span>
          <input name="reaction_time_ms" type="number" min="0" step="1" inputMode="numeric" value={form.reaction_time_ms} onChange={ubah} required />
        </label>
        <label className="field">
          <span>ET (detik)</span>
          <input name="elapsed_time_s" type="number" min="0.01" step="0.01" inputMode="decimal" value={form.elapsed_time_s} onChange={ubah} required />
        </label>
        <label className="field">
          <span>Top speed (km/j)</span>
          <input name="top_speed_kmh" type="number" min="1" step="1" inputMode="numeric" value={form.top_speed_kmh} onChange={ubah} required />
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </form>
  );
}
