import React from "react";
import { withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

function Account(props) {
  console.log(JSON.stringify(props.value.accounts.accountID));
  return (
    <div>
      <h1>
        {"AccountID " +
          props.value.accounts.accountID +
          " " +
          props.value.accounts.accType}
      </h1>
      <h3>{"Account Balance " + props.value.accounts.accBalance}</h3>
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      accounts: this.fetchAccounts()
    };
    console.log("this is accounts", this.state.accounts);
  }

  fetchAccounts = async e => {
    //not logged in check to prevent fatal crash
    if (this.props.location.state === undefined) {
      window.alert(
        "Error: Not Logged In. this.props.location.state is undefined."
      );
      return;
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
      // no idea why I have to use state and props
      this.state.accounts = response[0];
      this.props.history.push({ accounts: response });
      return response;
    }
  };

  //create an account div for every account from fetch
  // display accType and accBalance
  renderAccounts = () => {
    return <Account value={this.state} />;
  };

  render() {
    return (
      <div>
        <h1 style={{ color: "#ffffff" }}>Placeholder [ATMs]</h1>
        {this.renderAccounts()}
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Open Account
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Checkings</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Savings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        ;
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Close Account
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Account 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Account 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        ;<button value="deposit check">Deposit Check</button>
      </div>
    );
  }
}

export default withRouter(Page);
