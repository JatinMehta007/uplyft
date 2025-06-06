const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  tags: [String],
  image: String,
});

// Register models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Export models
module.exports = {
  User,
  Product,
};