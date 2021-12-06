import { useContext } from 'react';
import ProductsContext from '../context/ProductsContext';

const productData = ({ id, name, price, inputQuantity }) => {
  const updateProd = {
    id,
    name,
    quantity: inputQuantity,
    price,
    total: inputQuantity * price,
  };

  return updateProd;
};

const useProductManager = () => {
  const { values: { productsResult } } = useContext(ProductsContext);

  const setProduct = (data) => {
    const { id, inputQuantity } = data;
    const [{ price, name }] = productsResult.filter((prod) => prod.id === Number(id));

    const productsCartLS = JSON.parse(localStorage.getItem('productsCart')) || [];
    let updatedDataProduct = {};

    const productIndex = productsCartLS.findIndex((item) => item.id === id);

    if (productIndex < 0) {
      updatedDataProduct = productData({
        id, name, price, inputQuantity });

      productsCartLS.push(updatedDataProduct);
      localStorage.setItem('productsCart', JSON.stringify(productsCartLS));
    } else {
      const newShopCart = productsCartLS;
      if (inputQuantity === 0) {
        newShopCart.splice(productIndex, 1);
        localStorage.setItem('productsCart', JSON.stringify(newShopCart));
      } else {
        updatedDataProduct = productData({
          id, name, price, inputQuantity });
        newShopCart.splice(productIndex, 1, updatedDataProduct);
        localStorage.setItem('productsCart', JSON.stringify(newShopCart));
      }
    }
  };

  return [setProduct];
};

export default useProductManager;
