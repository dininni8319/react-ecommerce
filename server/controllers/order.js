const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
const uniqueid = require("uniqueid");

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
};

exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send("Create cash order failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderdBy: user._id,
    orderStatus:"Cash On Delivery"
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};



