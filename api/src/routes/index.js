// Agregator route: hanya menggabungkan semua router, tanpa logika lain
const router = require('express').Router();

router.use('/motors', require('./motorRoutes'));
router.use('/tracks', require('./trackRoutes'));
router.use('/results', require('./resultRoutes'));

module.exports = router;
