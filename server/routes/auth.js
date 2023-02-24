const express = require('express');

const router = express.Router();

//ruote
//express is a request response handler
const { createOrUpdateUser } = require('../controllers/auth') 
router.get('/create-or-update-user', createOrUpdateUser)

module.exports = router;