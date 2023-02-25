const express = require('express');

const router = express.Router();

// middledares
const { authCheck } = require('../middlewares/auth');

//ruote
//express is a request response handler
const { createOrUpdateUser } = require('../controllers/auth');

const myMiddleware = (req, res, next) => {
  console.log('IM A MIDDLEWARE YAY');
  next();
}
// you can pass multiple middleware
router.post('/create-or-update-user',authCheck, createOrUpdateUser);
router.get('/testing', myMiddleware, (req,res) => {
  res.json({
    data: "YOU SUCCESSFULLY TRIED MIDDLEWARE"
  })
})

module.exports = router;