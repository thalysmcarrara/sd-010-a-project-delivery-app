import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import moment from 'moment-timezone';
import OrdersTable from '../OrdersTable';
import formatPrice from '../../utils/formatPrice';

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
  if (!sale) {
    return <p>Loading ... </p>;
  }
  const delivery = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div>
      <h2>Detalhe do Pedido</h2>
      <div>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO 0${sale.id}; `}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`P. Vend: ${sale.sellerName}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-date"
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
        {/* <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled
        >
          Marcar como Entregue
        </button> */}
        { renderButton() }
      </div>
      <div>
        { sale.products
          ? <OrdersTable orderList={ sale.products } /> : null }
        <h1>{'Total: R$ '}</h1>
        <h1
          data-testid="customer_order_details__element-order-total-price"
        >
          { formatPrice(sale.totalPrice) }
        </h1>
      </div>
    </div>
  );
}
