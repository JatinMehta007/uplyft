const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../products.json');

let products = [];

try {
  const data = fs.readFileSync(productsPath, 'utf-8');
  products = JSON.parse(data);
} catch (err) {
  console.error("Error reading products.json:", err.message);
}

const chatQuery = (req, res) => {

  console.log("📥 Received body:", req.body);
  
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ results: [] });
  }

  const keyword = message.toLowerCase();

  const results = products.filter(product =>
    product.name.toLowerCase().includes(keyword) ||
    product.description.toLowerCase().includes(keyword) ||
    product.category.toLowerCase().includes(keyword) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(keyword)))
  );

  console.log("🔍 Searched keyword:", keyword);
  console.log("✅ Products matched:", results.length);

  res.json({ results });
};

module.exports = { chatQuery };