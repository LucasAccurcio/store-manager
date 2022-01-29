const rescue = require('express-rescue');
const sales = require('express').Router();
const joi = require('joi');

const salesService = require('../services/salesService');

// Converte o nome dos campos de snake_case para camelCase
const serialize = (salesData) => ({
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

/* const isValid = (body) => {
  console.log(body.length);
  if (!body.product_id) {
    return { code: 400, message: '"product_id" is required' };
  }
  if (!body.quantity) {
    return { code: 400, message: '"quantity" is required' };
  }
  if (typeof body.quantity !== 'number' || body.quantity < 1) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  } 
  return true;
}; */
const saleSchema = joi.array().items(
  joi.object({
  productId: joi.number().integer().min(1).required(),
  quantity: joi.number().integer().min(1).required(),
}),
);
// const schema = joi.array().items(joi.number().required(), joi.number().required());

sales.post(
  '/',
  rescue(async (req, res) => {
    const newOrderSale = req.body;
    const orderSale = newOrderSale.map(serialize);
      const { error } = saleSchema.validate(orderSale);
      if (error) {
        throw error;
      }
  
    // const isSaleValid = isValid(req.body);
    // if (isSaleValid.code) return res.status(isSaleValid.code).json(isSaleValid.message);

    const newSale = await salesService.create(orderSale);

    if (newSale.message) return res.status(409).json({ message: newSale.message });
    
    res.status(201).json(newSale);
  }),
);

sales.get(
  '/',
  rescue(async (_req, res) => {
    const getSales = await salesService.getAll();

    res.status(200).json(getSales);
  }),
);

sales.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const getProduct = await salesService.getById(id);

    if (getProduct.message) return res.status(404).json(getProduct);

    res.status(200).json(getProduct);
  }),
);
/*
sales.put(
  '/:id',
  rescue(async (req, res) => {
    validateSaleSchema(req.body);
    const { id } = req.params;
    const { name, quantity } = req.body;
    const getProduct = await salesService.update({ id, name, quantity });

    if (getProduct.message) res.status(404).json(getProduct);

    res.status(200).json(getProduct);
  }),
);

sales.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await salesService.remove(id);

    if (deletedProduct.message) res.status(404).json(deletedProduct);
    res.status(200).json(deletedProduct);
  }),
); */

module.exports = {
  sales, 
  // validateSaleSchema,
};