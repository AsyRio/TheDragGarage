// Model hasil balap: tabel race_results yang di-join ke motors dan tracks
const createModel = require('./baseModel');

// Relasi FK otomatis di-join oleh Supabase (nested select)
const SELECT = `
  *,
  motors ( id, name, tier, transmission, cc, horsepower, weight_kg, top_speed_kmh, price, description, image_url ),
  tracks ( id, name, distance_m, difficulty, description )
`;

const resultModel = createModel('race_results', SELECT);

// Ratakan hasil join agar mudah dipakai frontend (untuk daftar)
const flatten = ({ motors, tracks, ...row }) => ({
  ...row,
  motor_name: motors?.name ?? null,
  motor_image_url: motors?.image_url ?? null,
  track_name: tracks?.name ?? null,
  track_distance_m: tracks?.distance_m ?? null,
});

// Untuk detail: data motor dan trek lengkap dalam objek terpisah
const nest = ({ motors, tracks, ...row }) => ({ ...row, motor: motors, track: tracks });

// Daftar hasil, urut ET tercepat; filter ?track_id= dan ?motor_id=
resultModel.findAll = async ({ track_id, motor_id } = {}) => {
  let query = resultModel.list().order('elapsed_time_s', { ascending: true });
  if (track_id) query = query.eq('track_id', track_id);
  if (motor_id) query = query.eq('motor_id', motor_id);
  return resultModel.run(await query).map(flatten);
};

// Override agar semua pembacaan satu hasil memakai format detail (nested)
const baseFindById = resultModel.findById.bind(resultModel);
resultModel.findById = async (id) => {
  const row = await baseFindById(id);
  return row ? nest(row) : null;
};

module.exports = resultModel;
