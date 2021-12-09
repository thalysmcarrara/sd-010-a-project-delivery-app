import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import moment from 'moment-timezone';

import OrdersTable from '../OrdersTable';
import api from '../../services/api';
import formatPrice from '../../utils/formatPrice';

export default function CardOrdersSeller() {
  const { id } = useParams();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const response = await api
        .get(`/sales/${id}`, { headers: { authorization: token } });

      setSales(response.data);
    };
    getSales();
  }, []);

  if (!sales) {
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
          {`PEDIDO 0${sales.id}; `}
        </h3>
        {/* <h3
          data-testid="seller_order_details__element-order-details-label-seller-name"
        >
          {`P. Vend: ${sales.sellerName}`}
        </h3> */}
        <h3
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          {moment(sales.saleDate).format('DD/MM/YYYY')}
        </h3>
        <div>
          <h1
            data-testid={ delivery }
          >
            {sales.status}
          </h1>
        </div>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div>
        { sales.products
          ? <OrdersTable orderList={ sales.products } /> : null }
        <h1>{'Total: R$ '}</h1>
        <h1
          data-testid="seller_order_details__element-order-total-price"
        >
          { formatPrice(sales.totalPrice) }
        </h1>
      </div>
    </div>
  );
}
