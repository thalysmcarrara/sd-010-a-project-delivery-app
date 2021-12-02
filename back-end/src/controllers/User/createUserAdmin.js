const genHashMd5 = require('md5');
const insert = require('../../services/insert');
const find = require('../../services/find');
const { isUserExists } = require('../../schemas');
const takeToken = require('../../services/takeToken');
// const { passwordToken } = require('../../services');

module.exports = async (req, res) => {
  const { name, email, password, role = 'customer' } = req.body;
  const { authorization } = req.headers;

  const passwordHash = genHashMd5(password);
  
  const isExists = await isUserExists({ name, email }, find);
  
  if (isExists.message) return res.status(isExists.status).json(isExists.message);

  const payload = takeToken(authorization);
  if (payload.role === 'administrator') {
    const createdUser = await insert(
      'users',
      { name, email, password: passwordHash, role },
    );
    // const tokenGen = passwordToken({ id: createdUser.id, role: createdUser.role });
    return res.status(201).json(createdUser);
  }

  res.status(400).json({ message: 'Invalid authorization' });
};
