import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import { getSaleBySellerId } from '../utils/Data';
// import { priceFormat } from '../utils/Format';
// import Header from '../Components/Header';

export default function SellerOrderDetails() {
  const [order, setOrders] = useState([]);
  const [inProgress] = useState(false);
  const [orderReady] = useState(false);
  // const user = JSON.parse(localStorage.getItem('user'));
  // const { token } = user;
  // const { id } = useParams;

  const dataTestIds = {
    labelOrderId: 'seller_order_details__element-order-details-label-order-id',
    deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
    orderDate: 'seller_order_details__element-order-details-label-order-date',
    buttonPreparingCheck: 'seller_order_details__button-preparing-check',
    buttonDispatchCheck: 'seller_order_details__button-dispatch-check',
    itemNumber: 'seller_order_details__element-order-table-item-number-',
    tableName: 'seller_order_details__element-order-table-name->',
    tableQuantity: 'seller_order_details__element-order-table-quantity-',
    tableUnitPrice: 'seller_order_details__element-order-table-unit-price-',
    tableSuTotal: 'seller_order_details__element-order-table-sub-total-',
    totalPrice: 'seller_order_details__element-order-total-price',
  };

  const handleClick = () => {
    console.log(order[0].id);
  };

  useEffect(() => {
    const renderSales = async () => {
      const token = localStorage.getItem('token');
      const result = await getSaleBySellerId(token);
      setOrders(result);
    };
    renderSales();
  }, []);

  if (!order) return <p>Loading...</p>;

  // const { id } = order;
  return (
    <div>
      <h1>Detalhes do pedido - vendedor</h1>
      <div className="card-top-bar">
        <div data-testid={ dataTestIds.labelOrderId }>{}</div>
        <div data-testid={ dataTestIds.orderDate }>{ order.saleDate }</div>
        <div data-testid={ dataTestIds.deliveryStatus }>{order.status}</div>
        <button
          data-testid={ dataTestIds.buttonPreparingCheck }
          name="prepare-order"
          disabled={ inProgress }
          onClick={ handleClick }
          type="button"
        >
          PREPARAR PEDIDO
        </button>
        <button
          data-testid={ dataTestIds.buttonDispatchCheck }
          name="deliver-order"
          disabled={ !orderReady }
          onClick={ handleClick }
          type="button"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <div className="card-list">
        <ul>
          {order
            .map(({ description, quantity, unitaryValue, subTotal }, index) => (
              <li key={ index }>
                <div data-testid={ `${dataTestIds.itemNumber}${index}` }>{index}</div>
                <div data-testid={ `${dataTestIds.tableName}${index}` }>
                  {description}
                </div>
                <div data-testid={ `${dataTestIds.tableQuantity}${index}` }>
                  {quantity}
                </div>
                <div data-testid={ `${dataTestIds.tableUnitPrice}${index}` }>
                  {(unitaryValue)}
                </div>
                <div data-testid={ `${dataTestIds.tableSuTotal}${index}` }>
                  {(subTotal)}
                </div>
              </li>
            ))}
        </ul>
        <div data-testid={ dataTestIds.totalPrice }>{(order.totalPrice)}</div>
      </div>
    </div>
  );
}