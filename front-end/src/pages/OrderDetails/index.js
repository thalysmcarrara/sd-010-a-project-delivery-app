import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import StyledOrderDetails from './styles';
import ProductTable from '../../components/ProductTable';
import Navbar from '../../components/Navbar';
import SellerDetails from './components/SellerDetails';
import { requestSale } from '../../services/api';
import convertPrice from '../../utils/convertPrice';

const OrderDetails = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState('');
  const [sale, setSale] = useState({});
  const [products, setProducts] = useState([]);

  const getSale = useCallback(
    async (token) => {
      const result = await requestSale(token, id);
      console.log('product', result.sale.sale.products);
      const mappedProducts = result.sale.sale.products.map(
        ({ name, saleProduct: { quantity }, price }) => ({
          name,
          quantity,
          price,
        }),
      );

      setSale(result.sale.sale);
      setProducts(mappedProducts);
      setSeller(result.sale.user.name);
    },
    [id],
  );

  useEffect(() => {
    const { token } = JSON.parse(localStorage.user);
    getSale(token);
  }, [getSale]);

  return (
    <StyledOrderDetails>
      <div>
        <Navbar
          username="Mockranio"
          productPath="/customer/products"
          orderPath="/customer/orders"
        />

        <SellerDetails sale={ sale } sellerName={ seller } />

        <div className="product-table-container">
          <ProductTable
            page="order_details"
            userRole="customer"
            products={ products }
          />

          <div className="total-container">
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              {convertPrice(sale.total_price)}

            </span>
          </div>
        </div>
      </div>
    </StyledOrderDetails>
  );
};
export default OrderDetails;