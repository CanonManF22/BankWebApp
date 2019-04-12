import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const lightNavStyle = {
  outlineStyle: "solid",
  backgroundColor: "#4e74a6",
  paddingLeft: "20px",
  paddingRight: "20px",
  color: "#ffffff"
};

const darkNavStyle = {
  outlineStyle: "solid",
  backgroundColor: "#72736e",
  paddingLeft: "20px",
  paddingRight: "20px",
  color: "#ffffff"
};

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.routeChangeAcc = this.routeChangeAcc.bind(this);
    this.routeChangeTrans = this.routeChangeTrans.bind(this);
    this.routeChangeBills = this.routeChangeBills.bind(this);
    this.routeChangeATMs = this.routeChangeATMs.bind(this);
    this.routeChangeReports = this.routeChangeReports.bind(this);
  }

  render() {
    //don't render nav bar on login or registration
    const displayNav = !(
      this.props.location.pathname === "/" ||
      this.props.location.pathname === "/registration"
    );
    const isManager = true; //this.props.state.manager
    return (
      <div>
        {displayNav ? (
          isManager ? (
            <div
              style={{
                paddingLeft: "50px",
                paddingRight: "50px"
              }}
            >
              <Navbar
                style={{
                  padding: "20px",
                  paddingLeft: "30px",
                  backgroundColor: "#204f8c"
                }}
              >
                <h2
                  onClick={this.routeChangeDash}
                  style={{ cursor: "pointer", color: "#ffffff" }}
                >
                  Dash Banking
                </h2>
                <h4
                  style={{
                    paddingLeft: "40px",
                    paddingTop: "8px",
                    color: "#ffffff"
                  }}
                >
                  Online Banking
                </h4>
                <Nav className="ml-auto">
                  <Nav.Link style={lightNavStyle} onClick={this.routeChangeAcc}>
                    Accounts
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeTrans}
                  >
                    Transfers
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeBills}
                  >
                    Bills
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeReports}
                  >
                    Reports
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeATMs}
                  >
                    ATMs
                  </Nav.Link>
                  <Nav.Link
                    style={darkNavStyle}
                    onClick={this.routeChangeLogout}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar>
            </div>
          ) : (
            <div
              style={{
                paddingLeft: "50px",
                paddingRight: "50px"
              }}
            >
              <Navbar
                style={{
                  padding: "20px",
                  paddingLeft: "30px",
                  backgroundColor: "#204f8c"
                }}
              >
                <h2
                  onClick={this.routeChangeDash}
                  style={{ cursor: "pointer", color: "#ffffff" }}
                >
                  Dash Banking
                </h2>
                <h4
                  style={{
                    paddingLeft: "40px",
                    paddingTop: "8px",
                    color: "#ffffff"
                  }}
                >
                  Online Banking
                </h4>
                <Nav className="ml-auto">
                  <Nav.Link style={lightNavStyle} onClick={this.routeChangeAcc}>
                    Accounts
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeTrans}
                  >
                    Transfers
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeBills}
                  >
                    Bills
                  </Nav.Link>
                  <Nav.Link
                    style={lightNavStyle}
                    onClick={this.routeChangeATMs}
                  >
                    ATMs
                  </Nav.Link>
                  <Nav.Link
                    style={darkNavStyle}
                    onClick={this.routeChangeLogout}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              </Navbar>
            </div>
          )
        ) : (
          <div
            style={{
              backgroundColor: "#204f8c",
              marginLeft: "50px",
              marginRight: "50px",
              color: "#ffffff"
            }}
          >
            <div
              style={{
                textAlign: "right",
                padding: "20px",
                backgroundColor: "#204f8c"
              }}
            >
              <h2>Welcome to Dash Banking</h2>
              <h4>a Chase partner</h4>
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * Couldn't figure out how to pass var as parameter, so seperate routing per button for now
   */
  routeChangeDash = () => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/dashboard",
        state: { uID: this.props.location.state.uID }
      });
    }
  };
  routeChangeAcc = () => {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/accounts",
        state: { uID: this.props.location.state.uID }
      });
    }
  };
  routeChangeTrans() {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/transfers",
        state: { uID: this.props.location.state.uID }
      });
    }
  }
  routeChangeBills() {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/bills",
        state: { uID: this.props.location.state.uID }
      });
    }
  }
  routeChangeReports() {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/reports",
        state: { uID: this.props.location.state.uID }
      });
    }
  }
  routeChangeATMs() {
    if (this.props.location.state === undefined) {
      window.alert("Error, not logged in!");
    } else {
      this.props.history.push({
        pathname: "/atms",
        state: { uID: this.props.location.state.uID }
      });
    }
  }
  routeChangeLogout = () => {
    window.alert("Please close your browser tab after logging out.");
    this.props.history.push({
      pathname: "/",
      state: {}
    });
  };
}

export default withRouter(NavBar);
