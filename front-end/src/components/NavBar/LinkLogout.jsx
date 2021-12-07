import React from 'react';
import { useNavigate } from 'react-router-dom';

function LinkLogout() {
  const navigate = useNavigate();
  const handleCLickLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <button
      type="button"
      data-testid="customer_products__element-navbar-link-logout"
      onClick={ handleCLickLogout }
      className="c_navbar__link_checkout"
    >
      Sair
    </button>
  );
}

export default LinkLogout;
