import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const lightNavStyle = {
  outlineStyle: "solid",
  backgroundColor: "#4e74a6",
  paddingLeft: "20px",
  paddingRight: "20px",
  color: "#ffffff"
};

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

const divStyleLight = {
  backgroundColor: "#dfedf2",
  paddingTop: "10px",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "50px",
  margin: "5px",
  color: "#000000"
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      accounts: []
    };
    this.routeChangeCreateAcc = this.routeChangeCreateAcc.bind(this);
    //console.log("this is accounts", this.state.accounts);
  }

  //wait until info fetched
  componentDidMount() {
    this.fetchAccounts().then(res => this.setState({ accounts: res }));
  }

  fetchAccounts = async e => {
    //not logged in check to prevent fatal crash
    if (this.props.location.state === undefined) {
      window.alert(
        "Error: Not Logged In.  this.props.location.state is undefined."
      );
      return [];
    }

    const user_id = this.props.location.state.uID;
    console.log(`http://localhost:8080/accounts/${user_id}`);

    const response = await fetch(`http://localhost:8080/accounts/${user_id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    this.setState({ accounts: response });
    if (response.length < 1) {
      window.alert("No accounts for this user");
    } else {
      //debug array for testing
      /*
      const debugAccs = [
        { key: 2, accBalance: "0", accType: "checking", accID: "0", uID: "0" },
        { key: 1, accBalance: "1", accType: "savings", accID: "1", uID: "1" },
        { key: 0, accBalance: "2", accType: "something", accID: "2", uID: "2" }
      ]; */
      return response;
    }
  };

  render() {
    let fetched = this.state.accounts;
    if (fetched === undefined) fetched = [];
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Your Accounts</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />

        {this.state.accounts.map(acc => (
          <div style={divStyleLight}>
            <h2 style={{ float: "left" }}>
              {acc.accType + " - " + acc.accountID}
            </h2>
            <h4 style={{ float: "left" }}>
              <Nav.Link
                style={{ cursor: "pointer" }}
                onClick={() => this.routeChangeTransactions(acc.accountID)}
              >
                View Transactions
              </Nav.Link>
            </h4>
            <h3 style={{ float: "right" }}>
              {"$" +
                parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(2)}
            </h3>
          </div>
        ))}

        <Navbar>
          <Nav className="mr-auto">
            <Nav.Link style={lightNavStyle} onClick={this.routeChangeCreateAcc}>
              Open A New Account
            </Nav.Link>
            <Nav.Link
              style={lightNavStyle}
              onClick={this.routeChangeManageAccs}
            >
              Manage Existing Accounts
            </Nav.Link>
            <Nav.Link
              style={lightNavStyle}
              onClick={this.routeChangeDepositCheck}
            >
              Deposit Checks
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    ) : (
      <div style={divStyle}>
        <h3>No accounts for this user.</h3>
        <Nav.Link style={lightNavStyle} onClick={this.routeChangeCreateAcc}>
          Open A New Account
        </Nav.Link>
      </div>
    );
  }

  routeChangeCreateAcc = () => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/createAccount",
        state: { uID: this.props.location.state.uID }
      });
    }
  };

  routeChangeManageAccs = () => {
    this.props.history.push({
      pathname: "/manageAccount",
      state: { uID: this.props.location.state.uID }
    });
  };

  routeChangeDepositCheck = () => {
    this.props.history.push({
      pathname: "/depositCheck",
      state: { uID: this.props.location.state.uID }
    });
  };

  routeChangeTransactions = accountID => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/transactions",
        state: { uID: this.props.location.state.uID, accID: accountID }
      });
    }
  };
}

export default withRouter(Page);
