const joi = require('joi');

function nameErrors(err) {
  switch (err.message) {
    case '"name" is required':
      return { code: 400, message: err.message };
    case '"name" must be a string':
      return { code: 400, message: err.message };
    case '"name" length must be at least 5 characters long':
      return { code: 422, message: err.message };
    default:
      return null;
  }
}

function quantityErrors(err) {
  let indexError = '';
  if (err.message.includes('].q')) {
    indexError = err.message.slice(1, 5);
  }

  switch (err.message) {
    case `"${indexError}quantity" is required`:
      return { code: 400, message: '"quantity" is required' };
    case `"${indexError}quantity" must be greater than or equal to 1`:
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    case `"${indexError}quantity" must be a number`:
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    default:
      return null;
  }
}

function productIdErrors(err) {
  let indexError = '';
  if (err.message.includes('].p')) {
    indexError = err.message.slice(1, 5);
  }

  switch (err.message) {
    case `"${indexError}productId" is required`:
      return { code: 400, message: '"product_id" is required' };
    default:
      return null;
  }
}

function responseJoiError(err) {
  if (err.message.includes('name')) {
    return nameErrors(err);
  }
  if (err.message.includes('quantity')) {
    return quantityErrors(err);
  }
    return productIdErrors(err);
}

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }
  // res.status(400).json(err.message);
  const joiErrors = responseJoiError(err);

  res.status(joiErrors.code).json({ message: joiErrors.message });
};
