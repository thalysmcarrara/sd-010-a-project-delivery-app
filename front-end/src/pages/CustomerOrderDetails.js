import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import * as requests from '../services/requests';
import OrderDetailsTable from '../components/OrderDetailsTable';

const padsStartValue = 4;
const dataTestIds = {
  37: 'customer_order_details__element-order-details-label-order-id',
  38: 'customer_order_details__element-order-details-label-seller-name',
  39: 'customer_order_details__element-order-details-label-order-date',
  40: 'customer_order_details__element-order-details-label-delivery-status',
  47: 'customer_order_details__button-delivery-check',
};

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
              <span data-testid={ dataTestIds[37] }>
                {order.id.toString().padStart(padsStartValue, '0')}
              </span>
            </p>

            <p>
              {'P. Vend: '}
              <span data-testid={ dataTestIds[38] }>
                { order.seller.name }
              </span>
            </p>

            <p data-testid={ dataTestIds[39] }>{order.saleDate}</p>
            <p data-testid={ dataTestIds[40] }>{order.status}</p>
            <button
              data-testid={ dataTestIds[47] }
              type="button"
              disabled={ statusSale !== 'Em Trânsito' }
              onClick={ () => setStatusSale('Entregue') }
            >
              MARCAR COMO ENTREGUE
            </button>
          </div>
          <OrderDetailsTable products={ order.products } />
          <p>
            {'R$ '}
            <span
              data-testid="customer_order_details__element-order-total-price"
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
