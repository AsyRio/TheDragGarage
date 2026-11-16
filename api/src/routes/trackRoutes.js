const router = require('express').Router();
const c = require('../controllers/trackController');
const { asyncHandler: h } = require('../utils/errorHandler');

router.get('/', h(c.getAll));
router.get('/:id', h(c.getById));
router.post('/', h(c.create));
router.put('/:id', h(c.update));
router.delete('/:id', h(c.remove));

module.exports = router;
