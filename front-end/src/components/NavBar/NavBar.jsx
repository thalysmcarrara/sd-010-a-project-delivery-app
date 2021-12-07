import React from 'react';
import { useLocation } from 'react-router';
import LinkProducts from './LinkProducts';
import LinkOrders from './LinkOrders';
import UserFullName from './UserFullName';
import LinkLogout from './LinkLogout';

function NavBar() {
  const path = useLocation().pathname;
  return (
    <div>
      { path.includes('customer')
        ? <LinkProducts />
        : null}
      <LinkOrders />
      <UserFullName />
      <LinkLogout />
    </div>
  );
}

export default NavBar;
