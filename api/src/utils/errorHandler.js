const { sendError } = require('./response');

// Bungkus handler async agar error otomatis diteruskan ke errorHandler
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Route yang tidak ditemukan -> 404
const notFound = (req, res) => sendError(res, 404, `Route ${req.method} ${req.originalUrl} tidak ditemukan`);

// Penanganan error terpusat (kode error Postgres dipetakan ke status yang tepat)
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.code === '22P02') return sendError(res, 400, 'Format ID tidak valid');
  if (err.code === '23503') return sendError(res, 400, 'motor_id atau track_id tidak ditemukan');
  if (err.code === '23505') return sendError(res, 400, 'Data dengan nama tersebut sudah ada');
  if (err.type === 'entity.parse.failed') return sendError(res, 400, 'Body JSON tidak valid');

  console.error('[error]', err);
  return sendError(res, 500, 'Terjadi kesalahan pada server', { detail: err.message });
};

module.exports = { asyncHandler, notFound, errorHandler };
