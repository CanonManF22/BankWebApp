import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class DashboardPage extends React.Component {
  render() {
    if (this.state === undefined || this.props.location.state === undefined) {
      return (
        <h2 style={divStyle}>
          Error! Not logged in. Please logout and login again.
        </h2>
      );
    } else {
      console.log(this.state);
      console.log(this.props);
      console.log(this.props.location.state.isManager);
      return (
        <div style={divStyle}>
          <h2>Welcome!</h2>
          <h2>Get started by clicking one of the navigation buttons above.</h2>
          <hr
            style={{
              backgroundColor: "#72736e",
              border: "none",
              height: "4px",
              color: "#72736e"
            }}
          />
          <h3>Account Info</h3>
          <h4>User ID: {this.props.location.state.uID}</h4>
          {this.props.location.state.isManager ? (
            <h4>User Type: Manager</h4>
          ) : (
            <h4>User Type: Regular</h4>
          )}
        </div>
      );
    }
  }
}

export default withRouter(DashboardPage);
