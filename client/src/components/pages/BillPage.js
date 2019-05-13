import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class BillPage extends React.Component {
  constructor(props) {
    super(props);

    const today = new Date();
    const pad = "00";
    const month = "" + (today.getMonth() + 1);
    const date = "" + today.getDate();
    let formatted =
      today.getFullYear() +
      "-" +
      (pad + month).substring(month.length) +
      "-" +
      (pad + date).substring(date.length);

    this.state = {
      uID: null,
      option1: null,
      option2: null,
      date: formatted,
      payamt: 0
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
        : this.setState({ accounts: res, option1: null, option2: null })
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
    this.setState({
      accounts: response,
      uID: this.props.location.state.uID
    });
    if (response.length < 1) {
      window.alert("No accounts for this user");
    } else {
      return response;
    }

    /*
    //debug data
    this.setState({
      accounts: [
        { key: 2, accBalance: "0", accType: "checking", accID: "0", uID: "0" },
        { key: 1, accBalance: "1", accType: "savings", accID: "1", uID: "1" },
        { key: 0, accBalance: "2", accType: "something", accID: "2", uID: "2" }
      ]
    });
    return [
      { key: 2, accBalance: "0", accType: "checking", accID: "0", uID: "0" },
      { key: 1, accBalance: "1", accType: "savings", accID: "1", uID: "1" },
      { key: 0, accBalance: "2", accType: "something", accID: "2", uID: "2" }
    ]; */
  };

  //first dropdown
  handleChangeOption = e => {
    this.setState({
      option1: e.target.value
    });
  };

  //second dropdown
  handleChangeOption2 = e => {
    this.setState({
      option2: e.target.value
    });
  };

  //amount
  handleChangeAmt = e => {
    this.setState({ payamt: e.target.value });
  };

  //date
  handleChangeDate = e => {
    this.setState({ date: e.target.value });
  };

  //api call
  handleSubmit = async e => {
    //schedule a date for bill payment in backend
    //this.state.uID
    //this.state.option1 for chosen account in 'Saving - 010101010 - $101.10' format.  Split between ' - ' and remove $ if needed
    //this.state.date is formatted as "YYYY-MM-DD", zero padded\
    console.log(this.state);
    const { data } = this.state;
    const response = await fetch("http://localhost:8080/bills/create", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(res => res.json());
    if (response.Success) {
      window.alert("Successfully added bill!");
      this.routeToAccount();
    } else {
      window.alert("Error adding bill.");
    }
    /*
    const { user_id } = req.uID;
    const { accType } = accType;
    const { accountID } = req.options2;
    const { toAcct } = req.options1;
    const { amt } = req.payamt;
    const { date } = req;
    const { days } = req;
    */
  };

  routeToAccount = () => {
    this.props.history.push({
      pathname: "/accounts",
      state: {
        uID: this.props.location.state.uID,
        isManager: this.props.location.state.isManager
      }
    });
  };

  render() {
    let fetched = this.state.accounts;
    if (fetched === undefined) fetched = [];
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Setup Re-Occurring Bill Payments</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "150%" }}>Source Account</Form.Label>
            <Form.Control as="select" onChange={this.handleChangeOption2}>
              {this.state.accounts.map(acc => (
                <option>
                  {acc.accType +
                    " - " +
                    acc.accountID +
                    " - " +
                    "$" +
                    parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(
                      2
                    )}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "150%" }}>Pay To</Form.Label>
            <Form.Control as="select" onChange={this.handleChangeOption}>
              {this.state.accounts.map(acc => (
                <option>
                  {acc.accType +
                    " - " +
                    acc.accountID +
                    " - " +
                    "$" +
                    parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(
                      2
                    )}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "150%" }}>Amount ($USD)</Form.Label>
            <Form.Control
              type="number"
              value={this.state.payamt}
              onChange={this.handleChangeAmt}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ fontSize: "150%" }}>
              Date (Re-occurring every 30 days)
            </Form.Label>
            <Form.Control
              type="date"
              value={this.state.date}
              onChange={this.handleChangeDate}
            />
          </Form.Group>
          <Button onClick={this.handleSubmit} style={{ marginTop: "10px" }}>
            Submit Scheduled Bill Payment
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

export default withRouter(BillPage);
