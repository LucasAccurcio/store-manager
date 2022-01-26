const productModel = require('../models/productsModel');

const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
};

const create = async ({ name, quantity }) => {
  const isProductValid = isValid(name, quantity);

  if (!isProductValid) return false;

  const { id } = await productModel
    .create({ name, quantity });

  return {
    id,
  };
};

const getAll = async () => {
  const allProducts = await productModel.getAll();

  if (!allProducts) return false;

  return allProducts;
};

module.exports = {
  create,
  getAll,
};