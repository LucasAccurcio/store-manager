const joi = require('joi');

module.exports = (err, _req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  res
    .status(422)
    .json({ code: 'unprocessable_entity', message: err.message });
};