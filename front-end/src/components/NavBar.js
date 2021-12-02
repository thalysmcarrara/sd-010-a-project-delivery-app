import React from 'react';

function NavBar() {
  const logout = () => {
    localStorage.removeItem('user');
  };
  const dataUser = JSON.parse(localStorage.getItem('user'));

  return (
    <nav>
      <ul>
        <li>
          <a
            href="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </a>
        </li>
        <li>
          <a
            href="/customer/orders"
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
