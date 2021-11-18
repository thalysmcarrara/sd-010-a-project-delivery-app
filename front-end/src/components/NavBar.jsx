import React from 'react';
import { Link } from 'react-router-dom';
import { MdDeliveryDining } from 'react-icons/md';
import ListNavLinks from './molecules/ListNavLinks';
import '../styles/NavBar.css';

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClearStorage = () => {
    localStorage.removeItem('user');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="backToHome navbar-brand" to="/products">
          <MdDeliveryDining className="deliveryIcon" />
          <p>Delivery App</p>
        </Link>
        <ListNavLinks />
        <Link
          className="navbar-brand"
          data-testid="customer_products__element-navbar-user-full-name"
          to="users/:id"
        >
          { user.name }
        </Link>
        <Link
          className="navbar-brand"
          data-testid="customer_products__element-navbar-link-logout"
          to="/login"
          onClick={ () => handleClearStorage() }
        >
          sair
        </Link>
      </div>
    </nav>
  );
}
