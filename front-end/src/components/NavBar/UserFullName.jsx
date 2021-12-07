import React from 'react';

function UserFullName() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <h2
      data-testid="customer_products__element-navbar-user-full-name"
      className="c_navbar__username"
    >
      { user.name }
    </h2>
  );
}

export default UserFullName;
