import React from 'react';
import PropTypes from 'prop-types';
import '../styles/saleCard.css';

function SaleCard({ sale }) {
  const { id, status, saleDate, deliveryAddress } = sale;
  const totalPrice = sale.total_price.replace('.', ',');

  const allDate = saleDate.split('T');
  const thisDate = allDate[0].split('-');
  const newDate = [thisDate[2], thisDate[1], thisDate[0]].join('/');

  return (
    <a
      href={ `/seller/orders/${id}` }
      data-testid={ `seller_orders__element-order-date-${id}` }
    >
      <div className="saleCard">
        <span
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          { `Pedido ${id}` }
        </span>

        <p
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          { status }
        </p>

        <span
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { newDate }
        </span>

        <p>
          R$
          <span
            data-testid={ `seller_orders__element-card-price-${id}` }
          >
            {totalPrice}
          </span>
        </p>

        <p
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { deliveryAddress }
        </p>
      </div>
    </a>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    total_price: PropTypes.string,
    deliveryAddress: PropTypes.string,
  }).isRequired,
};

export default SaleCard;
