import React from 'react';
import PropTypes from 'prop-types';

const Thead = ({ theadList }) => (
  <thead>
    <tr>
      {
        theadList.map((thead, index) => (
          <th key={ `${index}_${thead}` }>{ thead }</th>
        ))
      }
    </tr>
  </thead>
);

Thead.propTypes = {
  theadList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Thead;
