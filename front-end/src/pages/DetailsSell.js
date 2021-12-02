import React, { useContext } from 'react';
import NavBar from '../components/NavBar';
import { CartContext } from '../context/cart';

function DetailsSell() {
  const { saleDetail } = useContext(CartContext);
  console.log(saleDetail);

  // const detailsSale = {

  // }

  // const detailsSaleProducts = saleDetail.pro
  return (
    <main>
      <section>
        <NavBar />
      </section>
      <h1>Detalhe do Pedido</h1>
      <tr>
        <td
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          Pedido
        </td>
        <td
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Pessoa Vendedora
        </td>
        <td
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          data
        </td>
        <td
          data-testid={ `customer_order_details__
          element-order-details-label-delivery-status` }
        >
          status
        </td>
        <td>
          <button
            data-testid="customer_order_details__button-delivery-check"
            type="button"
          >
            Marcar Como Entregue
          </button>
        </td>
      </tr>
      {/* <tr>
        <td
          data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
        >
          { index + 1}
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-name-${index}` }
        >
          { name }
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
        >
          { quantity }
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
        >
          { unitPrice.replace('.', ',') }
        </td>
        <td
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          { subTotal.replace('.', ',') }
        </td>
    </tr> */}
    </main>
  );
}

export default DetailsSell;
