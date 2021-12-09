import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import moment from 'moment-timezone';

import OrdersTable from '../OrdersTable';
import formatPrice from '../../utils/formatPrice';

export default function CardOrdersSeller() {
  const { id } = useParams();
  const socket = io('http://localhost:3001');
  const [sale, setSale] = useState({});
  useEffect(() => {
    socket.emit('getSale', id);
    socket.on('takeSale', (response) => {
      setSale(response);
    });
  }, []);
  const onClick = ({ target }) => {
    // const statusValue = { preparo: 'Preparando',
    //   'saiu para entrega': 'Em Trânsito',
    //   Entregue: 'Entregue' };
    // const status = statusValue[target.value];
    socket.emit('sendStatus', { id, status: target.value });
  };
  if (!sale) {
    return <p>Loading ... </p>;
  }
  const delivery = 'seller_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <h2>Detalhe do Pedido</h2>
      <div>
        <h3
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO 0${sale.id}; `}
        </h3>
        <h3
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {moment(sale.saleDate).format('DD/MM/YYYY')}
        </h3>
        <div>
          <h1
            data-testid={ delivery }
          >
            {sale.status}
          </h1>
        </div>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          value="Preparando"
          disabled={ sale.status !== 'Pendente' }
          onClick={ onClick }
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          value="Em Trânsito"
          disabled={ sale.status !== 'Preparando' }
          onClick={ onClick }
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div>
        { sale.products
          ? <OrdersTable orderList={ sale.products } /> : null }
        <h1>{'Total: R$ '}</h1>
        <h1
          data-testid="seller_order_details__element-order-total-price"
        >
          { formatPrice(sale.totalPrice) }
        </h1>
      </div>
    </div>
  );
}
