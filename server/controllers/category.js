const Category = require('../models/category');
const Product = require('../models/product');
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    res.status(400).send('Create category failed');
  }
};

exports.list = async (req, res) => {
  res.json(await Category.find({}).sort({createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category })
  .populate('category')
  .populate('postedBy', "_id name")
  .exec();

  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  let { name } = req.body;
  
  try {
    const update = await Category.findOneAndUpdate(
      { slug: req.params.slug }, // look for the category
      { name, slug: slugify(name) }, //update the category
      { new: true } // will send the recent updated category
    );
    res.json(update);
    
  } catch (err) {
    res.status(400).send("Category update failed")
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

exports.getSubs = async (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if(err) console.log(err);
    res.json(subs);
  })
}