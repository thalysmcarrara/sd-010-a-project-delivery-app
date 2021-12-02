import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import CustomerOrdCard from '../components/CustomerOrdCard';
import * as request from '../services/requests';

function Orders() {
  const [sales, setSales] = useState([]);
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    const localUser = JSON.parse(localStorage.getItem('user'));

    const user = sessionUser || localUser;

    setDataUser(user);

    sessionStorage.setItem('user', JSON.stringify(user));

    const getSale = async () => {
      const saleData = await request.getSales(user);
      setSales(saleData);
    };
    getSale();
  }, []);

  return (
    <section>
      {dataUser && <NavBar dataUser={ dataUser } />}

      <div>
        {Object.values(sales).map((sale) => (
          <CustomerOrdCard
            key={ sale.id }
            sale={ sale }
          />
        ))}
      </div>
    </section>
  );
}

export default Orders;
