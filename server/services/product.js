const Product = require('../models/product');

//SEARCH FILTER
exports.handleQuery = async (req, res, query) => {
  // $text --> find the product based on text,
  // enable first text search in the product model,
  // also know as 'text based search'
  const products = await Product.find({ $text: { $search: query }})
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

exports.handlePrice = async (req, res, price) => {
  try {
    // $gte greater than , $lte less than  
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
}

exports.handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subs', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};