// Controller hasil balap (leaderboard)
const resultModel = require('../models/resultModel');
const validate = require('../utils/validate');
const { sendSuccess, sendError } = require('../utils/response');

// Aturan validasi field hasil balap
const rules = {
  player_name: { type: 'string', required: true },
  motor_id: { type: 'string', required: true },
  track_id: { type: 'string', required: true },
  reaction_time_ms: { type: 'int', required: true, min: 0 },
  elapsed_time_s: { type: 'number', required: true, min: 0.01 },
  top_speed_kmh: { type: 'int', required: true, min: 1 },
};

exports.getAll = async (req, res) => {
  const { track_id, motor_id } = req.query;
  const data = await resultModel.findAll({ track_id, motor_id });
  return sendSuccess(res, data, 'Leaderboard berhasil diambil');
};

exports.getById = async (req, res) => {
  const data = await resultModel.findById(req.params.id);
  if (!data) return sendError(res, 404, 'Hasil balap tidak ditemukan');
  return sendSuccess(res, data, 'Detail hasil balap berhasil diambil');
};

// motor_id / track_id yang tidak ada ditangkap errorHandler (FK) -> 400
exports.create = async (req, res) => {
  const { errors, data } = validate(req.body, rules);
  if (errors.length) return sendError(res, 400, 'Validasi gagal', errors);
  const created = await resultModel.create(data);
  return sendSuccess(res, created, 'Hasil balap berhasil ditambahkan', 201);
};

exports.remove = async (req, res) => {
  const removed = await resultModel.remove(req.params.id);
  if (!removed) return sendError(res, 404, 'Hasil balap tidak ditemukan');
  return sendSuccess(res, removed, 'Hasil balap berhasil dihapus');
};
