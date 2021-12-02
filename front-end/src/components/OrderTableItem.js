import React from 'react';
import PropTypes from 'prop-types';

const dataTestIds = (index) => ({
  59: `seller_order_details__element-order-table-item-number-${index}`,
  60: `seller_order_details__element-order-table-name-${index}`,
  61: `seller_order_details__element-order-table-quantity-${index}`,
  62: `seller_order_details__element-order-table-unit-price-${index}`,
  63: `seller_order_details__element-order-table-sub-total-${index}`,
});

export default function OrderTableItem({ product, index }) {
  const formatPrice = (price) => price.replace('.', ',');
  const subTotal = parseFloat(
    product.SaleProduct.quantity * product.price,
  ).toFixed(2);

  return (
    <tr>
      <td data-testid={ dataTestIds(index)[59] }>{index + 1}</td>
      <td data-testid={ dataTestIds(index)[60] }>{product.name}</td>
      <td data-testid={ dataTestIds(index)[61] }>
        {product.SaleProduct.quantity}
      </td>
      <td data-testid={ dataTestIds(index)[62] }>
        {formatPrice(product.price)}
      </td>
      <td data-testid={ dataTestIds(index)[63] }>{formatPrice(subTotal)}</td>
    </tr>
  );
}

OrderTableItem.propTypes = {
  product: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
