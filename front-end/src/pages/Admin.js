import React from 'react';
import NavBar from '../components/NavBar';

const dataUser = JSON.parse(localStorage.getItem('user'));

const Admin = () => (
  <>
    <NavBar dataUser={ dataUser } />
    <h1>Cadastrar novo Usuário</h1>
    <form>
      <label htmlFor="nameInput">
        Nome
        <input
          data-testid="admin-manage__input-name"
          name="nameInput"
        />
      </label>
      <label htmlFor="emailInput">
        Email
        <input
          data-testid="admin_manage__input-email"
          name="emailInput"
        />
      </label>
      <label htmlFor="passwordInput">
        Senha
        <input
          data-testid="admin_manage__input-password"
          name="passwordInput"
        />
      </label>
      <label htmlFor="role">
        P. Vendedora Responsável
        <select
          name="role"
          data-testid="admin_manage__select-role"
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
      </label>
    </form>
    <button
      type="button"
      data-testid="admin_manage__button-register"
    >
      CADASTRAR
    </button>
  </>
);

export default Admin;
