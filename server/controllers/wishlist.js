const User = require('../models/user');

exports.addToWishList = async (req, res) => {
  const { productId } = req.body;                                 /// $addToSet is used to avoid duplicates
  const user = await User.findOneAndUpdate(
    { email: req.user.email }, 
    { $addToSet: { wishlist: productId }},
    { new: true }
  ).exec();

  res.json({ ok: true })
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishList = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email }, 
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};




