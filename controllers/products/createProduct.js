const rescue = require('express-rescue');
const productsService = require('../../services/productsService');

module.exports = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await productsService.create({ name, quantity });

  if (newProduct.message) return res.status(409).json({ message: newProduct.message });
  
  res.status(201).json(newProduct);
});