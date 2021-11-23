import React, { useContext } from 'react';
import CheckoutContext from '../context/checkoutContext';
import Header from '../components/Header/Header';
import CheckoutProduct from '../components/checkoutProduct';

export default function CheckoutComprador() {
  const { aux, total } = useContext(CheckoutContext);
  const user = localStorage.getItem('user');

  const userName = JSON.parse(user);

  return (
    <div>
      <Header title="Produtos" subtitle="Meus Pedidos" name={ userName.name } />
      <h1>Finalizar pedido</h1>
      {aux.map(({ id, title, name, price, qtd }, i) => (
        <CheckoutProduct
          id={ id }
          title={ title }
          name={ name }
          price={ price }
          qtd={ qtd }
          index={ i }
          key={ i }
        />
      ))}
      <h3 data-testid="customer_checkout__element-order-total-price">
        {`TOTAL R$ ${total}`}
      </h3>
    </div>
  );
}
