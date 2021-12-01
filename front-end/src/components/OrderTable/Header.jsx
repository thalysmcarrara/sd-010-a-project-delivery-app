import React from 'react';
import { arrayOf, shape } from 'prop-types';

export default function Header({ data }) {
  const headers = data[0];
  return (
    <tr>
      { Object.keys(headers)
        .map((header, index) => (
          <th key={ index }>{ header }</th>
        )) }
    </tr>
  );
}

Header.propTypes = {
  data: arrayOf(shape()),
}.isRequired;
