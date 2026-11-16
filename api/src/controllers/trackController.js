// Controller trek: validasi input, panggil model, kirim respons
const trackModel = require('../models/trackModel');
const validate = require('../utils/validate');
const { sendSuccess, sendError } = require('../utils/response');

// Aturan validasi field trek
const rules = {
  name: { type: 'string', required: true },
  distance_m: { type: 'int', required: true, min: 1 },
  difficulty: { type: 'string' },
  description: { type: 'string' },
};

exports.getAll = async (req, res) => {
  const data = await trackModel.findAll();
  return sendSuccess(res, data, 'Daftar trek berhasil diambil');
};

exports.getById = async (req, res) => {
  const data = await trackModel.findById(req.params.id);
  if (!data) return sendError(res, 404, 'Trek tidak ditemukan');
  return sendSuccess(res, data, 'Detail trek berhasil diambil');
};

exports.create = async (req, res) => {
  const { errors, data } = validate(req.body, rules);
  if (errors.length) return sendError(res, 400, 'Validasi gagal', errors);
  const created = await trackModel.create(data);
  return sendSuccess(res, created, 'Trek berhasil ditambahkan', 201);
};

exports.update = async (req, res) => {
  const { errors, data } = validate(req.body, rules, true);
  if (errors.length) return sendError(res, 400, 'Validasi gagal', errors);
  const updated = await trackModel.update(req.params.id, data);
  if (!updated) return sendError(res, 404, 'Trek tidak ditemukan');
  return sendSuccess(res, updated, 'Trek berhasil diperbarui');
};

exports.remove = async (req, res) => {
  const removed = await trackModel.remove(req.params.id);
  if (!removed) return sendError(res, 404, 'Trek tidak ditemukan');
  return sendSuccess(res, removed, 'Trek berhasil dihapus');
};
