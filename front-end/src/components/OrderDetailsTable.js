import React from 'react';
import PropTypes from 'prop-types';
import OrderTableItem from './OrderTableItem';

export default function OrderDetailsTable({ products }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor unitário</th>
          <th>Valor total</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => (
          <OrderTableItem
            key={ product.id }
            product={ product }
            index={ i }
          />
        ))}
      </tbody>
    </table>
  );
}

OrderDetailsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
