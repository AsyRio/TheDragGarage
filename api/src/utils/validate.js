// Validasi input sederhana berdasarkan aturan per-field.
// Aturan: { type: 'string' | 'int' | 'number', required, min, oneOf }
// partial = true dipakai untuk PUT (field boleh sebagian saja).
// Mengembalikan { errors, data } dengan data hanya berisi field yang dikenal.
function validate(body, rules, partial = false) {
  const errors = [];
  const data = {};
  const input = body || {};

  for (const [field, rule] of Object.entries(rules)) {
    let value = input[field];
    const kosong = value === undefined || value === null || value === '';

    if (kosong) {
      if (rule.required && !partial) errors.push(`${field} wajib diisi`);
      continue;
    }

    if (rule.type === 'string') {
      if (typeof value !== 'string') {
        errors.push(`${field} harus berupa teks`);
        continue;
      }
      value = value.trim();
      if (rule.required && value === '') {
        errors.push(`${field} tidak boleh kosong`);
        continue;
      }
    } else {
      // Angka bisa datang sebagai string dari form, jadi dikonversi dulu
      const num = Number(value);
      if (!Number.isFinite(num)) {
        errors.push(`${field} harus berupa angka`);
        continue;
      }
      if (rule.type === 'int' && !Number.isInteger(num)) {
        errors.push(`${field} harus berupa bilangan bulat`);
        continue;
      }
      value = num;
    }

    if (rule.min !== undefined && typeof value === 'number' && value < rule.min) {
      errors.push(`${field} minimal ${rule.min}`);
      continue;
    }
    if (rule.oneOf && !rule.oneOf.includes(value)) {
      errors.push(`${field} harus salah satu dari: ${rule.oneOf.join(', ')}`);
      continue;
    }

    data[field] = value;
  }

  if (partial && errors.length === 0 && Object.keys(data).length === 0) {
    errors.push('Tidak ada field yang valid untuk diperbarui');
  }

  return { errors, data };
}

module.exports = validate;
