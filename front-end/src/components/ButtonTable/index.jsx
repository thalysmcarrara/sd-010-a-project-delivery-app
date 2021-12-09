import React from 'react';
import PropTypes from 'prop-types';
// import useManagerUsersContext from '../../hooks/useManagerUsersContext';
// import usersSerializeFiltered from '../../utils/usersSerializeFiltered';

const ButtonTable = ({ dataTestId, data }) => {
  // const { users } = useManagerUsersContext();

  // const ArrayUsers = usersSerializeFiltered(users);
  // console.log(ArrayUsers);
  console.log('123');
  return (
    <td>
      <button
        type="button"
        data-testid={ dataTestId }
      >
        {data}
      </button>
    </td>
  );
};

ButtonTable.propTypes = {
  dataTestId: PropTypes.PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default ButtonTable;
