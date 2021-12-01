import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';
import CardProduto from '../components/CardProduto/CardProduto';
import '../styles/ProdutosClientes.css';
import ProductsContext from '../context/ProductsContext';
// import ButtonCart from '../components/ButtonCart/ButtonCart';
import ButtonPrimary from '../components/ButtonPrimary';

function ProdutosClientes() {
  const { values: { totalCart } } = useContext(ProductsContext);
  const formatedValue = totalCart.toFixed(2).replace('.', ',');
  const [disabledBtn, setDisabledBtn] = useState(true);
  const redirect = useNavigate();
  const handleClick = () => {
    redirect('/customer/checkout');
  };

  useEffect(() => {
    if (totalCart > 0) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [totalCart]);
  return (
    <>
      <NavBar />
      <main className="main-cards">
        <CardProduto checkout={ setDisabledBtn } />
      </main>
      {/*  <ButtonCart /> */}
      <ButtonPrimary
        data-testid="customer_products__button-cart"
        disabled={ disabledBtn }
        type="submit"
        onClick={ handleClick }
        name="Ver Carrinho:"
      />
      <span
        data-testid="customer_products__checkout-bottom-value"
        className="c_span_total"
      >
        { formatedValue }
      </span>
    </>
  );
}

export default ProdutosClientes;
