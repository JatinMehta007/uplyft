const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.loadMockProducts = async (req, res) => {
  const mockProducts = require('../mock/products.json');
  await Product.insertMany(mockProducts);
  res.json({ message: "Mock products loaded" });
};