import React from 'react';
import { Link } from 'react-router-dom';

export default function salesCard({ id, status,
  sale_date: saleDate, total_price: total }) {
  return (
    <Link to={ `/customer/orders/${id} ` }>
      <div>
        <p data-testid={ `customer_orders__element-order-id-${id}` }>{ id }</p>
        <p data-testid={ `customer_orders__element-delivery-status-${id}` }>{ status }</p>
        <p data-testid={ `customer_orders__element-order-date-${id}` }>{ saleDate }</p>
        <p>{ total }</p>
      </div>
    </Link>
  );
}