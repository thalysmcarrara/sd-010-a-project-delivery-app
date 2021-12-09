export default (users) => {
  const serializeUsers = (userData) => userData.role !== 'administrator';
  const serializeChangeType = (userData) => {
    const userRole = userData.role === 'seller' ? 'P. Vendedora' : 'Cliente';
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userRole,
    };
  };

  const UsersFiltered = users.filter((user) => serializeUsers(user))
    .map((user) => serializeChangeType(user));

  return UsersFiltered;
};
