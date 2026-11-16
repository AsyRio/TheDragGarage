// Model dasar: operasi CRUD generik ke satu tabel Supabase.
// Model motor/track/result memakai ini, lalu menambah query khusus.
const supabase = require('../config/supabaseClient');

// Jika Supabase mengembalikan error, lempar agar ditangkap errorHandler
const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

module.exports = function createModel(table, selectClause = '*') {
  return {
    table,
    selectClause,

    // Query dasar untuk daftar; filter/urutan ditambahkan oleh pemanggil
    list: () => supabase.from(table).select(selectClause),

    async findById(id) {
      return unwrap(await supabase.from(table).select(selectClause).eq('id', id).maybeSingle());
    },

    async create(payload) {
      const { id } = unwrap(await supabase.from(table).insert(payload).select('id').single());
      return this.findById(id); // ambil ulang agar hasil join ikut lengkap
    },

    // Mengembalikan null jika id tidak ada
    async update(id, payload) {
      const row = unwrap(await supabase.from(table).update(payload).eq('id', id).select('id').maybeSingle());
      return row ? this.findById(id) : null;
    },

    // Mengembalikan null jika id tidak ada
    async remove(id) {
      return unwrap(await supabase.from(table).delete().eq('id', id).select().maybeSingle());
    },

    run: unwrap,
  };
};
