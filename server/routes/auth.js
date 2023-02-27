const express = require('express');
const router = express.Router();

// middledares
const { authCheck, adminCheck } = require('../middlewares/auth');

//ruote
//express is a request response handler
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

// you can pass multiple middleware
router.post('/create-or-update-user',authCheck, createOrUpdateUser);
router.post('/current-user',authCheck, currentUser);
router.post('/current-admin',authCheck, adminCheck, currentUser);

module.exports = router;