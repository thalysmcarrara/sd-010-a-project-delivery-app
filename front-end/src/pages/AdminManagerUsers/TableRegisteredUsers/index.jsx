import React from 'react';
import Table from './Table';
import Thead from './Thead';

const TableRegisteredUsers = () => (
  <Table>
    <Thead
      theadList={
        ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir']
      }
    />
  </Table>
);

export default TableRegisteredUsers;
