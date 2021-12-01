import { useContext } from 'react';
import ProductsContext from '../context/ProductsContext';

// const quantityToOperation = ({ operation, inputQuantity }) => {
//   let newQuantity = 0;

//   switch (operation) {
//   case 'add':
//     newQuantity = inputQuantity + 1;
//     break;
//   case 'rm':
//     newQuantity = inputQuantity - 1;
//     break;
//   default:
//     newQuantity = inputQuantity;
//     break;
//   }

//   return newQuantity;
// };

const productData = ({ id, price, inputQuantity }) => {
  // const calcQuantity = quantityToOperation({ operation, inputQuantity });

  const updateProd = {
    id,
    quantity: inputQuantity,
    price,
    total: inputQuantity * price,
  };

  return updateProd;
};

const useProductManager = () => {
  const { values: { productsResult } } = useContext(ProductsContext);

  const setProduct = (data) => {
    const { id, /* price, */ inputQuantity } = data;
    const [{ price }] = productsResult.filter((prod) => prod.id === Number(id));
    // console.log(id, typeof (price));
    const productsCartLS = JSON.parse(localStorage.getItem('productsCart')) || [];
    // id do produto, preço do produto, op: add/rm/change, inputyQuantity valor digitado
    let updatedDataProduct = {};
    // objeto que recebe o prod alterado
    const productIndex = productsCartLS.findIndex((item) => item.id === id);
    console.log(productsCartLS);
    // verificar se o produto esta no carrinho
    if (productIndex < 0) {
      // caso não esteja insere no estado
      updatedDataProduct = productData({
        id, price, inputQuantity });

      productsCartLS.push(updatedDataProduct);
      localStorage.setItem('productsCart', JSON.stringify(productsCartLS));
      // setProductsCart((products) => [...products, updatedDataProduct]);
    } else {
      const newShopCart = productsCartLS;
      // const actualQuantity = productsCart[productIndex].quantity;
      // console.log('actual quant', actualQuantity);
      // console.log(data);
      if (inputQuantity === 0) {
        newShopCart.splice(productIndex, 1);
        localStorage.setItem('productsCart', JSON.stringify(newShopCart));
        console.log('dentro if', newShopCart);
      } else {
        updatedDataProduct = productData({
          id, price, inputQuantity });
        // newShopCart[productIndex] = updatedDataProduct;
        newShopCart.splice(productIndex, 1, updatedDataProduct);
        localStorage.setItem('productsCart', JSON.stringify(newShopCart));

        console.log('fora do if', newShopCart);
      }
      // setProductsCart(() => newShopCart);
    }
  };

  return [setProduct];
};

export default useProductManager;
