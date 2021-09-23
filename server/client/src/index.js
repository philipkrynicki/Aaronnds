import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import store from './redux/store'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.js';
import Homescreen from './components/home-screen.js';
import BoardIndividual from './components/board-individual.js';
import Login from './components/login.js';

const App = () => {
  return (
    <div className="container">

      <div>
        <Navbar />
      </div>

      <div>
        <Switch>
          <Route exact path="/" component={Homescreen} />
          <Route exact path="/board/:id" component={BoardIndividual} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
        
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}></Provider>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
