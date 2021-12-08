import React, { useEffect, useState } from 'react';
import CardSale from './cardSale';
import api from '../services/api';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const getSales = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      // const path = window.location.href;
      // const url = path.includes('seller')
      //   ? '/seller/sales' : '/user/sales';

      const response = await api
        .get('/sales/orders', { headers: { authorization: token } });

      // console.log(response.data);

      setSales(response.data);
    };
    getSales();
  }, []);
  const renderSales = () => sales.map((sale) => (
    <CardSale key={ sale.id } sale={ sale } />));

  return (
    <div>
      { sales.length > 0 ? renderSales() : null }
    </div>
  );
}
