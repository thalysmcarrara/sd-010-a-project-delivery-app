import React from 'react';
import FormRegisterUser from './FormRegisterUser';
import TableRegisteredUsers from './TableRegisteredUsers';
import './styles.css';

const AdminManagerUsers = () => (
  <main className="c_adminManagerUsersPage">
    <FormRegisterUser />
    <TableRegisteredUsers />
  </main>
);

export default AdminManagerUsers;
