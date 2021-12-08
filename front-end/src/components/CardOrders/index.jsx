// import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useLocation, useParams } from 'react-router';
import { useParams } from 'react-router';
import moment from 'moment-timezone';
import OrdersTable from '../OrdersTable';
import api from '../../services/api';
import formatPrice from '../../utils/formatPrice';

export default function DetailsSocket() {
  const { id } = useParams();

  // const path = useLocation().pathname;
  // const [sale, setSale] = useState({});
  // const [buttonText] = useState({
  //   pendente: 'preparo',
  //   preparando: 'saiu para entrega',
  //   'Em Trânsito': 'Entregue',
  // });
  const [sales, setSales] = useState([]);
  const [saleFiltered, setSaleFiltered] = useState({});

  useEffect(() => {
    const getSales = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      // const path = window.location.href;
      // const url = path.includes('seller')
      //   ? '/seller/sales' : '/user/sales';

      // const response = await api
      //   .get('/sales/orders', { headers: { authorization: token } });
      const response = await api
        .get(`/sales/${id}`, { headers: { authorization: token } });
      console.log('response', response.data);

      setSales(response.data);
    };
    getSales();
  }, []);

  useEffect(() => {
    // const [sale] = sales.filter((el) => el.id === Number(id));
    // console.log('sale filteresd', sale);

    setSaleFiltered(sales);
  }, [sales, id]);
  // useEffect(() => {
  //   const socket = io('http://localhost:3001');
  //   socket.emit('getSale', id);
  //   socket.on('takeSale', (response) => {
  //     console.log('SALE', response);
  //     setSale(response);
  //   });
  // }, [id]);
  // const onClick = ({ target }) => {
  //   const socket = io('http://localhost:3000');
  //   const statusValue = { preparo: 'Preparando',
  //     'saiu para entrega': 'Em Trânsito',
  //     Entregue: 'Entregue' };
  //   const status = statusValue[target.value];
  //   socket.emit('sendStatus', { id, status });
  // };
  // const renderButton = () => {
  //   const buttonValue = buttonText[sale.status];
  //   const validateStatus = sale.status === 'Em Trânsito';
  //   if (validateStatus && !path.includes('seller')) {
  //     return (
  //       <button
  //         type="button"
  //         value={ buttonValue }
  //         onClick={ onClick }
  //       >
  //         {buttonValue}

  //       </button>
  //     );
  //   }
  //   if (!validateStatus && path.includes('seller')) {
  //     return (
  //       <button
  //         type="button"
  //         value={ buttonValue }
  //         onClick={ onClick }
  //       >
  //         {buttonValue}
  //       </button>
  //     );
  //   }
  //   return null;
  // };
  if (!saleFiltered) {
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
          {`PEDIDO 0${saleFiltered.id}; `}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {`P. Vend: ${saleFiltered.sellerName}`}
        </h3>
        <h3
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {moment(saleFiltered.saleDate).format('DD/MM/YYYY')}
        </h3>
        <div>
          <h1
            data-testid={ delivery }
          >
            {saleFiltered.status}
          </h1>
        </div>
        {/* { renderButton() } */}
        <button
          type="button"
          /*           onClick={ onClick } */
          data-testid="customer_order_details__button-delivery-check"
          disabled
        >
          Marcar como Entregue
        </button>
      </div>
      <div>
        { saleFiltered.products
          ? <OrdersTable orderList={ saleFiltered.products } /> : null }
        <h1>{'Total: R$ '}</h1>
        <h1
          data-testid="customer_order_details__element-order-total-price"
        >
          { formatPrice(saleFiltered.totalPrice) }
        </h1>
      </div>
    </div>
  );
}
