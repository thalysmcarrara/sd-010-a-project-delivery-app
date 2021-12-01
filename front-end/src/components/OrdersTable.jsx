import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
// import PropTypes from 'prop-types';
import ProductsContext from '../context/ProductsContext';

export default function OrdersTable() {
  const { values: {
    isFetching,
    productsResult,
    productsCart } } = useContext(ProductsContext);

  const path = useLocation().pathname;
  const [elements, setElements] = useState([]);
  useEffect(() => {
    if (isFetching) return;
    const productsFormatted = productsCart.map((produto) => {
      const productsData = productsResult.find(({ id }) => produto.id === id);
      return {
        quantity: produto.quantity,
        name: productsData.name,
        price: productsData.price,
      };
    });
    const setState = () => {
      setElements(productsFormatted);
    };
    setState();
  }, [isFetching]);
  const removeElement = ({ target }) => {
    const filtered = elements.filter((product) => product.name !== target.value);
    setElements(filtered);
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
  const renderElements = () => elements.map((product, index) => (
    <tr key={ index }>
      <th>{index + 1}</th>
      <th>{product.name}</th>
      <th>{product.quantity}</th>
      <th>{`R$${product.price}`}</th>
      <th>{product.price * product.quantity}</th>
      <th>
        { path.includes('checkout')
          ? button(product.name)
          : null }
      </th>
    </tr>
  ));
  return !isFetching ? (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitario</th>
          <th>Sub-Total</th>
          { path.includes('checkout') ? <th>Remover Item</th> : null}
        </tr>
        { renderElements() }
      </thead>
    </table>
  ) : <span>Loading ...</span>;
}

/* OrdersTable.propTypes = {
  orderList: PropTypes.arrayOf(PropTypes.object).isRequired,
}; */
