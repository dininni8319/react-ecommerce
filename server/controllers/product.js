const Product = require('../models/product');
const slugify = require('slugify');
const user = require('../models/user');

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
  // console.log(req.body);
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
  const user = await User.findOne({ email: req.user.email }).exec()
  const { star } = req.body;

  // who is updating
  // check the currently logged in user have already rating to this product?
  let existingRatingObj = pruduct.ratings.find(
    (elem) => {elem.postedBy.toString() === user._id.toString()}
  );
  
  // if user havent left rating yet, push it
  // if user have already left a rating, update it 
  if (existingRatingObj === undefined) {
    let ratingAdded = await Product.findByIdAndUpdatedBy(product_id, {
      $push: { ratings: {
        star,
        postedBy: user._id
      }}
    },
    { new: true }
    ).exec();
    console.log('rating added', ratingAdded);
    res.json(ratingAdded)
  } else {
    const ratingUpdated = await Product.updateOne(
      {ratings: { $elemMatch: }}
    )
  }
}