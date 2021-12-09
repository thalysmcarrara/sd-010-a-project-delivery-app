import React from 'react';
import { useLocation } from 'react-router-dom';
import CardOrders from '../../components/CardOrders';
import NavBar from '../../components/NavBar/NavBar';
import DetailsSocket from '../../components/DetailsSocket';

export default function OrderDetails() {
  const location = useLocation().pathname;

  return (
    <div>
      <NavBar />
      {
        location.includes('seller')
          ? <DetailsSocket /> : <CardOrders />
      }
    </div>
  );
}
