const express = require('express');

const router = express.Router();
const { authCheck } = require('../middlewares/auth');

const { 
  userCart,
  getUserCart, 
  emptyCart,
  saveAddress,
} = require('../controllers/user');

router.post("/user/cart", authCheck, userCart)
router.get("/user/cart", authCheck, getUserCart); //get cart 
router.delete("/user/cart", authCheck, emptyCart); // empty cart 
router.post("/user/address", authCheck, saveAddress); // empty cart 

//ruote
//express is a request response handler
// router.get('/user', (req, res) => {

//   res.json({
//     data: 'hey you hit user APi end point',
//   })
// })

module.exports = router;