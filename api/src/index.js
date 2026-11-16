// Entry point API DragGarage
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { notFound, errorHandler } = require('./utils/errorHandler');
const { sendSuccess } = require('./utils/response');

const app = express();

app.use(cors());          // izinkan akses dari frontend (domain berbeda)
app.use(express.json());  // baca body JSON

// Health check
app.get('/', (req, res) =>
  sendSuccess(res, { name: 'DragGarage API', version: '1.0.0' }, 'DragGarage API berjalan')
);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

// Jalankan server hanya saat lokal; di Vercel cukup export app (serverless)
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`DragGarage API berjalan di http://localhost:${port}`));
}

module.exports = app;
