import React from 'react';
import { number, string } from 'prop-types';
import formatPrice from '../../utils/formatPrice';

function PrecoProduto({ data }) {
  const { id, price } = data;
  return (
    <p data-testid={ `customer_products__element-card-price-${id}` }>
      { formatPrice(price) }
    </p>
  );
}

PrecoProduto.propTypes = {
  id: string,
  price: number,
}.isRequired;

export default PrecoProduto;
