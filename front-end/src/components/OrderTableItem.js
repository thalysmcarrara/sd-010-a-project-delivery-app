import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const dataTestIds = (index) => ({
  59: `seller_order_details__element-order-table-item-number-${index}`,
  60: `seller_order_details__element-order-table-name-${index}`,
  61: `seller_order_details__element-order-table-quantity-${index}`,
  62: `seller_order_details__element-order-table-unit-price-${index}`,
  63: `seller_order_details__element-order-table-sub-total-${index}`,
});

const dataTestIdsCustomer = (index) => ({
  41: `customer_order_details__element-order-table-item-number-${index}`,
  42: `customer_order_details__element-order-table-name-${index}`,
  43: `customer_order_details__element-order-table-quantity-${index}`,
  44: `customer_order_details__element-order-table-sub-total-${index}`,
  45: `customer_order_details__element-order-total-price-${index}`,
});

export default function OrderTableItem({ product, index }) {
  const [customerTable, setCustomerTable] = useState(false);
  const [sellerTable, setSellerTable] = useState(false);
  const [dataUser, setDataUser] = useState();

  const formatPrice = (price) => price.replace('.', ',');
  const subTotal = parseFloat(
    product.SaleProduct.quantity * product.price,
  ).toFixed(2);

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const localUser = JSON.parse(localStorage.getItem('user'));

    const user = sessionUser || localUser;

    setDataUser(user);
  }, []);

  useEffect(() => {
    if (dataUser) {
      if (dataUser.role === 'customer') setCustomerTable(true);
      if (dataUser.role === 'seller') setSellerTable(true);
    }
  }, [dataUser]);

  return (
    <>
      {
        customerTable && (
          <tr>
            <td data-testid={ dataTestIdsCustomer(index)[41] }>{index + 1}</td>
            <td data-testid={ dataTestIdsCustomer(index)[42] }>{product.name}</td>
            <td data-testid={ dataTestIdsCustomer(index)[43] }>
              {product.SaleProduct.quantity}
            </td>
            <td data-testid={ dataTestIdsCustomer(index)[44] }>
              {formatPrice(product.price)}
            </td>
            <td data-testid={ dataTestIdsCustomer(index)[45] }>
              {formatPrice(subTotal)}
            </td>
          </tr>
        )
      }
      {
        sellerTable && (
          <tr>
            <td data-testid={ dataTestIds(index)[59] }>{index + 1}</td>
            <td data-testid={ dataTestIds(index)[60] }>{product.name}</td>
            <td data-testid={ dataTestIds(index)[61] }>
              {product.SaleProduct.quantity}
            </td>
            <td data-testid={ dataTestIds(index)[62] }>
              {formatPrice(product.price)}
            </td>
            <td data-testid={ dataTestIds(index)[63] }>{formatPrice(subTotal)}</td>
          </tr>
        )
      }
    </>
  );
}

OrderTableItem.propTypes = {
  product: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
