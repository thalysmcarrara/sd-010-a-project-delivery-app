import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Auth from '../pages/Auth';
import Seller from '../pages/SellerPage';
import ProductsList from '../pages/customer/Products';
import ProtectedRoute from './ProtectedRoute';
import Checkout from '../pages/customer/Checkout';
import Orders from '../pages/customer/Orders';
import OrderDetails from '../pages/customer/OrderDetails';

export default function Routes() {
  return (
    <Switch>
      <Route path={ ['/login', '/register'] } component={ Auth } />
      <ProtectedRoute path={ ['/customer', '/'] }>
        <NavBar />
        <Route path="/seller/orders" component={ Seller } />
        <Route path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/customer/orders" component={ Orders } />
        <Route path="/customer/checkout" component={ Checkout } />
        <Route path="/customer/products" component={ ProductsList } />
        <Route exact path="/" render={ () => <Redirect to="/customer/products" /> } />
      </ProtectedRoute>
    </Switch>
  );
}
