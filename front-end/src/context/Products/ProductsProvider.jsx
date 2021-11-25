import React, { useState, useEffect } from 'react';
import { object } from 'prop-types';
import ProductsContext from './ProductsContext';
import { fetchProducts } from '../../utils/API/fetch';

export default function UserProvider({ children }) {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    (async () => {
      // o || [] é só para não crashar quando o back estiver off ¯\_(ツ)_/¯
      const getProducts = (await fetchProducts('token')) || [];
      const newProducts = getProducts.map((product) => ({ ...product, count: 0 }));
      setProducts(newProducts);
    })();
  }, []);

  const BRL = (price) => price
    .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const updateCartTotalPrice = () => {
    let totalPriceCalc = 0;
    const cart = shoppingCart;
    cart.map((item) => {
      totalPriceCalc += item.count * Number(item.price);
      return totalPriceCalc;
    });
    setTotalPrice(totalPriceCalc);
  };

  const updateShoppingCart = (e) => {
    const cart = shoppingCart;
    if (cart.length > 0) {
      if (cart.some((item) => item.id === products[e.target.id - 1].id)) {
        cart.map((item, index) => {
          if (item.id === products[e.target.id - 1].id) {
            item.count = products[e.target.id - 1].count;
            if (item.count === 0) {
              cart.splice(index, 1);
            }
          }
          return false;
        });
      } else {
        cart.push(products[e.target.id - 1]);
      }
    } else {
      cart.push(products[e.target.id - 1]);
    }
    setShoppingCart(cart);
    localStorage.setItem('carrinho', JSON.stringify(shoppingCart));
    updateCartTotalPrice();
  };

  const increment = (e) => {
    products[e.target.id - 1].count += 1;
    updateShoppingCart(e);
    setCount(count + 1);
  };

  const handleChange = (e) => {
    products[e.target.id - 1].count = Number(e.target.value);
    setCount(e.target.value);
    updateShoppingCart(e);
  };

  const decrement = (e) => {
    if (products[e.target.id - 1].count > 0) {
      products[e.target.id - 1].count -= 1;
      updateShoppingCart(e);
      setCount(count - 1);
    }
  };

  const context = {
    count,
    increment,
    decrement,
    products,
    BRL,
    handleChange,
    totalPrice,
    setTotalPrice,
  };
  return (
    <ProductsContext.Provider value={ context }>
      {children}
    </ProductsContext.Provider>
  );
}

UserProvider.propTypes = {
  children: object,
}.isRequired;
