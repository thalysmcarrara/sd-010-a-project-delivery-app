import React, { useContext } from 'react';
import { arrayOf, shape } from 'prop-types';
import useProductManager from '../../hooks/useProductManager';
import ProductsContext from '../../context/ProductsContext';
import formatPrice from '../../utils/formatPrice';

export default function Body() {
  const products = JSON.parse(localStorage.getItem('productsCart')) || [];
  const [setProduct] = useProductManager();
  const { actions: { setQntItens } } = useContext(ProductsContext);

  const handleClickRm = (id) => {
    setQntItens((previous) => ({ ...previous, [id]: 0 }));
    const dataProductAdd = {
      id,
      inputQuantity: 0,
    };
    setProduct(dataProductAdd);
  };

  return (
    <tbody>
      { products.map((product, index) => (
        <tr key={ index }>
          <td
            data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
          >
            { index + 1 }
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-name-${index}` }
          >
            { product.name }
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
          >
            { product.quantity }
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
          >
            { formatPrice(product.price) }
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
          >
            { formatPrice(product.total) }
          </td>
          <td
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          >
            <button
              onClick={ () => handleClickRm(product.id) }
              type="button"
            >
              Remover Item
            </button>
          </td>
        </tr>
      )) }
    </tbody>

  );
}

Body.propTypes = {
  data: arrayOf(shape()),
}.isRequired;
