const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();
  
  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products, 
    paymentIntent,
    orderdBy: user._id,
  }).save();

  console.log('====================================');
  console.log(newOrder, 'Saved');
  console.log('====================================');
  res.json({ ok: true });
}