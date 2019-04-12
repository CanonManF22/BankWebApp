import React from "react";
import { withRouter } from "react-router-dom";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class CreateAccountPage extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Placeholder [Create an Account]</h1>
      </div>
    );
  }
}

export default withRouter(CreateAccountPage);
