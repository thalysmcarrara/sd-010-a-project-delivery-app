import React from 'react';
import NavBar from './NavBar/NavBar';
import OrdersTable from './OrdersTable';

export default function CheckoutComprador() {
  return (
    <>
      <section>
        <NavBar />
      </section>
      <section>
        <h2>Finalizar Pedido</h2>
        <OrdersTable />
      </section>
      <section>
        <h2>Detalhes e Endereço para Entrega</h2>
      </section>
    </>
  );
}
