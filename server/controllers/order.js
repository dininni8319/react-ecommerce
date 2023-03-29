const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();
  
  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();

  let newOrder = await new Order({
    products, 
    paymentIntent,
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment of sold products
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, //IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count }}
      }
    }
  });

  let updated = await Product.bulkWrite(bulkOption, {})
  console.log(updated, "PRODUCT QUANTITY-- DECREMENTED AND SOLD++");
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  const user = await User.findOne({email: req.user.email}).exec();

  const userOrders = await Order.find({orderdBy: user._id})
    .populate("products.product")
    .exec();

  res.json(userOrders);
 }


