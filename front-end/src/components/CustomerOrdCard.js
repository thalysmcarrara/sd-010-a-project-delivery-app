import React from 'react';
import PropTypes from 'prop-types';
import '../styles/saleCard.css';

function SaleCard({ sale }) {
  const { id, status, saleDate } = sale;

  const allDate = saleDate.split('T');
  const thisDate = allDate[0].split('-');
  const newDate = [thisDate[2], thisDate[1], thisDate[0]].join('/');

  return (
    <a
      href={ `/customer/orders/${id}` }
      data-testid={ `customer_products__element-order-date-${id}` }
    >
      <div className="saleCard">
        <span
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { `Pedido ${id}` }
        </span>

        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>

        <span
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { newDate }
        </span>
      </div>
    </a>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
  }).isRequired,
};

export default SaleCard;
