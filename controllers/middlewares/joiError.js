const joi = require('joi');

function responseJoiError(err) {
  switch (err.message) {
    case '"name" is required':
      return { code: 400, message: err.message };
    case '"name" length must be at least 5 characters long':
      return { code: 422, message: err.message };
    case '"quantity" is required':
      return { code: 400, message: err.message };
    case '"quantity" must be greater than or equal to 1':
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    default:
      return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
}

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  // res.status(422).json(err.message);

  const joiErrors = responseJoiError(err);

  res.status(joiErrors.code).json({ message: joiErrors.message });
};
