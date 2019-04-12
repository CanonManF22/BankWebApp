import React from "react";
import Button from "react-bootstrap/Button";

const divStyle = {
  backgroundColor: "#c1ced9",
  padding: "50px",
  margin: "50px",
  marginTop: "0px"
};

class TransferPage extends React.Component {
  render() {
    return (
      <div style={divStyle}>
        <h1 style={{ color: "#000000" }}>Placeholder [Transfers]</h1>
        <Button variant="primary" size="lg" block>
          Transfers Between Chase Banks
        </Button>
        <Button variant="secondary" size="lg" block>
          Transfers Between Other Banks
        </Button>
      </div>
    );
  }
}

export default TransferPage;
