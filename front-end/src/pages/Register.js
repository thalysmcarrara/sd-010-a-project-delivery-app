import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import postUser from '../services/requests';
import '../styles/Register.css';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [userErr, setUserErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  async function createUser() {
    const STATUS = 201;
    const { message, status, data, token } = await postUser(userData, 'register');
    if (message) setUserErr(message);

    if (status === STATUS) {
      const user = { token, ...data };
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoading(true);
    }
  }

  useEffect(() => {
    const validateButton = document.querySelector('button');
    const { email, name, password } = userData;
    const validateEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const validateName = new RegExp(/[\w\D]{12}/g).test(name);
    const validatePassword = new RegExp(/[\w\D]{6}/g).test(password);

    if (validateEmail && validateName && validatePassword) {
      validateButton.disabled = false;
    } else {
      validateButton.disabled = true;
    }
  });

  return (
    <div className="registerConteiner">
      <h1>Cadastro</h1>
      <form className="formConteiner">
        <label htmlFor="name">
          Nome
          <input
            data-testid="common_register__input-name"
            name="name"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="input"
            data-testid="common_register__input-email"
            name="email"
            onChange={ handleInputChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="input"
            type="password"
            data-testid="common_register__input-password"
            name="password"
            onChange={ handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          onClick={ createUser }
        >
          Cadastrar
        </button>
        {
          isLoading && (
            <Redirect to="/customer/products" />
          )
        }
        {
          userErr && (
            <span
              data-testid="common_register__element-invalid_register"
            >
              { userErr }
            </span>
          )
        }
      </form>
    </div>
  );
};

export default Register;
