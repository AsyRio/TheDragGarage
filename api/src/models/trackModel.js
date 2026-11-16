// Model trek: query ke tabel tracks
const createModel = require('./baseModel');

const trackModel = createModel('tracks');

// Semua trek, diurutkan dari jarak terpendek
trackModel.findAll = async () =>
  trackModel.run(await trackModel.list().order('distance_m', { ascending: true }));

module.exports = trackModel;
