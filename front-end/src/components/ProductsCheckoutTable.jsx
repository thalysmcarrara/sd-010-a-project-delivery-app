import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

function ProductsCheckoutTable({ checkoutCart }) {
  const rows = checkoutCart;
  function getSubTotal(params) {
    const unitPrice = params.getValue(params.id, 'value');
    const totalQuantity = params.getValue(params.id, 'quantity');
    return unitPrice * totalQuantity;
  }

  const formatValue = (value) => `R$ ${value}`;

  const tableColumns = [
    {
      field: 'id',
      headerName: 'Item',
      flex: 0.25,
      type: 'number',
      renderCell: (params) => (
        <span
          data-testid={
            `customer_checkout__element-order-table-item-number-${params.id - 1}`
          }
        >
          {params.value}
        </span>),
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <span
          data-testid={ ` customer_checkout__element-order-table-name-${params.id - 1}` }
        >
          {params.value}
        </span>),
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      type: 'number',
      flex: 0.25,
      renderCell: (params) => (
        <span
          data-testid={
            ` cutomer_checkout__element-order-table-quantity-${params.id - 1}`
          }
        >
          {params.value}
        </span>),
    },
    {
      field: 'value',
      headerName: 'Valor Unitário',
      flex: 0.25,
      type: 'number',
      renderCell: (params) => (
        <span
          data-testid={
            ` customer_checkout__element-order-table-unit-price-${params.id - 1}`
          }
        >
          {formatValue(params.value)}
        </span>),
    },
    {
      field: 'subtotal',
      headerName: 'SubTotal',
      flex: 0.25,
      valueGetter: getSubTotal,
      renderCell: (params) => (
        <span
          data-testid={
            ` customer_checkout__element-order-table-sub-total-${params.id - 1}`
          }
        >
          {formatValue(params.value)}
        </span>),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 90,
      renderCell: (params) => (
        <button
          type="button"
          onClick={ () => console.log('click') }
          data-testid={
            ` customer_checkout__element-order-table-remove-${params.id - 1}`
          }
        >
          <Delete />
        </button>),
    },
  ];
  return (
    <div
      style={ {
        width: '80%',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 400,
      } }
    >
      <DataGrid
        rows={ rows }
        columns={ tableColumns }
        pageSize={ 11 }
        // autoHeight
        disableSelectionOnClick
        disableMultipleSelection
        disableColumnMenu
        rowHeight={ 35 }
      />
    </div>
  );
}

export default ProductsCheckoutTable;

ProductsCheckoutTable.propTypes = {
  checkoutCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    value: PropTypes.number,
  })).isRequired,
};
