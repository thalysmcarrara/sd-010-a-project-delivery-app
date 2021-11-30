const genHashMd5 = require('md5');
const insert = require('../../services/insert');
const find = require('../../services/find');
const { isUserExists } = require('../../schemas');

module.exports = async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;
  const passwordHash = genHashMd5(password);
  
  const isExists = await isUserExists({ name, email }, find);
  
  if (isExists.message) return res.status(isExists.status).json(isExists.message);

  const createdUser = await insert(
    'users',
    { name, email, password: passwordHash, role },
  );

  res.status(201).json(createdUser);
};
