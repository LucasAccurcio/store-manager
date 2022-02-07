const rescue = require('express-rescue');
const productsService = require('../../services/productsService');

module.exports = rescue(async (_req, res) => {
  const getProducts = await productsService.getAll();
  res.status(200).json(getProducts);
});