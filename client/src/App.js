import React from 'react';
import { Route } from 'react-router-dom';
import SplashPage from "./components/pages/SplashPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";



const App = () => (
  <div className="ui container">
    <Route path="/" exact component={SplashPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/homepage" exact component={HomePage} />
  </div>
);

export default App;
