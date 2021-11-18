import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import CustomerCheckout from './pages/CustomerCheckout';
import Orders from './components/Orders';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ CustomerProducts } />
      <Route exact path="/customer/checkout" component={ CustomerCheckout } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/seller/orders" component={ Orders } />
    </Switch>
  );
}

export default App;
