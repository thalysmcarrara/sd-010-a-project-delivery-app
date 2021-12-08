import React from 'react';
import { Link } from 'react-router-dom';

function LinkOrders() {
  const path = window.location.href;
  const url = path.includes('seller') ? '/seller/orders' : '/customer/orders';
  return (
    <Link
      to={ url }
      data-testid="customer_products__element-navbar-link-orders"
      className="c_navbar__links c_navbar__link__orders"
    >
      Meus pedidos
    </Link>
  );
}

export default LinkOrders;
