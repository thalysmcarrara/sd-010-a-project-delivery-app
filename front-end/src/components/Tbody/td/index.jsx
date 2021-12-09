import React from 'react';
import PropTypes from 'prop-types';

const Td = ({ dataTestId, data }) => (
  <td data-testid={ dataTestId }>
    {data}
  </td>
);

Td.propTypes = {
  dataTestId: PropTypes.PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default Td;
