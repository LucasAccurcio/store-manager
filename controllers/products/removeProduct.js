const rescue = require('express-rescue');
const productsService = require('../../services/productsService');

module.exports = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await productsService.remove(id);

  if (deletedProduct.message) res.status(404).json(deletedProduct);
  res.status(200).json(deletedProduct);
});