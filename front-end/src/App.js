import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import CartProvider from './provider/Cart';
import SellerOrders from './pages/SellerOrders';
import Checkout from './pages/Checkout';
import DetailsSell from './pages/DetailsSell';
import Admin from './pages/Admin';

// rotas
import paths from './routesPaths/paths';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ paths.routeMain } exact>
          <Redirect to={ paths.routeLogin } />
        </Route>
        <Route path={ paths.routeLogin } exact component={ Login } />
        <Route path={ paths.routeRegister } exact component={ Register } />
        <Route path={ paths.routeDetailsSell } exact component={ DetailsSell } />
        <Route
          path={ paths.routeSellerOrdersDetails }
          exact
          component={ SellerOrderDetails }
        />
        <Route path={ paths.routeCustomerOrders } exact component={ CustomerOrders } />
        <Route path={ paths.routeSellerOrders } exact component={ SellerOrders } />
        <CartProvider>
          <Route path={ paths.routeProducts } exact component={ Products } />
          <Route path={ paths.routeCheckout } exact component={ Checkout } />
          <Route path={ paths.routeAdmin } exact component={ Admin } />
        </CartProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
