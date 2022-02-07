const productModel = require('../models/productsModel');

const isValid = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      code: 422,
      message: '"quantity" must be a number larger than or equal to 1',
    };
  }
  return true;
};

const create = async ({ name, quantity }) => {
  const isProductValid = isValid(quantity);

  if (isProductValid.message) return isProductValid;

  const createNewProduct = await productModel
    .create({ name, quantity });

  return createNewProduct;
};

const getAll = async () => {
  const allProducts = await productModel.getAll();

  if (!allProducts) return false;

  return allProducts;
};

const getById = async (id) => {
  const getProduct = await productModel.getById(id);

  if (!getProduct) {
    throw (new Error({ message: 'Erro não tratado ao encontrar produto por ID' }));
  }

  return getProduct;
};

const update = async ({ id, name, quantity }) => {
  const getProduct = await productModel.getById(id);

  if (getProduct.message) return getProduct;

  await productModel.update({ id, name, quantity });

  const updatedProduct = await productModel.getById(id);
  return updatedProduct;
};

const remove = async (id) => {
  const getProduct = await productModel.getById(id);

  if (getProduct.message) return getProduct;

  await productModel.remove(id);

  return getProduct;
};

module.exports = {
  create,
  getAll,
  getById,
  isValid,
  update,
  remove,
};