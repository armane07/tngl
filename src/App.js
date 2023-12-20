import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateCustomer from './Components/createcustomer.js';
import CustomerDetails from './Components/updatecustomer.js';
import CustomersList from './Components/customerlist.js';
import HomePage from './Components/home.js';

function App() {
  return (
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component={HomePage}></Route>
       <Route path="/CreateCustomer" component={CreateCustomer}></Route>
       <Route path="/CustomerDetails" component={CustomerDetails}></Route>
       <Route path="/CustomersList" component={CustomersList}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
