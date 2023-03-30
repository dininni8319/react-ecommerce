const express = require('express');

const router = express.Router();
const { authCheck } = require('../middlewares/auth');

const { 
  userCart,
  getUserCart, 
  emptyCart,
  saveAddress,
  applyCouponToUserCart,
} = require('../controllers/user');

//order controller
const { createOrder, orders } = require('../controllers/order');

//wishlist controller
const { 
  addToWishList,
  wishlist, 
  removeFromWishList
} = require('../controllers/wishlist');

router.post("/user/cart", authCheck, userCart)
router.get("/user/cart", authCheck, getUserCart); //get cart 
router.delete("/user/cart", authCheck, emptyCart); // empty cart 
router.post("/user/address", authCheck, saveAddress); // empty cart 
//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

router.post('/user/order', authCheck, createOrder);

router.get("/user/orders", authCheck, orders);

// wishlist
router.post('/user/wishlist', authCheck, addToWishList);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishList);


//ruote
//express is a request response handler
// router.get('/user', (req, res) => {

//   res.json({
//     data: 'hey you hit user APi end point',
//   })
// })

module.exports = router;