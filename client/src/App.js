import React from "react";
import { Route } from "react-router-dom";
import RegPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";

const divStyle = {
  backgroundColor: "#204f8c",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center"
};

const App = () => (
  <div className="ui container" style={divStyle}>
    <Route path="/" exact component={LoginPage} />
    <Route path="/registration" exact component={RegPage} />
  </div>
);

export default App;
