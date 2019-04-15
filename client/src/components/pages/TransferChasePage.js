import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class TransferChasePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uID: null,
      option1: null,
      option2: null,
      transferamt: 0
    };
  }

  //wait until info fetched
  componentDidMount() {
    this.fetchAccounts().then(res =>
      this.setState({
        accounts: res,
        option1:
          this.state.accounts[0].accType +
          " - " +
          this.state.accounts[0].accountID +
          " - " +
          "$" +
          parseFloat(
            Math.round(this.state.accounts[0].accBalance * 100) / 100
          ).toFixed(2),
        option2:
          this.state.accounts[0].accType +
          " - " +
          this.state.accounts[0].accountID +
          " - " +
          "$" +
          parseFloat(
            Math.round(this.state.accounts[0].accBalance * 100) / 100
          ).toFixed(2)
      })
    );
  }

  fetchAccounts = async e => {
    //not logged in check to prevent fatal crash
    if (this.props.location.state === undefined) {
      window.alert(
        "Error: Not Logged In.  this.props.location.state is undefined."
      );
      this.setState({
        uID: -1,
        accounts: [{ accType: "null", accountID: -1, accBalance: -1 }]
      });
      return { uID: -1 };
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
    this.setState({ accounts: response, uID: this.props.location.state.uID });
    if (response.length < 1) {
      window.alert("No accounts for this user");
    } else {
      return response;
    }
  };

  //first dropdown
  handleChange1 = e => {
    this.setState({
      option1: e.target.value
    });
  };

  //second dropdown
  handleChange2 = e => {
    this.setState({
      option2: e.target.value
    });
  };

  //amount
  handleChangeNums = e => {
    this.setState({ transferamt: e.target.value });
  };

  //submit transfer request
  handleSubmit = () => {
    if (this.state.option1 === this.state.option2)
      window.alert("Error: Same Account Chosen.  Choose a different account.");
    else if (this.state.transferamt <= 0)
      window.alert("Error: Invalid transfer amount.");
    else {
      let firstSplit = this.state.option1.split(" - "); //split information again. [0] = type, [1] = accountID, [2] = balance
      let secondSplit = this.state.option2.split(" - ");
      firstSplit[2] = firstSplit[2].substring(1);
      secondSplit[2] = secondSplit[2].substring(1);
      if (
        parseFloat(firstSplit[2]) < parseFloat(secondSplit[2]) ||
        parseFloat(firstSplit[2]) < parseFloat(this.state.transferamt)
      )
        window.alert("Error: Not Enough Funds");
      else {
        //do api call & redirect back to transfer page
      }
    }
    console.log(this.state);
  };

  render() {
    let fetched = this.state.accounts;
    if (fetched === undefined) fetched = [];
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Initiate a Transfer</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Form.Group>
          <Form.Label style={{ fontSize: "150%" }}>Transfer From</Form.Label>
          <Form.Control as="select" onChange={this.handleChange1}>
            {this.state.accounts.map(acc => (
              <option>
                {acc.accType +
                  " - " +
                  acc.accountID +
                  " - " +
                  "$" +
                  parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(2)}
              </option>
            ))}
          </Form.Control>
          <br />
          <Form.Label style={{ fontSize: "150%" }}>Transfer To</Form.Label>
          <Form.Control as="select" onChange={this.handleChange2}>
            {this.state.accounts.map(acc => (
              <option>
                {acc.accType +
                  " - " +
                  acc.accountID +
                  " - " +
                  "$" +
                  parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(2)}
              </option>
            ))}
          </Form.Control>
          <br />
          <Form.Label style={{ fontSize: "150%" }}>Amount ($USD)</Form.Label>
          <Form.Control
            type="number"
            value={this.state.transferamt}
            onChange={this.handleChangeNums}
          />
          <Button onClick={this.handleSubmit} style={{ marginTop: "10px" }}>
            Submit Transfer Request
          </Button>
        </Form.Group>
      </div>
    ) : (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>No accounts for this user.</h1>
      </div>
    );
  }
}

export default withRouter(TransferChasePage);
