// Model motor: query ke tabel motors
const createModel = require('./baseModel');

const motorModel = createModel('motors');

// Daftar motor dengan pencarian nama (?search=) dan filter transmisi (?transmission=)
motorModel.findAll = async ({ search, transmission } = {}) => {
  let query = motorModel.list().order('name', { ascending: true });
  if (search) query = query.ilike('name', `%${search}%`);
  if (transmission) query = query.eq('transmission', transmission);
  return motorModel.run(await query);
};

module.exports = motorModel;
