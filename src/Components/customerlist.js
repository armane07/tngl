import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers data when component mounts
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const BASE_URL = 'http://localhost:8000';
      const response = await axios.get(`${BASE_URL}/customers/customers/`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleDeleteClick = async (customerId) => {
    try {
      const BASE_URL = 'http://localhost:8000';
      await axios.delete(`${BASE_URL}/customers/customers/${customerId}/`);
      console.log(`Customer ${customerId} deleted`);
      // Update the list after successful deletion
      fetchCustomers();
    } catch (error) {
      console.error(`Error deleting customer ${customerId}:`, error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div>
      <h2>Customers List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Customer Number</th>
            <th>Meter Serial Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.customer_number}</td>
              <td>{customer.meter_serial_number}</td>
              <td>
                <button onClick={() => handleDeleteClick(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersList;
