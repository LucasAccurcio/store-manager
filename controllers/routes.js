const createProduct = require('./products/createProduct');
const getAllProducts = require('./products/getAllProducts');
const updateProduct = require('./products/updateProduct');
const getProductById = require('./products/getProductById');
const removeProduct = require('./products/removeProduct');
const validateProduct = require('./products/validateProduct');

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
  validateProduct,
};