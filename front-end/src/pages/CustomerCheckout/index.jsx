import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import OrderTable from '../../components/OrderTable';

export default function CustomerCheckout() {
  return (
    <>
      <NavBar />
      <section>
        <h1>Finalizar pedidos</h1>
        <OrderTable />
      </section>
      <section>
        <h1>Detalhes e Endereço para Entrega</h1>
        {/* componente form */}
        {/* componente botao */}
      </section>
    </>
  );
}
