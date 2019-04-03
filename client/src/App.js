import React from "react";
import { Route, withRouter } from "react-router-dom";
import RegPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import NavBar from "./components/pages/NavBar";
import Dashboard from "./components/pages/Dashboard";
import AccountPage from "./components/pages/AccountPage";
import TransferPage from "./components/pages/TransferPage";
import BillPage from "./components/pages/BillPage";
import ATMPage from "./components/pages/ATMPage";

const divStyle = {
  backgroundColor: "#204f8c",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center"
};

const App = () => (
  <div className="ui container" style={divStyle}>
    <NavBar></NavBar>
    <Route path="/" exact component={LoginPage} />
    <Route path="/registration" exact component={RegPage} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/navbar" exact component={NavBar} />
    <Route path="/accounts" exact component={AccountPage} />
    <Route path="/transfers" exact component={TransferPage} />
    <Route path="/bills" exact component={BillPage} />
    <Route path="/atms" exact component={ATMPage} />
  </div>
);

export default withRouter(App);
