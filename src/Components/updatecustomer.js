import React, { useState } from 'react';
import axios from 'axios';
import './update.css';

const CustomerDetails = () => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const handleCustomerNumberChange = (e) => {
    setCustomerNumber(e.target.value);
  };



const fetchCustomerDetails = async () => {
    try {
      const BASE_URL = 'http://localhost:8000';
      const response = await axios.get(`${BASE_URL}/customers/customers/?customer_number=${customerNumber}`);
      
      if (response.data.length > 0) {
        const filteredData = response.data.filter(customer => customer.customer_number === customerNumber);
        if (filteredData.length > 0) {
          setCustomerData(filteredData[0]); // Set customer data after filtering
        } else {
          setCustomerData(null); // Reset customer data if not found
          console.log('Customer not found');
        }
      } else {
        setCustomerData(null); // Reset customer data if no response data
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      // Handle error (show error message, etc.)
    }
  };


  const handleUpdateClick = async () => {
    try {
      const BASE_URL = 'http://localhost:8000';
      await axios.put(`${BASE_URL}/customers/customers/${customerData.id}/`, customerData);
      console.log('Customer details updated');
      // Optionally, you can reset the fetched customerData or perform other actions after successful update
    } catch (error) {
      console.error('Error updating customer details:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleDeleteClick = async () => {
    try {
      const BASE_URL = 'http://localhost:8000';
      await axios.delete(`${BASE_URL}/customers/customers/${customerData.id}/`);
      console.log('Customer details deleted');
      setCustomerData(null); // Reset customer data after successful deletion
    } catch (error) {
      console.error('Error deleting customer details:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  return (
    <div>
      <h2>Enter Customer Number to Fetch Details</h2>
      <div>
        <label htmlFor="customerNumber">Customer Number:</label>
        <input
          type="text"
          id="customerNumber"
          name="customerNumber"
          value={customerNumber}
          onChange={handleCustomerNumberChange}
          required
        />
        <button type="button" onClick={fetchCustomerDetails}>
          Fetch Details
        </button>
      </div>
      

      {customerData && (
        <div>
          <h2>Customer Details</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={customerData.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={customerData.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="customer_number">Customer Number:</label>
            <input
              type="text"
              id="customer_number"
              name="customer_number"
              value={customerData.customer_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="meter_serial_number">Meter Serial Number:</label>
            <input
              type="text"
              id="meter_serial_number"
              name="meter_serial_number"
              value={customerData.meter_serial_number}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;

