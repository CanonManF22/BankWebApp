import React from "react";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

const divStyle = {
  textAlign: "right",
  backgroundColor: "#4e74a6",
  padding: "50px",
  margin: "50px",
  marginTop: "0px",
  color: "#ffffff"
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.routeChangeAcc = this.routeChangeAcc.bind(this);
    this.routeChangeTrans = this.routeChangeTrans.bind(this);
    this.routeChangeBills = this.routeChangeBills.bind(this);
    this.routeChangeATMs = this.routeChangeATMs.bind(this);
  }

  render() {
    //don't render nav bar on login or registration
    const displayNav = !(
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "/registration"
    );
    return (
      <div>
        {displayNav ? (
          <div style={divStyle}>
            <h3 style={{ color: "#ffffff" }}>Welcome to Dash Banking</h3>
            <Navbar bg="light" variant="light">
            <Nav className="mr-auto">
            <Nav.Link onClick={this.routeChangeAcc}>Accounts</Nav.Link>
            <Nav.Link onClick={this.routeChangeTrans}>Transfers</Nav.Link>
            <Nav.Link onClick={this.routeChangeBills}>Bills</Nav.Link>
            <Nav.Link onClick={this.routeChangeATMs}>ATMs</Nav.Link>
            <Nav.Link onClick={this.routeChangeLogout}>Logout</Nav.Link>
          </Nav>
          </Navbar>
          </div>
        ) : (
          <div style={divStyle}>
            <h1>Welcome to Dash Banking</h1>
            <h2>a Chase partner</h2>
          </div>
        )}
      </div>
    );
  }

  /**
   * Couldn't figure out how to pass var as parameter, so seperate routing per button for now
   */
  routeChangeAcc = () => {
    this.props.history.push({
      pathname: "/accounts",
      state: { uID: this.props.location.state.uID }
    });
  };
  routeChangeTrans() {
    this.props.history.push({
      pathname: "/transfers",
      state: { uID: this.props.location.state.uID }
    });
  }
  routeChangeBills() {
    this.props.history.push({
      pathname: "/bills",
      state: { uID: this.props.location.state.uID }
    });
  }
  routeChangeATMs() {
    this.props.history.push({
      pathname: "/atms",
      state: { uID: this.props.location.state.uID }
    });
  }
  routeChangeLogout = () => {
    this.props.history.push({
      pathname: "/",
      state: {}
    });
  };
}

export default withRouter(NavBar);
