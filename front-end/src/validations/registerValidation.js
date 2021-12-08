const Joi = require('joi');

export default function registerValidation(name, email, password) {
  const minNameValue = 11;
  const minPassawordValue = 5;
  const schema = Joi.object({
    name: Joi.string()
      .min(minNameValue)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(minPassawordValue)
      .required(),
  });
  const { error } = schema.validate({ name, email, password });
  // console.log(error);
  if (!error) {
    return true;
  }
  return false;
}
