import React, { useContext } from 'react';
import ProductsContext from '../../context/ProductsContext';
import NavBar from '../../components/NavBar/NavBar';
// import OrderTableCheckout from '../../components/OrderTableCheckout';
import OrdersTable from '../../components/OrdersTable';
import './styles.css';
import FormDetailsAddress from '../../components/FormDetailsAddress';

export default function CustomerCheckout() {
  const { values: { totalCart } } = useContext(ProductsContext);
  const formatedValue = totalCart.toFixed(2).replace('.', ',');
  const products = JSON.parse(localStorage.getItem('productsCart')) || [];

  return (
    <>
      <NavBar />
      <section>
        <h1>Finalizar pedidos</h1>
        {/* <OrderTableCheckout /> */}
        <OrdersTable orderList={ products } />
        <span
          data-testid="customer_checkout__element-order-total-price"
          className="c_span_total"
        >
          {`Total: R$ ${formatedValue}` }
        </span>
      </section>
      <section>
        <h1>Detalhes e Endereço para Entrega</h1>
        <FormDetailsAddress />
      </section>
    </>
  );
}
