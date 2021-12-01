import React from 'react';
import { Link } from 'react-router-dom';
// import ProductsContext from '../context/ProductsContext';

function ButtonCart() {
  return (
    <Link to="/customer/checkout">
      <button
        data-testid="customer_products__button-cart"
        type="button"
      >
        <p>Ver Carrinho:</p>
        <span data-testid="customer_products__checkout-button-value">Valor Total</span>
      </button>
    </Link>
  );
}

export default ButtonCart;
