import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { IoMdBeer } from 'react-icons/io';
import './style.css';

const MenuCostumer = () => {
  const history = useHistory();
  const [userEmail] = React.useState(JSON.parse(localStorage.getItem('user'))
    .name);
  const [userFirstLetter] = React.useState(JSON.parse(localStorage.getItem('user'))
    .name[0].toUpperCase());
  const [pathname] = React.useState(history.location.pathname);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <header className="menuCostumer">
      <h1 className="beerProducts">
        dev
        <span className="beer">Beer</span>
        <IoMdBeer />
      </h1>
      <div className="linksContainer">
        <Link
          to="/customer/products"
          className={ pathname === '/customer/products' ? 'active' : '' }
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          className={ pathname === '/customer/orders' ? 'active' : '' }
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
      </div>
      <div className="userInfo">
        <div>{userFirstLetter}</div>
        <p data-testid="customer_products__element-navbar-user-full-name">{userEmail}</p>
        <button
          type="button"
          onClick={ handleLogout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          sair
        </button>
      </div>
    </header>
  );
};

export default MenuCostumer;