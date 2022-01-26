const rescue = require('express-rescue');
const products = require('express').Router();
const joi = require('joi');

const productsService = require('../services/productsService');

products.post(
  '/',
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const { error } = joi.object({
      name: joi.string().min(5).required(),
      quantity: joi.number().integer().positive().required(),
    })
    .validate(req.body);

    if (error) {
      throw error;
    }

    const newProduct = await productsService.create({ name, quantity });

    res.status(201).json(newProduct);
  }),
);