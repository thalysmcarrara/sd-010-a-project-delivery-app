import React from 'react';

export default function FormDetailsAddress() {
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
        />
      </label>
      <label htmlFor="address-number">
        Número
        <input
          data-testid="customer_checkout__input-addressNumber"
          type="text"
          name="address-number"
          placeholder="198"
        />
      </label>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}
