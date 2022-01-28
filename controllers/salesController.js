const rescue = require('express-rescue');
const sales = require('express').Router();
const joi = require('joi');

// Converte o nome dos campos de snake_case para camelCase
const serialize = (salesData) => ({
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

const salesService = require('../services/salesService');

const saleSchema = joi.object({
  productId: joi.number().integer().required(),
  quantity: joi.number().integer().min(1).required(),
});

const validateSaleSchema = (body) => {
  const { error } = body.foreach(saleSchema.validate(body));

  if (error) {
    throw error;
  }

  return null;
};

sales.post(
  '/',
  rescue(async (req, res) => {
      const newOrderSale = req.body;
      newOrderSale.map(serialize);
    // validateSaleSchema(newOrderSale);

    const newSale = await salesService.create(newOrderSale);

    if (newSale.message) return res.status(409).json({ message: newSale.message });
    
    res.status(201).json(newSale);
  }),
);

sales.get(
  '/',
  rescue(async (_req, res) => {
    const getProducts = await salesService.getAll();

    res.status(200).json(getProducts);
  }),
);

sales.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const getProduct = await salesService.getById(id);

    if (getProduct.message) res.status(404).json(getProduct);

    res.status(200).json(getProduct);
  }),
);

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
);

module.exports = {
  sales, 
  validateSaleSchema,
};