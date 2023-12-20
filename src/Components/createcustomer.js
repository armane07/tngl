import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const CreateCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    customer_number: '',
    meter_serial_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCustomerData = await createCustomer(formData);
      console.log('New customer created:', newCustomerData);
      // Additional logic after creating customer (e.g., reset form, update state)
    } catch (error) {
      console.error('Error creating customer:', error);
      // Handle error (show error message, etc.)
    }
  };

  const createCustomer = async (customerData) => {
    try {
      const BASE_URL = 'http://localhost:8000';
      const response = await axios.post(`${BASE_URL}/customers/customers/`, customerData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Error creating customer');
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-5">Create New Customer</h2>
      <form onSubmit={handleSubmit} className="custom-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customer_number">Customer Number:</label>
          <input
            type="text"
            className="form-control"
            id="customer_number"
            name="customer_number"
            value={formData.customer_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="meter_serial_number">Meter Serial Number:</label>
          <input
            type="text"
            className="form-control"
            id="meter_serial_number"
            name="meter_serial_number"
            value={formData.meter_serial_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary">Create Customer</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCustomer;
