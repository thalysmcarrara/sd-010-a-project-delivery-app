import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Status from './status';

export default function CardSale({ sale }) {
  const location = useLocation().pathname;
  const testIdPart = location.includes('seller')
    ? 'seller_orders' : 'customer_orders';
  const url = location.includes('seller')
    ? 'seller' : 'customer';
  // console.log(url);

  return (
    <div>
      <Link to={ `/${url}/orders/${sale.id}` }>
        <div>
          <div>
            <p>Pedido</p>
            <p
              data-testid={ `${testIdPart}__element-order-id--${sale.id}` }
            >
              { sale.id }
            </p>
          </div>
          <div>
            <Status status={ sale.status } id={ sale.id } />
          </div>
          <div>
            <p
              data-testid={ `${testIdPart}__element-order-date--${sale.id}` }
            >
              { new Intl.DateTimeFormat('pt-BR').format(new Date(sale.saleDate)) }
            </p>
            <h1
              data-testid={ `${testIdPart}__element-card-price--${sale.id}` }
            >
              { sale.totalPrice.replace(/\./, ',') }
            </h1>
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
