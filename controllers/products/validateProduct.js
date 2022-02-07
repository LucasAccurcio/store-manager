const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().integer().min(1).required(),
});

module.exports = (req, _res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    throw error;
  }

  next();
};
