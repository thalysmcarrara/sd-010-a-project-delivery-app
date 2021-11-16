import React, { useContext, useEffect, useState } from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import CartContext from '../contexts/CartContext';

function ProductCard({ product }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  function handleClic(e) {
    if (e.target.innerText === '-' && quantity > 0) {
      setQuantity(quantity - 1);
    } else if (e.target.innerText === '+') {
      setQuantity(quantity + 1);
    }
  }

  function handlecart() {
    if (!cart.find((item) => item.name === product.name)) {
      setCart([...cart, { name: product.name, price: product.price, quantity }]);
    } else {
      const index = cart.findIndex((item) => item.name === product.name);
      setCart([...cart, cart[index].quantity = quantity]);
    }
  }

  useEffect(() => {
    handlecart();
  }, [quantity]);

  return (
    <Card bcart="info" style={ { width: '12rem', alignItems: 'center' } }>
      <Card.Img
        data-testid={ `customer_products__img-card-bg-image-${product.id}` }
        variant="top"
        src={ product.url_image }
        style={ { width: '120px', height: '120px' } }
      />
      <Card.Body>
        <p
          data-testid={ `customer_products__element-card-title-${product.id}` }
        >
          { product.name }
        </p>
        <Card.Text data-testid={ `customer_products__element-card-price-${product.id}` }>
          { `${product.price}` }
        </Card.Text>
        <div className="quantityContainer">
          <Button
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            variant="primary"
            onClick={ (e) => handleClic(e) }
          >
            -
          </Button>
          <input
            type="number"
            value={ quantity }
            className="quantityInput"
            onChange={ (e) => setQuantity(e.target.value) }
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
          />
          <Button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            variant="primary"
            onClick={ (e) => handleClic(e) }
          >
            +
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default ProductCard;