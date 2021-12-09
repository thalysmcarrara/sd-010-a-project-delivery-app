import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useLocation, useParams } from 'react-router';
import OrdersTable from './OrdersTable';

// const idsSeller = {
//   item: 'seller_order_details__element-order-table-item-number-<index>',
//   name: 'seller_order_details__element-order-table-name-<index>',
//   quantity: 'seller_order_details__element-order-table-quantity-<index>',
//   price: 'seller_order_details__element-order-table-unit-price-<index>',
//   subtotal: 'seller_order_details__element-order-table-sub-total-<index>',
//   total: 'seller_order_details__element-order-total-price',
//   id: 'seller_order_details__element-order-details-label-order-id',
//   status: 'seller_order_details__element-order-details-label-delivery-status',
//   btnPreparingCheck: 'seller_order_details__button-preparing-check',
//   btnDispatchCheck: 'seller_order_details__button-dispatch-check',
// };

export default function DetailsSocket() {
  const { id } = useParams();
  const socket = io('http://localhost:3001');
  const path = useLocation().pathname;
  const [sale, setSale] = useState({});
  const [buttonText] = useState({
    Pendente: 'preparo',
    Preparando: 'saiu para entrega',
    'Em Trânsito': 'Entregue',
  });

  useEffect(() => {
    socket.emit('getSale', id);
    socket.on('takeSale', (response) => {
      setSale(response);
    });
  }, []);
  const onClick = ({ target }) => {
    const statusValue = { preparo: 'Preparando',
      'saiu para entrega': 'Em Trânsito',
      Entregue: 'Entregue' };
    const status = statusValue[target.value];
    console.log(status);
    socket.emit('sendStatus', { id, status });
  };
  const renderButton = () => {
    const buttonValue = buttonText[sale.status];
    const validateStatus = sale.status === 'Em Trânsito';
    if (validateStatus && !path.includes('seller')) {
      return (
        <button
          type="button"
          value={ buttonValue }
          onClick={ onClick }
        >
          {buttonValue}

        </button>
      );
    }
    if (!validateStatus && path.includes('seller')) {
      return (
        <button
          type="button"
          value={ buttonValue }
          onClick={ onClick }
        >
          {buttonValue}
        </button>
      );
    }
    return null;
  };
  return (
    <div>
      <div>
        <h1>{`PEDIDO${sale.id}`}</h1>
        <h1>{sale.date}</h1>
        <div><h1>{sale.status}</h1></div>
        { renderButton() }
      </div>
      <div>
        { sale.products ? <OrdersTable orderList={ sale.products } /> : null }
        <h1>{`Total: R$${sale.totalPrice}`}</h1>
      </div>
    </div>
  );
}
