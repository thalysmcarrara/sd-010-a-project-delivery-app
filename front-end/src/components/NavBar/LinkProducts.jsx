import React from 'react';
import { Link } from 'react-router-dom';

function LinkProducts() {
  return (
    <Link
      to="/customer/products"
      data-testid="customer_products__element-navbar-link-products"
      className="c_navbar__links c_navbar__link__products"
    >
      Produtos
    </Link>
  );
}

export default LinkProducts;
