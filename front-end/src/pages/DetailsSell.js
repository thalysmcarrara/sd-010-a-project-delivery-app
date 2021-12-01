import React from 'react';

function DetailsSell() {
  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <div>
      <a
        href="/"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        SAIR
      </a>
    </div>
  );
}

export default DetailsSell;
