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

const situations = ['Pendente', 'Preparando', 'Em Trânsito', 'Entregue'];

const statusDisablePrepare = [situations[1], situations[2], situations[3]];
const statusDisableOut = [situations[0], situations[2], situations[3]];
const indexOfNotFound = -1;

export default function SellerOrderDetails({ match }) {
  const [order, setOrder] = useState();
  const [statusSale, setStatusSale] = useState('Pendente');
  const dataUser = JSON.parse(localStorage.getItem('user'));

  const {
    params: { id },
  } = match;

  useEffect(() => {
    const getSale = async () => {
      const sale = await requests.getSaleById(dataUser.token, id);
      setOrder(sale);
      setStatusSale(sale.status);
    };
    getSale();
  }, []);

  useEffect(() => {
    const updateSale = async () => {
      if (statusSale !== 'Pendente') {
        const sale = await requests.updateSale(dataUser.token, id, {
          status: statusSale,
        });
        setOrder(sale);
        setStatusSale(sale.status);
      }
    };
    updateSale();
  }, [statusSale]);

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
            <p data-testid={ dataTestIds[56] }>{order.saleDate}</p>
            <p data-testid={ dataTestIds[55] }>{order.status}</p>
            <button
              data-testid={ dataTestIds[57] }
              type="button"
              onClick={ () => setStatusSale('Preparando') }
              disabled={
                statusDisablePrepare.indexOf(statusSale) !== indexOfNotFound
              }
            >
              Preparar Pedido
            </button>
            <button
              data-testid={ dataTestIds[58] }
              onClick={ () => setStatusSale('Em Trânsito') }
              disabled={
                statusDisableOut.indexOf(statusSale) !== indexOfNotFound
              }
              type="button"
            >
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
