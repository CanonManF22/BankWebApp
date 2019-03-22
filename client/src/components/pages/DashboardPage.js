import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const divStyle = {
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class DashboardPage extends React.Component {
  constructor() {
    super();
    this.routeChangeAcc = this.routeChangeAcc.bind(this);
    this.routeChangeTrans = this.routeChangeTrans.bind(this);
    this.routeChangeBills = this.routeChangeBills.bind(this);
    this.routeChangeATMs = this.routeChangeATMs.bind(this);
  }

  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#ffffff" }}>Online Bank</h1>

        <button onClick={this.routeChangeAcc}>Accounts</button>
        <button onClick={this.routeChangeTrans}>Transfers</button>
        <button onClick={this.routeChangeBills}>Pay Bills</button>
        <button onClick={this.routeChangeATMs}>ATMs</button>
      </div>
    );
  }

  /**
   * Couldn't figure out how to pass var as parameter, so seperate routing per button for now
   */
  routeChangeAcc() {
    this.props.history.push("accounts");
  }
  routeChangeTrans() {
    this.props.history.push("transfers");
  }
  routeChangeBills() {
    this.props.history.push("bills");
  }
  routeChangeATMs() {
    this.props.history.push("atms");
  }
}

export default withRouter(DashboardPage);
