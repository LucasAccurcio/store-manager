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

/* products.get(
  '/',
  rescue(async (req, res) => {
    const getProducts = await productsService.getAll();

    res.status(200).json(getProducts);
  }),
);

products.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const getProduct = await productsService.getById(id);

    res.status(200).json(getProduct);
  }),
); */