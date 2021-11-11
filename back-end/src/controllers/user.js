// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001');

const User = require('../services/User');

const login = async (req, res) => {
  const { email, password } = req;
  const { err, user } = await User.login(email, password);
  // socket.emit('userInfo', (user));
  if (err) return res.status(400).json(err.message);
  return res.status(200).json(user);    
};

const createUser = async (req, res) => {
  const { name, email, password } = req;
  const { err, newUser } = await User.createUser(name, email, password);
  if (err) return res.status(400);
  return res.status(201).json(newUser);
};

module.exports = {
  login,
  createUser,
};