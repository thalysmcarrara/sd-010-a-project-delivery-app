import React, { useState } from 'react';
import genHashMd5 from 'md5';
import { useNavigate } from 'react-router-dom';
import registerValidation from '../validations/registerValidation';
import api from '../services/api';
import ErrorBackend from './ErrorBackend/index';

export default function Cadastro() {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [errorRegsiter, setErrorRegister] = useState(false);

  const errorLoginHTTP = 400;
  const navegate = useNavigate();

  const fetchPostData = async (userData) => {
    try {
      const data = await api.post('/user', userData);
      if (data.status > errorLoginHTTP) {
        setErrorLogin(true);
        return;
      }
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('email', data.data.email);
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('name', data.data.name);
      const redirectRoutes = {
        customer: '/customer/products',
        seller: '/seller/orders',
        administrator: '/admin/manage',
      };
      navegate(redirectRoutes[data.data.role]);
    } catch (error) {
      setErrorRegister(true);
    }
  };

  const handleButtonClick = async () => {
    const passwordHash = genHashMd5(passwordInput);
    await fetchPostData({ name: nameInput, email: emailInput, password: passwordHash });
  };

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
              setDisabledBtn(!registerValidation(nameInput, emailInput, passwordInput));
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
              setDisabledBtn(!registerValidation(nameInput, emailInput, passwordInput));
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
              setDisabledBtn(!registerValidation(nameInput, emailInput, passwordInput));
            } }
          />
        </label>
        <h2>{passwordInput}</h2>
        <button
          type="button"
          data-testid="common_register__button-register"
          onClick={ handleButtonClick }
          disabled={ disabledBtn }
        >
          Cadastrar
        </button>
      </form>
      {
        errorRegsiter ? <ErrorBackend
          datatestid="common_register__element-invalid_register"
          messageError="Pane no sistema"
        /> : null
      }
    </div>
  );
}
