import React from 'react';
import './styles.css';
import { useLocation } from 'react-router';
import LinkProducts from './LinkProducts';
import LinkOrders from './LinkOrders';
import UserFullName from './UserFullName';
import LinkLogout from './LinkLogout';

function NavBar() {
  const path = useLocation().pathname;
  return (
    <navbar className="c_navbar">
      <div className="c_navbar__container__links">
        { path.includes('customer')
          ? <LinkProducts />
          : null}
        <LinkOrders />
      </div>
      <div className="c_navbar__container_username">
        <UserFullName />
        <LinkLogout />
      </div>
    </navbar>
  );
}

export default NavBar;
