import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import formatPrice from '../utils/formatPrice';
import ProductsContext from '../context/ProductsContext';
import useProductManager from '../hooks/useProductManager';

export default function OrdersTable({ orderList }) {
  const [setProduct] = useProductManager();
  const { actions: { setQntItens } } = useContext(ProductsContext);

  const path = useLocation().pathname;
  const [elements, setElements] = useState([]);
  useEffect(() => {
    const setState = () => {
      setElements(orderList);
    };
    setState();
  }, [orderList]);
  const removeElement = ({ target }) => {
    // const filtered = elements.filter((product) => product.name !== target.value);
    // setElements(filtered);

    setQntItens((previous) => ({ ...previous, [target.value]: 0 }));
    const dataProductAdd = {
      id: target.value,
      inputQuantity: 0,
    };
    setProduct(dataProductAdd);
  };
  const button = (value) => (
    <button
      value={ value }
      onClick={ removeElement }
      type="button"
    >
      Remover
    </button>
  );

  const page = path.includes('checkout')
    ? 'checkout'
    : 'order_details';

  const renderElements = () => elements.map((product, index) => (
    <tr key={ index }>
      <th
        data-testid={ `customer_${page}__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </th>
      <th data-testid={ `customer_${page}__element-order-table-name-${index}` }>
        {product.name}
      </th>
      <th data-testid={ `customer_${page}__element-order-table-quantity-${index}` }>
        {product.quantity}
      </th>
      <th data-testid={ `customer_${page}__element-order-table-unit-price-${index}` }>
        {`R$${formatPrice(product.price)}`}
      </th>
      <th data-testid={ `customer_${page}__element-order-table-sub-total-${index}` }>
        { formatPrice(product.total) }
      </th>
      <th
        data-testid={ `customer_${page}__element-order-table-remove-${index}` }
      >
        { page === 'checkout'
          ? button(product.id)
          : null }
      </th>
    </tr>
  ));

  return (
    <table>
      <tr>
        <th>Item</th>
        <th>Descrição</th>
        <th>Quantidade</th>
        <th>Valor Unitário</th>
        <th>Sub-Total</th>
        { path.includes('checkout') ? <th>Remover Item</th> : null}
      </tr>
      { renderElements() }
    </table>
  );
}

OrdersTable.propTypes = {
  orderList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
