const router = require('express').Router();
const c = require('../controllers/resultController');
const { asyncHandler: h } = require('../utils/errorHandler');

router.get('/', h(c.getAll));
router.get('/:id', h(c.getById));
router.post('/', h(c.create));
router.delete('/:id', h(c.remove));

module.exports = router;
