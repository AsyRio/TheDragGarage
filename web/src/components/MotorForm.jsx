import { useState } from 'react';
import { createMotor } from '../services/api';
import MotorImage from './MotorImage';

const AWAL = {
  name: '',
  tier: 'Starter',
  transmission: 'manual',
  cc: '',
  horsepower: '',
  weight_kg: '',
  top_speed_kmh: '',
  price: '',
  image_url: '',
  description: '',
};

// Field yang harus dikirim sebagai angka
const ANGKA = ['cc', 'horsepower', 'weight_kg', 'top_speed_kmh', 'price'];

// Form untuk menambah motor baru ke katalog (POST ke API)
export default function MotorForm({ onSaved, onCancel }) {
  const [form, setForm] = useState(AWAL);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const ubah = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const kirim = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        name: form.name.trim(),
        image_url: form.image_url.trim(),
        description: form.description.trim(),
      };
      ANGKA.forEach((k) => { payload[k] = Number(payload[k]); });
      onSaved(await createMotor(payload));
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Input angka: atribut yang sama dikumpulkan agar tidak berulang
  const angka = (name, label, props) => (
    <label className="field">
      <span>{label}</span>
      <input name={name} type="number" value={form[name]} onChange={ubah} required {...props} />
    </label>
  );

  return (
    <form className="card form" onSubmit={kirim}>
      <h2>Tambah Motor</h2>

      <label className="field">
        <span>Nama motor</span>
        <input name="name" value={form.name} onChange={ubah} maxLength={40} placeholder="mis. CB150 Verza" required />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Tier</span>
          <select name="tier" value={form.tier} onChange={ubah}>
            <option value="Starter">Starter</option>
            <option value="Street">Street</option>
            <option value="Pro">Pro</option>
          </select>
        </label>
        <label className="field">
          <span>Transmisi</span>
          <select name="transmission" value={form.transmission} onChange={ubah}>
            <option value="manual">Manual</option>
            <option value="matic">Matic</option>
          </select>
        </label>
      </div>

      <div className="field-row">
        {angka('cc', 'CC', { min: 1, step: 1, inputMode: 'numeric' })}
        {angka('horsepower', 'Tenaga (HP)', { min: 0.1, step: 0.1, inputMode: 'decimal' })}
      </div>

      <div className="field-row">
        {angka('weight_kg', 'Bobot (kg)', { min: 1, step: 0.1, inputMode: 'decimal' })}
        {angka('top_speed_kmh', 'Top speed (km/j)', { min: 1, step: 1, inputMode: 'numeric' })}
      </div>

      {angka('price', 'Harga di game (Rp)', { min: 0, max: 2000000000, step: 1, inputMode: 'numeric' })}

      <label className="field">
        <span>Gambar: path atau URL (opsional)</span>
        <input name="image_url" value={form.image_url} onChange={ubah} placeholder="/motors/cb150-verza.png" />
      </label>
      {form.image_url.trim() && <MotorImage src={form.image_url.trim()} alt="Pratinjau gambar motor" />}

      <label className="field">
        <span>Deskripsi (opsional)</span>
        <textarea name="description" value={form.description} onChange={ubah} rows={3} maxLength={300} />
      </label>

      {error && <p className="form-error" role="alert">{error}</p>}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Batal</button>
        <button type="submit" className="btn" disabled={saving}>{saving ? 'Menyimpan...' : 'Simpan'}</button>
      </div>
    </form>
  );
}
