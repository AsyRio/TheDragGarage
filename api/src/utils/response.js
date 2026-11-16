// Format respons seragam: { success, message, data }
const sendSuccess = (res, data, message = 'Berhasil', status = 200) =>
  res.status(status).json({ success: true, message, data });

const sendError = (res, status, message, data = null) =>
  res.status(status).json({ success: false, message, data });

module.exports = { sendSuccess, sendError };
