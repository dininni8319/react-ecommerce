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
};

exports.handleStar = (req, res, stars) => {
    Product.aggregate([
      {
        $project: {
          document: "$$ROOT", // short cut
          // title: "$title",
          floorAverage: {
            $floor: { $avg: "$ratings.star"}
          },
        }
      },
      { $match: { floorAverage: stars } }
    ]) 
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log('AGGREGATE ERROR', err);
      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subs', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) {
            console.log('PRODUCT AGGREGATE ERROR', err)
          }
          res.json(products);
        });
    })
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

exports.handleSub = async (req, res, sub) => {
  const products = await Product.find({subs: sub})
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

exports.handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

exports.handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

exports.handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};