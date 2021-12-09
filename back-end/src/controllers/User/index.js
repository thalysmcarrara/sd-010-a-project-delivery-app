const createUser = require('./createUser');
const createUserAdmin = require('./createUserAdmin');
const removeUser = require('./removeUser');
const updateUser = require('./updateUser');
const findAllUsers = require('./findAllUsers');
const findByIdUser = require('./findByIdUser');
const findByEmailUser = require('./findByEmailUser');
const getSalesByUser = require('./getSalesByUser');
const login = require('./login');

module.exports = {
  createUser,
  createUserAdmin,
  removeUser,
  updateUser,
  findAllUsers,
  findByIdUser,
  findByEmailUser,
  getSalesByUser,
  login,
};