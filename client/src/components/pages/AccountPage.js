import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

const divStyleLight = {
  backgroundColor: "#dfedf2",
  padding: "20px",
  margin: "20px",
  color: "#72736e"
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      accounts: []
    };
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

    const data = "";
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
    const fetched = this.state.accounts;
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#ffffff" }}>Your Accounts</h1>

        {this.state.accounts.map(acc => (
          <div style={divStyleLight}>
            <h1>{acc.accType + " " + acc.accountID}</h1>
            <h3>{"Account Balance: " + acc.accBalance}</h3>
          </div>
        ))}

        <button value="deposit check">Deposit Check</button>
      </div>
    ) : (
      <span style={divStyleLight}>No Accounts on Record.</span>
    );
    /*
      non functional atm
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Open Account
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Checkings</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Savings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Close Account
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Account 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Account 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
    */
  }
}

export default withRouter(Page);
