import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ButtonLogout from './ButtonLogout';

function NavBar() {
  const { name } = JSON.parse(localStorage.getItem('user'));

  return (
    <ul>
      <li data-testid="customer_products__element-navbar-link-products">
        <NavLink to="/products">
          Produtos
        </NavLink>
      </li>
      <li data-testid="customer_products__element-navbar-link-orders">
        <NavLink to="/orders">
          Meus Pedidos
        </NavLink>
      </li>
      <li data-testid="customer_products__element-navbar-user-full-name">
        { name }
      </li>
      <li>
        <ButtonLogout />
      </li>
    </ul>
  );
}

export default NavBar;

NavBar.propTypes = {
  ids: PropTypes.object,
  names: PropTypes.object,
}.isRequired;
