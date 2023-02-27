const express = require('express');

const router = express.Router();

// middledares
const { authCheck } = require('../middlewares/auth');

//ruote
//express is a request response handler
const { createOrUpdateUser } = require('../controllers/auth');

// you can pass multiple middleware
router.post('/create-or-update-user',authCheck, createOrUpdateUser);


module.exports = router;