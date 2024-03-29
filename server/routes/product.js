const express = require('express');
const router = express.Router();

// middledares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { 
  create, 
  list,
  listAll, 
  remove, 
  read, 
  update,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require('../controllers/product');
const { auth } = require('firebase-admin');

// routes
router.get('/products/total', productsCount)
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.delete('/product/:slug',authCheck ,adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);

router.post('/products', list);
// related
router.get('/product/related/:productId', listRelated);
// rating
router.put('/product/star/:productId', authCheck, productStar);
router.post('/search/filters', searchFilters);

module.exports = router;