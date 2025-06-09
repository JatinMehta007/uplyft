const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

exports.loadMockProducts = async (req, res) => {
  try {
    const mockProducts = require('../mock/products.json');

    await prisma.product.createMany({
      data: mockProducts,
      skipDuplicates: true,
    });

    res.json({ message: "Mock products loaded" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading mock products" });
  }
};