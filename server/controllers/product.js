const Product = require('../models/product');
const slugify = require('slugify');
const User = require('../models/user');

const {
  handleQuery,
  handlePrice,
  handleCategory,
  handleStar,
  handleSub,
  handleShipping,
  handleColor,
  handleBrand,
} = require('../services/product');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
  
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();

  res.json(products);
};

exports.remove = async (req, res) => { 
   try {
    const deleted = await Product.findOneAndRemove({ 
      slug: req.params.slug 
    }).exec();
    res.json(deleted);
    
   } catch (err) {
     console.log(err);
     return res.status(400).send('Product delete failed');
   }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
   .populate('category')
   .populate('subs')
   .exec();

  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("PRODUCT UPDATE ERROR ----> ", err);
    // return res.status(400).send("Product update failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     //createAT/updatedAt, desc/asc, 3
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (error) {
//     console.log(err);
//   }
// }

// WITH PAGINATION
exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3; //3

    const products = await Product.find({})
      .skip((currentPage -1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  //  console.log(req.params.productId);
  const product = await Product.findById(req.params.productId).exec();
   // get the product not including the current one
   const related = await Product.find({
    _id: {$ne: product._id },
    category: product.category,
   })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy', '-password')
    .exec();
  
   res.json(related);
};

exports.searchFilters = async (req, res) => {
  const { 
     query, 
     price, 
     category, 
     stars, 
     sub, 
     shipping, 
     color, 
     brand, 
  } = req.body;

   if (query) {
     console.log(query, 'QUERY');
     await handleQuery(req, res, query);
   }

   if (price !== undefined) {
      console.log('price --->', price);
      await handlePrice(req, res, price);
   }

   if(category) {
     console.log('category ----> ', category);
     await handleCategory(req,res, category);
   }

   if(stars) {
    console.log('stars ----> ', stars);
    await handleStar(req,res, stars);
  }

  if(sub) {
    console.log('sub ----> ', sub);
    await handleSub(req,res, sub);
  }

  if(shipping) {
    console.log('shipping ----> ', shipping);
    await handleShipping(req,res, shipping);
  }

  if(color) {
    console.log('color ----> ', color);
    await handleColor(req,res, color);
  }

  if(brand) {
    console.log('brand ----> ', brand);
    await handleBrand(req,res, brand);
  }
};