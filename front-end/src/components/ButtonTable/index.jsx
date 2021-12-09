import React from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

const ButtonTable = ({ dataTestId, nameButton }) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || '';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
  };

  const handleClick = async (e) => {
    const trForDelete = e.target.parentNode.parentNode;
    const email = e.target.parentNode.parentNode.childNodes[2].textContent;
    try {
      const { data: dataUsers } = await api.post('/user/email', { email });
      await api.delete(`/user/${dataUsers.id}`, { headers });
      trForDelete.remove();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <td>
      <button
        type="button"
        data-testid={ dataTestId }
        onClick={ handleClick }
      >
        {nameButton}
      </button>
    </td>
  );
};

ButtonTable.propTypes = {
  dataTestId: PropTypes.PropTypes.string.isRequired,
  nameButton: PropTypes.string.isRequired,
};

export default ButtonTable;
