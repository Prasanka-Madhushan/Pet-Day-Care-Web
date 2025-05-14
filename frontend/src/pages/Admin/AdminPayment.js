import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPayment = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/admin');
        setPayments(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch payments');
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Payment Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.orderId}</td>
              <td>{payment.customer.name}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.paymentMethod}</td>
              <td className={`status-${payment.status}`}>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPayment;