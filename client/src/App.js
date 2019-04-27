import React from "react";
import { Route, withRouter } from "react-router-dom";
import RegPage from "./components/pages/RegistrationPage";
import LoginPage from "./components/pages/LoginPage";
import NavBar from "./components/pages/NavBar";
import DashboardPage from "./components/pages/Dashboard";
import AccountPage from "./components/pages/AccountPage";
import TransferPage from "./components/pages/TransferPage";
import BillPage from "./components/pages/BillPage";
import ATMPage from "./components/pages/ATMPage";
import CreateAccountPage from "./components/pages/CreateAccountPage";
import ManageAccountPage from "./components/pages/ManageAccountPage";
import DepositCheckPage from "./components/pages/DepositCheckPage";
import TransferChasePage from "./components/pages/TransferChasePage";
import TransferOtherPage from "./components/pages/TransferOtherPage";
import ReportsPage from "./components/pages/ReportsPage";
import TransactionPage from "./components/pages/TransactionPage";

const divStyle = {
  backgroundColor: "#ffffff",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center"
};

const App = () => (
  <div className="ui container" style={divStyle}>
    <NavBar />
    <Route path="/" exact component={LoginPage} />
    <Route path="/registration" exact component={RegPage} />
    <Route path="/dashboard" exact component={DashboardPage} />
    <Route path="/navbar" exact component={NavBar} />
    <Route path="/accounts" exact component={AccountPage} />
    <Route path="/transfers" exact component={TransferPage} />
    <Route path="/bills" exact component={BillPage} />
    <Route path="/atms" exact component={ATMPage} />
    <Route path="/createAccount" exact component={CreateAccountPage} />
    <Route path="/manageAccount" exact component={ManageAccountPage} />
    <Route path="/depositCheck" exact component={DepositCheckPage} />
    <Route path="/transferChase" exact component={TransferChasePage} />
    <Route path="/transferOther" exact component={TransferOtherPage} />
    <Route path="/reports" exact component={ReportsPage} />
    <Route path="/transactions" exact component={TransactionPage} />
  </div>
);

export default withRouter(App);
