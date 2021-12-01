import React, { useContext/* , useState */ } from 'react';
import { arrayOf, shape } from 'prop-types';
import ProductsContext from '../../context/ProductsContext';
import PrecoProduto from './PrecoProduto';
import ImagemProduto from './ImagemProduto';
// import NomeProduto from './NomeProduto';
// import AddItem from './AddItem';
// import QuantidadeItens from './QuantidadeItens';
// import RmItem from './RmItem';
import '../../styles/CardProduct.css';
// import ButtonPrimary from '../ButtonPrimary';
// import ButtonSecondary from '../ButtonSecondary';
// import Label from '../Label';
import useProductManager from '../../hooks/useProductManager';
import './styles.css';

function CardProduto() {
  const { values: { isFetching, productsResult, qntItens },
    actions: { setQntItens } } = useContext(ProductsContext);
  const data = productsResult;
  // const [qntItens, setQntItens] = useState({});
  const [setProduct] = useProductManager();

  const handleChange = ({ target }, price) => {
    const inputValue = Number(target.value);
    if (inputValue >= 0) {
      setQntItens((previous) => ({ ...previous, [target.id]: target.value }));

      const dataProductAdd = {
        id: target.id,
        price,
        inputQuantity: inputValue,
      };
      setProduct(dataProductAdd);
    }
  };

  const handleClickAdd = ({ target }) => {
    const oldQuantity = qntItens[target.id] || 0;
    // console.log(oldQuantity);
    setQntItens((previous) => ({ ...previous, [target.id]: oldQuantity + 1 }));
    const dataProductAdd = {
      id: target.id,
      inputQuantity: oldQuantity + 1,
    };
    setProduct(dataProductAdd);
  };

  const handleClickRm = ({ target }) => {
    const oldQuantity = qntItens[target.id] || 0;
    console.log(oldQuantity);
    if (oldQuantity > 0) {
      setQntItens((previous) => ({ ...previous, [target.id]: oldQuantity - 1 }));
      const dataProductAdd = {
        id: target.id,
        inputQuantity: oldQuantity - 1,
      };
      setProduct(dataProductAdd);
    }
  };

  return !isFetching ? (
    <>
      { data
        .map((product) => (
          <section className="c_input_container" key={ product.id }>
            <PrecoProduto data={ product } />
            <ImagemProduto data={ product } />

            <label
              data-testid={ `customer_products__element-card-title-${product.id}` }
              htmlFor={ product.id }
            >
              { product.name }
            </label>
            <button
              className="c_button_secondary"
              data-testid={ `customer_products__button-card-rm-item-${product.id}` }
              id={ product.id }
              onClick={ handleClickRm }
              type="button"
            >
              -
            </button>
            <input
              data-testid={ `customer_products__input-card-quantity-${product.id}` }
              id={ product.id.toString() }
              onChange={ (e) => handleChange(e, product.price) }
              type="number"
              value={ qntItens[product.id] || 0 }
            />
            <button
              className="c_button_secondary"
              data-testid={ `customer_products__button-card-add-item-${product.id}` }
              id={ product.id }
              onClick={ handleClickAdd }
              type="button"
            >
              +
            </button>

          </section>
        ))}
    </>
  ) : <span>Loading ...</span>;
}

CardProduto.propTypes = {
  data: arrayOf(shape()),
}.isRequired;

export default CardProduto;
