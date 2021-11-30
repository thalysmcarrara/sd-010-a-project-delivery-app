import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { statusChange } from '../utils/Data';
import dateFormatation, { priceFormat } from '../utils/Format';
import Header from '../Components/Header';

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

function sellerOrdersDetails() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const { id } = useParams();

  // const saleId = 'item.products.saleProduct.saleId';

  useEffect(() => {
    const getOrder = async () => {
      const data = await fetch(`http://localhost:3001/orderDetails/${id}`);
      const result = await data.json();
      console.log(result);
      setOrders([result]);
      setIsLoading(false);
    };
    getOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  const dataTestIds = {
    saleId: 'seller_order_details__element-order-details-label-order-id',
    deliveryStatus: 'seller_order_details__element-order-details-label-delivery-status',
    dateOrder: 'seller_order_details__element-order-details-label-order-date',
    prepareOrder: 'seller_order_details__button-preparing-check',
    deliveryOrder: 'seller_order_details__button-dispatch-check',
    indexItem: 'seller_order_details__element-order-table-item-number-',
    itemName: 'seller_order_details__element-order-table-name-',
    itemQuantity: 'seller_order_details__element-order-table-quantity-',
    unitPrice: 'seller_order_details__element-order-table-unit-price-',
    subtotal: 'seller_order_details__element-order-table-sub-total-',
    totalPrice: 'seller_order_details__element-order-total-price',
  };

  const changeStatus = async (saleId) => {
    await statusChange(saleId);
    return update === false ? setUpdate(true) : setUpdate(false);
  };

  return (
    <div>
      <Header links={ LINKS } />
      {isLoading ? 'Loading' : orders.map((item, index) => (
        <div
          key={ index }
        >
          <div>
            <h4>
              Pedido
            </h4>
            <h4
              data-testid={ dataTestIds.saleId }
            >
              { item.id }
            </h4>
            <h4
              data-testid={ dataTestIds.dateOrder }
            >
              { dateFormatation(item.saleDate) }
            </h4>
            <div
              readOnly
              className={ item.status }
              data-testid={ dataTestIds.deliveryStatus }
            >
              { item.status }
            </div>
            <button
              type="button"
              data-testid={ dataTestIds.prepareOrder }
              disabled={ item.status !== 'Pendente' }
              onClick={ () => changeStatus(item.id) }
            >
              PREPARAR PEDIDO
            </button>
            <button
              type="button"
              data-testid={ dataTestIds.deliveryOrder }
              disabled={ item.status !== 'Preparando' }
              onClick={ () => changeStatus(item.id) }
            >
              SAIU PARA ENTREGA
            </button>
            {item.products.map((product, i) => (
              <div
                key={ id }
              >
                <p
                  data-testid={ `${dataTestIds.itemNumber}${i}` }
                >
                  {i + 1}
                </p>
                <p
                  data-testid={ `${dataTestIds.itemName}${i}` }
                >
                  {product.name }
                </p>
                <p
                  data-testid={ `${dataTestIds.itemQuantity}${id}` }
                >
                  {product.saleProduct.quantity }
                </p>
                <p
                  data-testid={ `${dataTestIds.unitPrice}${id}` }
                >
                  { priceFormat(product.price) }
                </p>
                <p
                  data-testid={ `${dataTestIds.subtotal}${id}` }
                >
                  { () => {
                    const result = product.saleProduct.quantity * product.price;
                    return priceFormat(result);
                  }}
                </p>
              </div>
            ))}
            <h4
              data-testid={ dataTestIds.totalPrice }
            >
              { priceFormat(item.price) }
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default sellerOrdersDetails;
