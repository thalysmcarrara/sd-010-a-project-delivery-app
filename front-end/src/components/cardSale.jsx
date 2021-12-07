import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Status from './status';

export default function CardSale({ sale }) {
  const location = useLocation().pathname;
  const testIdPart = location.includes('seller')
    ? 'seller_orders' : 'customer_products';
  const url = location.includes('seller')
    ? 'seller' : 'costumer';
  console.log(url);
  return (
    <div data-testid={ `customer_orders__element-order-id--${sale.id}` }>
      <Link to={ `/customer/orders/${sale.id}` }>
        <div data-testid={ `${testIdPart}__element-order-date--${sale.id}` }>
          <div>
            <p>Pedido</p>
            <p>{ sale.id }</p>
          </div>
          <div>
            <Status status={ sale.status } />
          </div>
          <div>
            <p>{ sale.saleDate }</p>
            <h1>{ sale.totalPrice }</h1>
          </div>
        </div>
      </Link>
    </div>
  );
}

CardSale.propTypes = {
  sale: PropTypes.objectOf({
    id: PropTypes.number,
    status: PropTypes.string,
    sale_date: PropTypes.string,
    total_price: PropTypes.string,
  }).isRequired,
};
