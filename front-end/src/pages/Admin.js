import React from 'react';

const Admin = () => {
  const a = 'a';
  console.log(a);
  return (
    <form>
      <label htmlFor="name">
        Nome
        <input
          data-testid="admin_manage__input-name"
          name="name"
          // onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          id="input"
          data-testid="admin_manage__input-email"
          name="email"
          // onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          id="input"
          data-testid="admin_manage__input-password"
          name="password"
          // onChange={ handleInputChange }
        />
      </label>
      <label htmlFor="password">
        Tipo
        <select
          data-testid="admin_manage__select-role"
        >
          <option>Vendedor</option>
        </select>
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        // onClick={ createUser }
      >
        Cadastrar
      </button>
    </form>
  );
};

export default Admin;
