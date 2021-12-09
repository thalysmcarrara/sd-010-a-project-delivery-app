import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children }) => (
  <table>
    { children }
  </table>
);

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Table;
