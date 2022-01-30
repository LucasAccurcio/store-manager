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

  const newSaleCreated = await salesModel
    .create(newSales, newSalesId);

  // const newSaleCreated = await salesModel.getById(newSalesId);
  
  return {
    id: newSalesId,
    itemsSold: newSaleCreated,
  };
};

const getAll = async () => {
  const allSales = await salesModel.getAll();

  if (!allSales) return false;

  return allSales;
};

const getSaleById = async (id) => {
  const getSale = await salesModel.getSaleById(id);

  if (!getSale) {
    throw (new Error({ message: 'Erro não tratado ao encontrar produto por ID' }));
  }

  return getSale;
};

const update = async (saleId, saleToBeUpdate) => {
  const getProduct = await salesModel.getProductById(saleId, saleToBeUpdate);

  if (getProduct.message) return getProduct;

  await salesModel.update(saleId, saleToBeUpdate);

  const updatedProduct = await salesModel.getProductById(saleId, saleToBeUpdate);
  // return updatedProduct;
  return {
    saleId,
    itemUpdated: updatedProduct,
  };
};

const remove = async (id) => {
  const getProduct = await salesModel.getSaleById(id);

  if (getProduct.message) return getProduct;

  await salesModel.remove(id);

  return getProduct;
};

module.exports = {
  create,
  getAll,
  getSaleById,
  // isValid,
  update,
  remove,
};