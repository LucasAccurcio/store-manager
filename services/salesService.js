const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

async function getAllProducts(sales) {
  const productGetAll = await productsModel.getAll();
  const productList = sales.map((sale) =>
    productGetAll
      .filter((product) => product.id === sale.productId))
      .map((item) => item[0])
      .filter((result) => result !== undefined);
  if (sales.length !== productList.length) return false;
  return productList;
}

function isQuantityValid(sales, products) {
  const result = sales.every((sale, index) => sale.quantity <= products[index].quantity);
  return result;
}

async function updateQuantity(sales, products) {
  const promises = sales.map(async (sale, index) => {
    const newQuantity = products[index].quantity - sale.quantity;
    await productsModel.updateQuantity(sale.productId, newQuantity);
  });
  await Promise.all(promises);
}

const create = async (newSales) => {
  const productList = await getAllProducts(newSales);
  if (!productList) return { message: 'There is a product not found' };

  const isValid = isQuantityValid(newSales, productList);
  if (!isValid) return { message: 'Such amount is not permitted to sell' };

  const newSalesId = await salesModel.createNewSalesId();
  const newSaleCreated = await salesModel
    .create(newSales, newSalesId);

  await updateQuantity(newSales, productList);

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
  const getProductsSold = await salesModel.getSaleById(id);

  if (getProductsSold.message) return getProductsSold;

  const productGetAll = await productsModel.getAll();

  const productList = getProductsSold.map((sale) =>
  productGetAll
    .filter((product) => product.id === sale.product_id))
    .map((item) => item[0]);

  await getProductsSold.forEach(async (itemSold, index) => {
    const newQuantity = productList[index].quantity + itemSold.quantity;

    await productsModel.updateQuantity(itemSold.product_id, newQuantity);
  });

  await salesModel.remove(id);

  return getProductsSold;
};

module.exports = {
  isQuantityValid,
  getAllProducts,
  create,
  getAll,
  getSaleById,
  update,
  remove,
};