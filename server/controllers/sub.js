const Sub = require('../models/sub');
const slugify = require('slugify');
const Product = require('../models/product');

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log(err, "Sub Create Error --->");
    res.status(400).send('Create sub failed');
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub})
    .populate('category')
    .exec();

  res.json({
    sub,
    products
  });
};

exports.update = async (req, res) => {
  let { name, parent } = req.body;
  
  try {
    const update = await Sub.findOneAndUpdate(
      { slug: req.params.slug }, // look for the sub
      { name, parent, slug: slugify(name) }, //update the sub
      { new: true } // will send the recent updated sub
    );
    res.json(update);
    
  } catch (err) {
    res.status(400).send("Sub update failed")
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub Delete failed");
  }
};