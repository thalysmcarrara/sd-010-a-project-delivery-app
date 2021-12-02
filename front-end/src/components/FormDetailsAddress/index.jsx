import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import postSale from '../../services/postSale';
import ProductsContext from '../../context/ProductsContext';

export default function FormDetailsAddress() {
  const [addressNumber, setAddressNumber] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const redirect = useNavigate();
  const { values: { totalCart } } = useContext(ProductsContext);

  const handleClick = async () => {
    console.log('botao finalizar pedido');
    const products = JSON.parse(localStorage.getItem('productsCart')) || [];
    console.log('produtos', products);
    // seller id ??????
    const saleData = {
      sellerId: 1,
      totalPrice: totalCart,
      deliveryAddress: inputAddress,
      deliveryNumber: addressNumber,
      products,
    };
    const sale = await postSale(saleData);
    // post retorna id
    console.log(sale);
    const id = 1;
    redirect(`/customer/orders/${id}`);
  };

  return (
    <form>
      <label htmlFor="select-seller">
        P. Vendedora Responsável
        <select
          data-testid="customer_checkout__select-seller"
          type=""
          name="select-seller"
        >
          <option>Selecione</option>
        </select>
      </label>
      <label htmlFor="input-address">
        Endereço
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          name="input-address"
          placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          onChange={ ({ target }) => setInputAddress(target.value) }
        />
      </label>
      <label htmlFor="address-number">
        Número
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="text"
          name="address-number"
          placeholder="198"
          onChange={ ({ target }) => setAddressNumber(target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
