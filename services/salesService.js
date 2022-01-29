const salesModel = require('../models/salesModel');

/* const isValid = (name, quantity) => {
  if (!name || typeof name !== 'string') return false;
  if (!quantity || typeof quantity !== 'number') return false;

  return true;
}; */

const create = async (newSales) => {
  // const isProductValid = isValid(name, quantity);
  // if (!isProductValid) return false;
  const newSalesId = await salesModel.createNewSalesId();

  await salesModel
    .create(newSales, newSalesId);

  const newSaleCreated = await salesModel.getById(newSalesId);
  
  return {
    id: newSalesId,
    itemsSold: newSaleCreated,
  };
};

/* const getAll = async () => {
  const allProducts = await salesModel.getAll();

  if (!allProducts) return false;

  return allProducts;
};

const getById = async (id) => {
  const getSale = await salesModel.getById(id);

  if (!getSale) {
    throw (new Error({ message: 'Erro não tratado ao encontrar produto por ID' }));
  }

  return getSale;
};

const update = async ({ id, name, quantity }) => {
  const getProduct = await salesModel.getById(id);

  if (getProduct.message) return getProduct;

  await salesModel.update({ id, name, quantity });

  const updatedProduct = await salesModel.getById(id);
  return updatedProduct;
};

const remove = async (id) => {
  const getProduct = await salesModel.getById(id);

  if (getProduct.message) return getProduct;

  await salesModel.remove(id);

  return getProduct;
}; */

module.exports = {
  create,
  // getAll,
  // getById,
  // isValid,
  // update,
  // remove,
};