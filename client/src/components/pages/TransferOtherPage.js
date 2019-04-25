import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class TransferOtherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uID: null,
      option1: null,
      bankname: null,
      routingnum: null,
      accountnum: null,
      transferamt: 0
    };
  }

  //wait until info fetched
  componentDidMount() {
    this.fetchAccounts().then(res =>
      res
        ? this.setState({
            accounts: res,
            option1:
              this.state.accounts[0].accType +
              " - " +
              this.state.accounts[0].accountID +
              " - " +
              "$" +
              parseFloat(
                Math.round(this.state.accounts[0].accBalance * 100) / 100
              ).toFixed(2)
          })
        : this.setState({ accounts: res, option1: null })
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
  onChangeDropdown = e => {
    this.setState({
      option1: e.target.value
    });
  };

  //amount
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //submit transfer request
  handleSubmit = async e => {
    const uID = this.props.location.state.uID;
    if (this.state.transferamt <= 0)
      window.alert("Error: Invalid transfer amount.");
    else {
      let firstSplit = this.state.option1.split(" - "); //split information again. [0] = type, [1] = accountID, [2] = balance
      firstSplit[2] = firstSplit[2].substring(1);
      console.log(firstSplit[2] + " " + this.state.transferamt);
      if (parseFloat(firstSplit[2]) < parseFloat(this.state.transferamt))
        window.alert("Error: Not Enough Funds");
      else {
        //do api call & redirect back to transfer page
        console.log(this.state);
        const response = await fetch(
          `http://localhost:8080/accounts/${uID}/transferExternal`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
          }
        );

        // .then(res => res.json());
        // if (response.Success ){
        //   console.log('transfer worked')
        // }
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
          <Form.Control as="select" onChange={this.onChangeDropdown}>
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
          <br />
          <Form.Label>Name Of Bank</Form.Label>
          <Form.Control
            id="bankname"
            name="bankname"
            placeholder="Chase"
            type="text"
            onChange={this.onChange}
          />
          <Form.Label>Routing Number</Form.Label>
          <Form.Control
            id="routingnum"
            name="routingnum"
            placeholder="123456789"
            type="number"
            onChange={this.onChange}
          />
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            id="accountnum"
            name="accountnum"
            placeholder="123456789012"
            type="number"
            onChange={this.onChange}
          />
          <br />
          <Form.Label style={{ fontSize: "150%" }}>Amount ($USD)</Form.Label>
          <Form.Control
            id="transferamt"
            name="transferamt"
            placeholder="100"
            type="number"
            onChange={this.onChange}
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

export default withRouter(TransferOtherPage);
