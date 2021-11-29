import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  // const [disabledBtn, setDisabledBtn] = useState(true);
  // const [errorRegsiter, setErrorRegister] = useState(false);

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="input-name">
          <input
            id="input-name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            onChange={ (e) => {
              setNameInput(e.target.value);
            } }
          />
        </label>
        <h2>{nameInput}</h2>
        <label htmlFor="input-email">
          <input
            id="input-email"
            data-testid="common_register__input-email"
            placeholder="seu email@site.com.br"
            onChange={ (e) => {
              setEmailInput(e.target.value);
            } }
          />
        </label>
        <h2>{emailInput}</h2>
        <label htmlFor="input-password">
          <input
            id="input-password"
            data-testid="common_register__input-password"
            placeholder="*******"
            onChange={ (e) => {
              setPasswordInput(e.target.value);
            } }
          />
        </label>
        <h2>{passwordInput}</h2>
        <Link to="/user">
          <button
            type="button"
            common_register__button-register
          >
            Cadastrar
          </button>
        </Link>
      </form>
    </div>
  );
}
