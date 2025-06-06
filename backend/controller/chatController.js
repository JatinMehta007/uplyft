const Product = require('../models/Product');

exports.chatQuery = async (req, res) => {
  const { message } = req.body;
  const regex = new RegExp(message, 'i');
  const results = await Product.find({
    $or: [
      { name: regex },
      { description: regex },
      { category: regex },
      { tags: regex }
    ]
  });
  res.json({ results });
};