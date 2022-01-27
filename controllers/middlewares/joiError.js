/* eslint-disable complexity */
const joi = require('joi');

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  switch (err.message) {
    case '"name" is required':
      return res.status(400).json(err.message);
    case '"name" length must be at least 5 characters long':
      return res.status(422).json(err.message);
    case 'Product already exists':
      return res.status(409).json(err.message);
    case '"quantity" is required':
      return res.status(400).json(err.message);
    case '"quantity must be a number larger than or equal to 1"':
      return res.status(422).json(err.message);
    default:
      res.status(422).json({ code: 'unprocessable_entity', message: err.message });
  }
};