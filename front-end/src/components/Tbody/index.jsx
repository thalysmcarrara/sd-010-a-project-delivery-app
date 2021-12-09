import React from 'react';
import PropTypes from 'prop-types';
import Td from './td';
import ButtonTable from '../ButtonTable';

const Tbody = ({ tbodyList }) => (
  <tbody>
    {
      tbodyList.map(({ email, name, role }, index) => (
        <tr key={ `${index}_${name}` }>
          <Td
            data={ index + 1 }
            dataTestId={ `admin_manage__element-user-table-item-number-<${index}>}` }
          />

          <Td
            data={ name }
            dataTestId={ `admin_manage__element-user-table-name-<${index}>` }
          />

          <Td
            data={ email }
            dataTestId={ `admin_manage__element-user-table-email-<${index}>` }
          />

          <Td
            data={ role }
            dataTestId={ `admin_manage__element-user-table-role-<${index}>` }
          />

          <ButtonTable
            dataTestId={ `admin_manage__element-user-table-remove-<${index}>` }
            nameButton="Excluir"
          />
        </tr>
      ))
    }
  </tbody>
);

Tbody.propTypes = {
  tbodyList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  })).isRequired,
};

export default Tbody;
