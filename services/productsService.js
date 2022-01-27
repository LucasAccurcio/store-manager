const productModel = require('../models/productsModel');

const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
};

const create = async ({ name, quantity }) => {
  const isProductValid = isValid(name, quantity);

  if (!isProductValid) return false;

  const createNewProduct = await productModel
    .create({ name, quantity });

  return (createNewProduct);
};

const getAll = async () => {
  const allProducts = await productModel.getAll();

  if (!allProducts) return false;

  return allProducts;
};

const getById = async (id) => {
  const getProduct = await productModel.getById(id);

  return getProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  isValid,
};