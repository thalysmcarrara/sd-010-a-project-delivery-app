const express = require('express');
const rescue = require('express-rescue');
const userController = require('../controllers/User');

const routes = express.Router();

routes
  .post('/', rescue(userController.createUser))
  .get('/:id', rescue(userController.findByIdUser))
  .get('/', rescue(userController.findAllUsers))
  .put('/:id', rescue(userController.updateUser))
  .delete('/:id', rescue(userController.removeUser));

module.exports = routes;