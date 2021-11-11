const Joi = require('joi');
const md5 = require('md5');
const errorMessages = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');
const { User } = require('../database/models');

const userExists = async (email) => {
  const searchResult = await User.findOne({ where: { email } });
  if (searchResult === null) {
    return { isExist: false };
  }
  const { dataValues: user } = searchResult;
  return { user, isExist: true };
};

const loginSchema = Joi.object({ 
  email: Joi.string().email().required(), 
  password: Joi.string().min(6).required(), 
});

const validateLogin = async (req, res, next) => { 
  const { email, password } = req.body;
  const { invalidEmail, invalidFields } = errorMessages;
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    const { message } = error;
    return res.status(httpStatus.badRequest).json({ message });
  }
  const { user, isExist } = await userExists(email);
  if (!isExist) {
    return res.status(httpStatus.notFound).json({ message: invalidEmail });
  }
  if (user.password !== md5(password)) {
    return res.status(httpStatus.unauthorized).json({ message: invalidFields });
  }
  req.user = user;
  return next();
};

module.exports = {
  validateLogin,
};
