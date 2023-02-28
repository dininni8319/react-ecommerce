const express = require('express');
const router = express.Router();

// middledares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create } = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);

module.exports = router;