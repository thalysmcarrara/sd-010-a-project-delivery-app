import React from 'react';
import PropTypes from 'prop-types';

const ordersLinks = {
  customer: '/customer/orders',
  seller: '/seller/orders',
};

function NavBar({ dataUser }) {
  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  return (
    <nav>
      <ul>
        {dataUser.role === 'customer' && (
          <li>
            <a
              href="/customer/products"
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </a>
          </li>
        )}
        <li>
          <a
            href={ ordersLinks[dataUser.role] }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </a>
        </li>
        <li>
          <a
            href="/customer/products"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { dataUser.name }
          </a>
        </li>
        <li>
          <a
            href="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => logout() }
          >
            SAIR
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

NavBar.propTypes = {
  dataUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
}.isRequired;
