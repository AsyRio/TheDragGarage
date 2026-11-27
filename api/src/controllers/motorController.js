// Controller motor: validasi input, panggil model, kirim respons
const motorModel = require('../models/motorModel');
const validate = require('../utils/validate');
const { sendSuccess, sendError } = require('../utils/response');

// Aturan validasi field motor
const rules = {
  name: { type: 'string', required: true },
  tier: { type: 'string', required: true, oneOf: ['Starter', 'Street', 'Pro'] },
  transmission: { type: 'string', required: true, oneOf: ['matic', 'manual'] },
  cc: { type: 'int', required: true, min: 1 },
  horsepower: { type: 'number', required: true, min: 0.1 },
  weight_kg: { type: 'number', required: true, min: 1 },
  top_speed_kmh: { type: 'int', required: true, min: 1 },
  price: { type: 'int', required: true, min: 0 },
  description: { type: 'string' },
  image_url: { type: 'string' },
};

// Buat image_url otomatis dari nama bila tidak diisi: "CB150 Verza" -> /motors/cb150-verza.png
const defaultImage = (name) => `/motors/${name.toLowerCase().replace(/\s+/g, '-')}.png`;

exports.getAll = async (req, res) => {
  const { search, transmission } = req.query;
  if (transmission && !['matic', 'manual'].includes(transmission)) {
    return sendError(res, 400, 'transmission harus matic atau manual');
  }
  const data = await motorModel.findAll({ search, transmission });
  return sendSuccess(res, data, 'Daftar motor berhasil diambil');
};

exports.getById = async (req, res) => {
  const data = await motorModel.findById(req.params.id);
  if (!data) return sendError(res, 404, 'Motor tidak ditemukan');
  return sendSuccess(res, data, 'Detail motor berhasil diambil');
};

exports.create = async (req, res) => {
  const { errors, data } = validate(req.body, rules);
  if (errors.length) return sendError(res, 400, 'Validasi gagal', errors);
  if (!data.image_url) data.image_url = defaultImage(data.name);
  const created = await motorModel.create(data);
  return sendSuccess(res, created, 'Motor berhasil ditambahkan', 201);
};

exports.update = async (req, res) => {
  const { errors, data } = validate(req.body, rules, true);
  if (errors.length) return sendError(res, 400, 'Validasi gagal', errors);
  const updated = await motorModel.update(req.params.id, data);
  if (!updated) return sendError(res, 404, 'Motor tidak ditemukan');
  return sendSuccess(res, updated, 'Motor berhasil diperbarui');
};

exports.remove = async (req, res) => {
  const removed = await motorModel.remove(req.params.id);
  if (!removed) return sendError(res, 404, 'Motor tidak ditemukan');
  return sendSuccess(res, removed, 'Motor berhasil dihapus');
};
