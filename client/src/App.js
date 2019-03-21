import React from 'react';
import { Route } from 'react-router-dom';
import RegPage from './components/pages/RegistrationPage';
import LoginPage from './components/pages/LoginPage';

const App = () => (
  <div className="ui container">
    <Route path="/" exact component={LoginPage} />
    <Route path="/registration" exact component={RegPage} />
  </div>
);

export default App;
