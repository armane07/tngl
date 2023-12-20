import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>TNGL - Customer Management</h1>
      <div className="customer-actions">
        <NavLink to="/CreateCustomer">
          <button>Create Customer</button>
        </NavLink>
        <NavLink to="/CustomerDetails">
          <button>Update Customer</button>
        </NavLink>
        <NavLink to="/CustomersList">
          <button>List/Delete Customers</button>
        </NavLink>
      </div>
    </div>
  );
};

export default HomePage;
