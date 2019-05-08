import React from "react";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

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

class ReportsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      user_id_search: null,
      accounts: []
    };
  }

  //fetch account info stored in this.staet.accountnum
  fetchInfo = async e => {
    //not logged in check to prevent fatal crash
    if (this.props.location.state === undefined) {
      window.alert(
        "Error: Not Logged In.  this.props.location.state is undefined."
      );
      return [];
    }
    const user_id = this.state.user_id_search;
    const response = await fetch(`http://localhost:8080/accounts/${user_id}`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
    this.setState({ accounts: response });
    console.log(response)
    if (response.length < 1) {
      window.alert("No accounts for this user");
      return [{ accType: "N/A", accountID: "N/A", accBalance: "N/A" }];
    } else {
      return response;
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //When account number is entered and submitted
  handleSubmit = () => {
    //fetch accounts
    this.setState({ accounts: this.fetchInfo() });
    console.log(this.state.accounts);

    //debug version
    /*
    this.setState({
      accounts: [{ accType: "test", accountID: "0", accBalance: "1" }]
    }); */
  };

  render() {
    return this.state.accounts.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Generate a Report</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Form style={{ paddingBottom: "20px" }}>
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            id="user_id_search"
            name="user_id_search"
            placeholder="123456789"
            type="number"
            onChange={this.onChange}
          />
          <Button
            onClick={this.handleSubmit}
            primary
            style={{ marginTop: "5px" }}
          >
            Generate Report
          </Button>
        </Form>
        <h3>
          {this.state.user_id_search
            ? "User ID: " + this.state.user_id_search
            : ""}
        </h3>
        {this.state.accounts.map(acc => (
          <div style={divStyleLight}>
            <h3 style={{ float: "left" }}>
              {"Account ID: " +
                acc.accountID +
                " - Account Type: " +
                acc.accType}
            </h3>
            <h3 style={{ float: "right" }}>
              {"Balance: $" +
                parseFloat(Math.round(acc.accBalance * 100) / 100).toFixed(2)}
            </h3>
          </div>
        ))}
      </div>
    ) : (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Generate a Report</h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />
        <Form style={{ paddingBottom: "20px" }}>
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            id="user_id_search"
            name="user_id_search"
            placeholder="123456789"
            type="number"
            onChange={this.onChange}
          />
          <Button
            onClick={this.handleSubmit}
            primary
            style={{ marginTop: "5px" }}
          >
            Generate Report
          </Button>
        </Form>
        <h3>
          {this.state.user_id_search
            ? "User ID: " + this.state.user_id_search
            : ""}
        </h3>
        <h3 style={divStyleLight}>No accounts found.</h3>
      </div>
    );
  }
}

export default withRouter(ReportsPage);