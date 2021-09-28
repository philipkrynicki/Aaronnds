import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import store from './redux/store'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.js';
import Homescreen from './components/home-screen.js';
import BoardIndividual from './components/board-individual.js';
import Login from './components/login.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

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
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
