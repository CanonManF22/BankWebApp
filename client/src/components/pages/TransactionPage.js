import React from "react";
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

const divStyleLightTitle = {
  backgroundColor: "#204f8c",
  paddingTop: "10px",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: "50px",
  margin: "5px",
  color: "#ffffff"
};

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uID: null,
      accID: null,
      accounts: [],
      accBalance: null,
      transactions: []
    };
  }

  //wait until info fetched
  componentDidMount() {
    this.fetchAccounts();
  }

  //fetchTransactions is already called in this!!  No need to call it in componentDidMount()
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

    console.log(response);

    const accID = this.props.location.state.accID;
    this.setState({ accounts: response, uID: user_id, accID: accID });

    this.fetchTransactions();

    if (response.length < 1) {
      window.alert("No accounts for this user");
    } else {
      return response;
    }
  };

  fetchTransactions = async e => {
    console.log("asdasds");
    //local debug transaction testing
    /*
    this.setState({
      transactions: [
        { date: "2019-04-27", amount: "500", type: "deposit", cumul: "1000" },
        {
          date: "2019-04-26",
          amount: "-400",
          type: "withdrawal",
          cumul: "500"
        },
        { date: "2019-04-25", amount: "-300", type: "transfer", cumul: "100" }
      ]
    }); */
    const user_id = this.props.location.state.uID;
    console.log(`http://localhost:8080/transactions/${user_id}`);
    //do api call for transactions here
    const response = await fetch(
      `http://localhost:8080/transactions/${user_id}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(res => res.json());
    console.log(response);
    //filter transactions for this acc only
    let filteredTrans = [];
    for (let i = response.length - 1; i >= 0; i--) {
      let tempResponse = response[i];
      if (
        (tempResponse.type === "withdraw" &&
          tempResponse.originAccountID === this.state.accID) ||
        (tempResponse.type === "Transfer to other bank" &&
          tempResponse.originAccountID === this.state.accID)
      ) {
        tempResponse.payment = Math.abs(parseFloat(tempResponse.payment)) * -1;
        filteredTrans.push(tempResponse);
      } else if (
        tempResponse.type === "deposit" &&
        tempResponse.originAccountID === this.state.accID
      ) {
        tempResponse.payment = Math.abs(parseFloat(tempResponse.payment));
        filteredTrans.push(tempResponse);
      }
    }

    //get current balance to compute cumulative
    for (let i = 0; i < this.state.accounts.length; i++) {
      if (this.state.accounts[i].accountID === this.state.accID) {
        this.setState({ accBalance: this.state.accounts[i].accBalance });
      }
    }

    let tempBal = this.state.accBalance;
    for (let i = 0; i < filteredTrans.length; i++) {
      filteredTrans[i].cumSum = tempBal;
      tempBal = parseFloat(tempBal) - parseFloat(filteredTrans[i].payment);
    }

    this.setState({ transactions: filteredTrans });
  };

  render() {
    let fetched = this.state.accounts;
    if (fetched === undefined) fetched = [];
    return fetched.length ? (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>
          Transactions for {this.state.accID}
        </h1>
        <hr
          style={{
            backgroundColor: "#72736e",
            border: "none",
            height: "4px",
            color: "#72736e"
          }}
        />

        <div style={divStyleLightTitle}>
          <h2 style={{ float: "left" }}>{"Date - Transaction Type"}</h2>
          <h3 style={{ float: "right" }}>{"Amount | Cumulative"}</h3>
        </div>

        {this.state.transactions.map(trans => (
          <div style={divStyleLight}>
            <h2 style={{ float: "left" }}>
              {trans.transactionDate.substring(0, 10) + " - " + trans.type}
            </h2>
            <h3 style={{ float: "right" }}>
              {"$" +
                parseFloat(Math.round(trans.payment * 100) / 100).toFixed(2) +
                " | $" +
                parseFloat(Math.round(trans.cumSum * 100) / 100).toFixed(2)}
            </h3>
          </div>
        ))}
      </div>
    ) : (
      <div style={divStyle}>
        <h3>No accounts for this user.</h3>
      </div>
    );
  }
}

export default withRouter(TransactionPage);
