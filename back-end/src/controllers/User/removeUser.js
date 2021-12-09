const remove = require('../../services/delete');
const takeToken = require('../../services/takeToken');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  
  const payload = takeToken(authorization);
  if (payload.role === 'administrator') {
    await remove(
      'users',
      { id },
    );
    return res.status(204).end();
  }

  res.status(400).json({ message: 'Invalid authorization' });
};
