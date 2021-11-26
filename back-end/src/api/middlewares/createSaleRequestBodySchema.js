const Joi = require('joi');

const schema = Joi.object({
  userId: Joi.number()
    .required(),
  sellerId: Joi.number()
    .required(),
  totalPrice: Joi.number()
    .required(),
  deliveryAddress: Joi.string()
    .required(),
  deliveryNumber: Joi.number()
    .required(),
  products: Joi.array()
    .items({
      name: Joi.string().required(),
      quantity: Joi.number().required(),
    }),
}).required();

module.exports = schema;