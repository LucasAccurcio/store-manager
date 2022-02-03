const rescue = require('express-rescue');
const sales = require('express').Router();
const joi = require('joi');

const salesService = require('../services/salesService');

// Converte o nome dos campos de snake_case para camelCase
const serialize = (salesData) => ({
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

const saleSchema = joi.array().items(
  joi.object({
  productId: joi.number().integer().min(1).required(),
  quantity: joi.number().integer().min(1).required(),
}),
);

sales.post(
  '/',
  rescue(async (req, res) => {
    const newOrderSale = req.body;
    const orderSale = newOrderSale.map(serialize);
      const { error } = saleSchema.validate(orderSale);
      if (error) {
        throw error;
      }

    const newSale = await salesService.create(orderSale);

    if (newSale.message) return res.status(422).json({ message: newSale.message });
    
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
    const getProduct = await salesService.getSaleById(id);

    if (getProduct.message) return res.status(404).json(getProduct);

    res.status(200).json(getProduct);
  }),
);

sales.put(
  '/:id',
  rescue(async (req, res) => {
    const updateOrderSale = req.body;
    const saleToBeUpdate = updateOrderSale.map(serialize);
    const { error } = saleSchema.validate(saleToBeUpdate);
    if (error) {
      throw error;
    }
    const { id } = req.params;
    const getProduct = await salesService.update(Number(id), saleToBeUpdate);

    if (getProduct.message) return res.status(404).json(getProduct);

    res.status(200).json(getProduct);
  }),
);

sales.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await salesService.remove(id);

    if (deletedProduct.message) return res.status(404).json(deletedProduct);
    res.status(200).json(deletedProduct);
  }),
);

module.exports = {
  sales, 
  serialize,
};