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
    //local debug transaction testing
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
    });
    //do api call for transactions here
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
          <h2 style={{ float: "left" }}>
            {"Date" + " - " + "Transaction Type"}
          </h2>
          <h3 style={{ float: "right" }}>{"Amount" + " | " + "Cumulative"}</h3>
        </div>

        {this.state.transactions.map(trans => (
          <div style={divStyleLight}>
            <h2 style={{ float: "left" }}>{trans.date + " - " + trans.type}</h2>
            <h3 style={{ float: "right" }}>
              {"$" +
                parseFloat(Math.round(trans.amount * 100) / 100).toFixed(2) +
                " | $" +
                parseFloat(Math.round(trans.cumul * 100) / 100).toFixed(2)}
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
