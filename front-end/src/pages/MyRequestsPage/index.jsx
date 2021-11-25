import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import RequestCard from '../../components/RequestCard';
import fetchSales from '../../services/MyRequestsPage/fetchSales';
import { dataTestIdsClientMyRequest } from '../../utils/dataTestIds';
import formatDate from '../../utils/formatDate';
import styles from './styles.module.css';

export default function MyRequestsPage() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const data = await fetchSales();
      setSales(data);
    };
    getSales();
  }, []);

  return (
    <main className={ styles.container }>
      <Header />
      <section className={ styles.requestsContainer }>
        {sales.map((sale) => (
          <Link key={ sale.id } to={ `/customer/orders/${sale.id}` }>
            <RequestCard
              dataTestId={ dataTestIdsClientMyRequest }
              requestId={ sale.id }
              status={ sale.status }
              date={ formatDate(sale.saleDate) }
              price={ sale.totalPrice }
            />
          </Link>
        ))}
      </section>
    </main>
  );
}