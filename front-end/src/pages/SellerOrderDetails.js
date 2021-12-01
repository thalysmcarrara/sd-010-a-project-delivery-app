import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import * as requests from '../services/requests';
import OrderDetailsTable from '../components/OrderDetailsTable';

const padsStartValue = 4;
const dataTestIds = {
  54: 'seller_order_details__element-order-details-label-order-id',
  55: 'seller_order_details__element-order-details-label-delivery-status',
  56: 'seller_order_details__element-order-details-label-order-date',
  57: 'seller_order_details__button-preparing-check',
  58: 'seller_order_details__button-dispatch-check',
};

export default function SellerOrderDetails({ match }) {
  const [order, setOrder] = useState();
  const dataUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getSale = async () => {
      const {
        params: { id },
      } = match;
      const sale = await requests.getSaleById(dataUser.token, id);
      console.log(sale);
      setOrder(sale);
    };
    getSale();
  }, []);

  return (
    <section>
      <NavBar dataUser={ dataUser } />

      {order && (
        <div>
          <div>
            <p>
              {'PEDIDO '}
              <span data-testid={ dataTestIds[54] }>
                {order.id.toString().padStart(padsStartValue, '0')}
              </span>
            </p>
            <p data-testid={ dataTestIds[55] }>{order.saleDate}</p>
            <p data-testid={ dataTestIds[56] }>{order.status}</p>
            <button data-testid={ dataTestIds[57] } type="button">
              Preparar Pedido
            </button>
            <button data-testid={ dataTestIds[58] } type="button">
              Saiu para entrega
            </button>
          </div>
          <OrderDetailsTable products={ order.products } />
          <p>
            {'R$ '}
            <span
              data-testid="seller_order_details__element-order-total-price"
            >
              {order.totalPrice.replace('.', ',')}
            </span>
          </p>
        </div>
      )}
    </section>
  );
}

SellerOrderDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
