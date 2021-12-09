// att status pedido
const update = require('../../services/update');

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedStatusSale = await update(
    'sales',
    { id },
    { status },
  );
  
  res.status(200).json(updatedStatusSale);
};

module.exports = updateSale;