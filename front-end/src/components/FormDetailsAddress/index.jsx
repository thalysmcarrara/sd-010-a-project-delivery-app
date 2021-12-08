import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import postSale from '../../services/postSale';
import ProductsContext from '../../context/ProductsContext';
import getAllUsers from '../../services/getAllUsers';

export default function FormDetailsAddress() {
  const [addressNumber, setAddressNumber] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [seller, setSeller] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const redirect = useNavigate();
  const { values: { totalCart }, actions: { setQntItens, setTotalCart } } = useContext(ProductsContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsFetching(true);
    getAllUsers()
      .then((response) => setUsers(response))
      .catch((error) => console.log(error.message))
      .finally(() => setIsFetching(false));
  }, []);

  const handleClick = async () => {
    const products = JSON.parse(localStorage.getItem('productsCart')) || [];
    const user = JSON.parse(localStorage.getItem('user'));
    const sellerId = !seller ? users
      .filter((userSel) => userSel.role === 'seller')[0].id : seller;
    const saleData = {
      userId: user.userId,
      sellerId,
      totalPrice: totalCart,
      deliveryAddress: inputAddress,
      deliveryNumber: addressNumber,
      products,
    };
    const sale = await postSale(saleData);
    // post retorna id
    console.log(sale);
    // const id = 1;
    await setQntItens({});
    await setTotalCart(0);
    redirect(`/customer/orders/${sale.id}`);
  };

  return (
    <form>
      <label htmlFor="select-seller">
        P. Vendedora Responsável
        {
          !isFetching && (
            <select
              data-testid="customer_checkout__select-seller"
              type=""
              name="select-seller"
              onChange={ ({ target }) => setSeller(target.value) }
            >
              { users
                .filter((user) => user.role === 'seller')
                .map((userSeller) => (
                  <option
                    value={ userSeller.id }
                    key={ userSeller.id }
                  >
                    { userSeller.name }
                  </option>
                ))}
            </select>
          )
        }
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
