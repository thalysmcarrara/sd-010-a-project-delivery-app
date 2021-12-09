import React from 'react';
// import React, { useEffect } from 'react';
import Table from '../../../components/Table';
import Tbody from '../../../components/Tbody';
import Thead from '../../../components/Thead';
import useManagerUsersContext from '../../../hooks/useManagerUsersContext';
import usersSerializeFiltered from '../../../utils/usersSerializeFiltered';

const TableRegisteredUsers = () => {
  const { users } = useManagerUsersContext();

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const arrayUsers = usersSerializeFiltered(users);

  return (
    <Table>
      <Thead
        theadList={
          ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir']
        }
      />
      <Tbody tbodyList={ arrayUsers } />
    </Table>
  );
};

export default TableRegisteredUsers;
