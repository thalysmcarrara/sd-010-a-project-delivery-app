import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
import { getSaleBySellerId } from '../utils/Data';
import dateFormatation, { priceFormat } from '../utils/Format';
import Header from '../Components/Header';

export default function SellerOrderDetails() {
  const [order, setOrders] = useState([]);
  const [inProgress] = useState(false);
  const [orderReady] = useState(false);

  const LINKS = [
    {
      name: 'PRODUTOS',
      url: '/customer/products',
      testId: 'customer_products__element-navbar-link-products',
    },
    {
      name: 'MEUS PEDIDOS',
      url: '/customer/orders',
      testId: 'customer_products__element-navbar-link-orders',
    },
  ];

  const dataTestIds = {
    labelOrderId: 'seller_order_details__element-order-details-label-order-id',
    deliveryStatus:
      'seller_order_details__element-order-details-label-delivery-status',
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

  // const handleClick = () => {
  //   console.log(order[0].id);
  // };

  const changeStatus = async (saleId) => {
    await statusChange(saleId);
    return update === false ? setUpdate(true) : setUpdate(false);
  };

  useEffect(() => {
    const renderSales = async () => {
      const token = localStorage.getItem('token');
      const result = await getSaleBySellerId(token);
      setOrders(result);
    };
    renderSales();
  }, []);

  // const { sale } = order;
  return (
    <div>
      <Header links={ LINKS } />
      <h1>Detalhes do pedido - vendedor</h1>
      {!order
        ? 'Loading'
        : order.map((sale) => (
          <>
            <div className="card-top-bar" key={ sale.id }>
              <div data-testid={ dataTestIds.labelOrderId }>{sale.id}</div>
              <div
                data-testid={ dataTestIds
                  .orderDate }
              >
                {dateFormatation(sale.saleDate)}
              </div>
              <div data-testid={ dataTestIds.deliveryStatus }>{sale.status}</div>
              <button
                data-testid={ dataTestIds.buttonPreparingCheck }
                name="prepare-order"
                disabled={ inProgress }
                onClick={ () => changeStatus(item.id) }
                type="button"
              >
                PREPARAR PEDIDO
              </button>
              <button
                data-testid={ dataTestIds.buttonDispatchCheck }
                name="deliver-order"
                disabled={ !orderReady }
                onClick={ () => changeStatus(item.id) }
                type="button"
              >
                SAIU PARA ENTREGA
              </button>
            </div>
            <div className="card-list">
              <ul>
                {sale.products.map((product, index) => (
                  <li key={ index }>
                    <div data-testid={ `${dataTestIds.itemNumber}${index}` }>
                      {index + 1}
                    </div>
                    <div data-testid={ `${dataTestIds.tableName}${index}` }>
                      {product.name}
                    </div>
                    <div
                      data-testid={ `${dataTestIds.tableQuantity}${index}` }
                    >
                      {product.saleProduct.quantity}
                    </div>
                    <div
                      data-testid={ `${dataTestIds.tableUnitPrice}${index}` }
                    >
                      {priceFormat(product.price)}
                    </div>
                    <div
                      data-testid={ `${dataTestIds.tableSuTotal}${index}` }
                    >
                      { () => {
                        const result = product.saleProduct.quantity * product.price;
                        console.log(result);
                        return priceFormat(result);
                      }}
                    </div>
                  </li>
                ))}
              </ul>
              <div data-testid={ priceFormat(dataTestIds.totalPrice) }>
                {priceFormat(sale.totalPrice)}
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
