const rescue = require('express-rescue');
const productsService = require('../../services/productsService');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const getProduct = await productsService.update({ id, name, quantity });

  if (getProduct.message) res.status(404).json(getProduct);

  res.status(200).json(getProduct);
});