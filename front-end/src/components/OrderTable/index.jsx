import React from 'react';
// import Body from './Body';
import Header from './Header';

export default function OrderTable() {
  const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
  return (
    <table>
      <thead>
        <Header data={ productsCart } />
      </thead>
      <tbody>
        {/* <Body data={ productsCart } /> */}
      </tbody>
    </table>
  );
}
