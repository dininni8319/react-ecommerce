const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      require: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category"
    },
    subs: {
      type: [{
        type: ObjectId,
        ref: "Sub"
      }],
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array
    },
    shipping: {
      type: String,
      enum: ['YES', 'NO'] // value for shipping has to be one of this values
    },
    color: {
      type: String,
      enum: ['Black', "Brown", 'Silver', "White", "Blue"],
    },
    brand: {
      type: String,
      enum: ['Apple', "Samsung", 'Microsoft', "Lenovo", "ASUS"],
    },
    // rating: [
    //   {
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: "User"},
    //   }
    // ], 
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);