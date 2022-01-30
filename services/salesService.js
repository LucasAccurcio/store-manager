const salesModel = require('../models/salesModel');

const create = async (newSales) => {
  const newSalesId = await salesModel.createNewSalesId();

  const newSaleCreated = await salesModel
    .create(newSales, newSalesId);
  
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
  update,
  remove,
};