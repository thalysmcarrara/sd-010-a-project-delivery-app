import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import CardSale from './cardSale';
import api from '../services/api';

export default function SalesList() {
  const [sales, setSales] = useState([]);
  const socket = io('http://localhost:3001');
  useEffect(() => {
    const getSales = async () => {
      socket.on('takeSale', (response) => {
        const newArr = sales.filter((sale) => sale.id !== response.id);
        setSales([...newArr, response]);
      });
      const { token } = JSON.parse(localStorage.getItem('user'));
      const response = await api
        .get('/sales/orders', { headers: { authorization: token } });
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
